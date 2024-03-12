export type Id = string | number;

export type Column = {
    id: Id;
    name: string;
    desc: string;
    active: boolean;
    userid: number;
};

export type Issue = {
    id: Id;
    title: string;
    type: "bug" | "feature" | "task";
    priority: "low" | "medium" | "high";
    state: "open" | "in_progress" | "resolved" | "closed";
    projectId: number;
    authorId: number;
    assigneeId: number;
}

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

export type ModalType = {
    type: "project" | "issue";
    addType: (add: Column | Issue) => void;
}

export type HeaderType = {
    logged: Logged;
    logout: () => void;
}