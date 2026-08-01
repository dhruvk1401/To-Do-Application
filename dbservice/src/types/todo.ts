export enum TodoStatus {
    STATUS_PENDING = "pending",
    STATUS_COMPLETED = "completed",
    STATUS_INPROGRESS = "in-progress",
}
export interface ITodo {
    task: string;
    timestamp: true;
    todostatus: TodoStatus;
}
