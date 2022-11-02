import { prisma } from "../config/database";

import { TUser } from "../types/userTypes";
import { Users } from "@prisma/client";

export async function findByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findFirst({
        where: {
            email,
        },
    });
}

export async function findByName(fullName: string): Promise<Users | null> {
    return await prisma.users.findFirst({
        where: {
            fullName,
        },
    });
}

export async function insertUser(user: TUser) {
    return await prisma.users.create({
        data: user,
    });
}
