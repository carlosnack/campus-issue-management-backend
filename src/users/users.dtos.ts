
export type CreateUserDto = {
    id: number;
    name: string;
    email: string;
    picture: string;
    passwordHash: string;
    userRole: string;
    extras: {
        [atr: string]: any;
    };
}