import { NextApiRequest, NextApiResponse } from 'next';
import { SuccessResponse } from '@/utils/types';
import { prisma } from '@/utils/db';
import { SecureUser } from '@/modules/users/userTypes';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            admin: true,
            name: true,
            email: true,
            gender: true,
            householdId: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    const data: SuccessResponse<SecureUser[]> = {
        success: true,
        data: users,
    };
    res.status(200).json(data);
}
