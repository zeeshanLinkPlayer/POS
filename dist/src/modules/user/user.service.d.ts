import { User, Permission } from '@prisma/client';
import { JwtPayload } from '../../types/auth.types';
import { CreateUserInput, UpdateUserInput, SafeUser } from '../../types/user.types';
type LoginResponse = {
    user: Omit<User, 'password'>;
    token: string;
};
export declare const userService: {
    createUser: (data: CreateUserInput, currentUser?: JwtPayload) => Promise<SafeUser>;
    createManager: (data: Omit<CreateUserInput, "role" | "permissions"> & {
        permissions?: Permission[];
    }, currentUser: JwtPayload) => Promise<SafeUser>;
    getAllUsers: (currentUser: JwtPayload) => Promise<SafeUser[]>;
    getUserById: (id: string, currentUser: JwtPayload) => Promise<SafeUser | null>;
    updateUser: (id: string, data: UpdateUserInput, currentUser: JwtPayload) => Promise<SafeUser>;
    deleteUser: (id: string, currentUser: JwtPayload) => Promise<void>;
    login: (email: string, password: string) => Promise<LoginResponse>;
    getProfile: (userId: string) => Promise<SafeUser>;
};
export {};
