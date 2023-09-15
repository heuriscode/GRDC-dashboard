import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { ErrorResponse, SuccessResponse } from '@/utils/types';
import { prisma } from '@/utils/db';
import { SecureUser, UserLoginSchema } from '@/modules/users/userTypes';
import { userUpdateFormSchema } from '@/modules/users/userUpdateFormSchema';

const ERROR_MSG = 'Invalid email/password';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const body = req.body as UserLoginSchema;
        await userUpdateFormSchema.parseAsync(body);

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (!user) throw new Error(ERROR_MSG);

        const { password, ...userData } = user;

        const match = await compare(body.password, password);

        if (!match) {
            throw new Error(ERROR_MSG);
        }

        const data: SuccessResponse<SecureUser> = {
            success: true,
            data: userData,
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
