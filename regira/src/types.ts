export type AuthContextType = {
    loggedInfo: {
        logged: Logged | undefined,
        logFn: (logged: Logged) => void,
        API_URL: string
    },
}

export type Id = string | number;

export type Project = {
    id: Id;
    name: string | undefined;
    desc: string | undefined;
    active: boolean;
    userid?: number | undefined;
};

export type State = "open" | "in_progress" | "resolved" | "closed";
export type Type = "bug" | "feature" | "task";
export type Priority = "low" | "medium" | "high";

export type Issue = {
    id: Id;
    title: string;
    desc: string;
    type: Type;
    priority: Priority;
    state: State;
    projectId?: Id;
    authorId?: number;
    assigneeId?: number;
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
    addProject?: (add: Project) => void;
    closeModal: () => void;
    addIssue?: {
        issueFn: (add: Issue) => void;
        issueState: State | undefined;
    }
}

export type HeaderType = {
    logged: Logged;
    logout: () => void;
}

export type AddProjectType = {
    addProject?: (add: Project) => void;
    closeModal: () => void;
}

export type AddIssueType = {
    issueState: State | undefined;
    addIssue?: (add: Issue) => void;
    closeModal: () => void;
}

export type ProjectContainer = {
    project: Project
}

export type StateContaierType = {
    title: string;
    issues: Issue[];
    createIssue?: (state: State) => void;
}

export type IssueContainerType = {
    issue: Issue;
    index: number;
}