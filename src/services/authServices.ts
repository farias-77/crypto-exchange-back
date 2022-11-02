import * as userRepositories from "../repositories/userRepository";

import { TUser } from "../types/userTypes";
import { Users } from "@prisma/client";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function validateConfirmPassword(
    password: string,
    confirmPassword: string
) {
    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "Password and confirmPassword must be equal!",
        };
    }

    return;
}

export async function validateNewEmail(email: string) {
    const user: Users | null = await findByEmail(email);

    if (user) {
        throw { type: "conflict", message: "Email already in use!" };
    }

    return;
}

export async function validateNewUserName(fullName: string) {
    const user: Users | null = await findByName(fullName);

    if (user) {
        throw { type: "conflict", message: "You already have an account!" };
    }

    return;
}

export async function insertUser(user: TUser) {
    const encryptedUser: TUser = {
        ...user,
        password: await encryptsPassword(user.password),
    };

    return await userRepositories.insertUser(encryptedUser);
}

export function sanitizeUser(user: Users) {
    return { id: user.id, email: user.email, fullName: user.fullName };
}

export async function validatePassword(userBody: TUser) {
    const userDatabase: Users | null = await findByEmail(userBody.email);

    if (
        !userDatabase ||
        !(await bcrypt.compare(userBody.password, userDatabase.password))
    ) {
        throw { type: "unauthorized", message: "Invalid credentials." };
    }

    return;
}

export async function getUserRole(email: string) {
    const user: Users | null = await findByEmail(email);

    return user?.userPrivilege;
}

export async function generateToken(email: string) {
    const user: Users | null = await findByEmail(email);

    const secretKey: string = process.env.JWT_SECRET || "";
    const token: string = user ? jwt.sign({ id: user.id }, secretKey) : "";

    return token;
}

export async function validateUserPrivilege(userId: number) {
    const user: Users | null = await findById(userId);

    if (!user || user.userPrivilege !== "ADMIN") {
        throw {
            type: "unauthorized",
            message: "You do not have access to wallets updates!",
        };
    }

    return;
}

async function encryptsPassword(password: string): Promise<string> {
    const SALT: number = 10;
    const encryptedPassword: string = await bcrypt.hash(password, SALT);

    return encryptedPassword;
}

async function findByEmail(email: string): Promise<Users | null> {
    return await userRepositories.findByEmail(email);
}

async function findByName(name: string): Promise<Users | null> {
    return await userRepositories.findByName(name);
}

async function findById(userId: number): Promise<Users | null> {
    return await userRepositories.findById(userId);
}
