import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { ErrorResponse, SuccessResponse } from '@/utils/types';
import { prisma } from '@/utils/db';
import { UserFormSchema } from '@/modules/users/userTypes';
import { userUpdateFormSchema } from '@/modules/users/userUpdateFormSchema';
import { SALT_ROUNDS } from '@/utils/constants';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const body = req.body as UserFormSchema;
        await userUpdateFormSchema.parseAsync(body);

        const password = body.password
            ? await hash(body.password, SALT_ROUNDS)
            : '';

        const userData = {
            email: body.email,
            name: body.name,
            gender: body.gender,
            household: {
                connect: {
                    id: Number(body.householdId),
                },
            },
        };
        let user: User;
        if (body.id) {
            user = await prisma.user.update({
                where: {
                    id: body.id,
                },
                data: {
                    ...userData,
                    ...(password && { password: password }),
                },
            });
        } else {
            user = await prisma.user.create({
                data: { ...userData, password: password },
            });
        }

        const data: SuccessResponse<User> = {
            success: true,
            data: user,
        };
        res.status(200).json(data);
    } catch (error) {
        const data: ErrorResponse = {
            success: false,
            error: (error as Error).message,
        };
        res.status(400).json(data);
    }
}
