
export type CreateUserDto = {
    name: string;
    email: string;
    picture: string;
    userRole: string;
    extras: {
        password: string;
        passwordConfirm: string;
    };
}