export interface Task {
    id: string;
    title: string;
    details: string;
    color: string;
    done: boolean;
    createdAt:number;
}

export type NewTask = Omit<Task, 'id'>;