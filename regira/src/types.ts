export type Id = string | number;

export type Column = {
    id: Id;
    title: string;
};

export type LogIn = {
    email: string;
    password: string;
};

export type Logged = {
    name: string;
    id: number;
};