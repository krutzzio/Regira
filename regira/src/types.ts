export type Id = string | number;

export type Column = {
    id: Id;
    name: string;
    desc: string;
    active: boolean;
    userid: number;
};

export type LogIn = {
    email: string;
    password: string;
};

export type Logged = {
    name: string;
    id: number;
};

export type RegisterIn = {
    name: string;
    email: string;
    password: string;
}