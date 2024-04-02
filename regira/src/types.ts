export type AuthContextType = {
    loggedInfo: {
        logged: User,
        logFn: (logged: User) => void,
        API_URL: string
    },
}

export type Id = string | number;

export type User = {
    id: Id;
    name: string;
    email: string;
}

export type UserTagContainer = {
    id: Id;
}

export type Project = {
    id: Id;
    name: string | undefined;
    desc: string | undefined;
    active: boolean;
};

export type Comment = {
    id: Id;
    desc: string;
    UserId: Id;
    IssueId: Id;
}

export type CommentContainer = {
    issueId: Id;
}

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

export type Tags = {
    id: Id;
    name: string;
}

export type CreateNewTag = {
    tags: Tags[];
    addTag: (tag: Tags) => void;
}

export type LogIn = {
    email: string;
    password: string;
};



export type RegisterIn = {
    name: string;
    email: string;
    password: string;
};

export type issueFun = (issue: Issue) => void;

export type ModalType = {
    type: "project" | "issue" | "issueView";
    addProject?: (add: Project) => void;
    closeModal: () => void;
    addIssueInfo?: {
        issueFn: issueFun;
        issueState: State | undefined;
    }
    deleteIssue?: issueFun;
    issue?: Issue;
};

export type HeaderType = {
    logged: User;
    logout: () => void;
};

export type AddProjectType = {
    addProject?: (add: Project) => void;
    closeModal: () => void;
};

export type AddNewUser = {
    addUser: (email: string) => void;
}

export type AddIssueType = {
    issueState: State | undefined;
    addIssue?: issueFun;
    closeModal: () => void;
};

export type ProjectContainer = {
    project: Project
    deleteProject: (project: Project) => void;
};

export type StateContaierType = {
    title: string;
    issues: Issue[];
    createIssue?: (state: State) => void;
    issueInfo?: issueFun;
};

export type IssueContainerType = {
    issue: Issue;
    index: number;
    issueInfo?: issueFun;
};

export type IssueViewType = {
    issue: Issue;
    deletedIssue: issueFun;
    closeModal: () => void;
};