import { type ToDoListDocument} from "../../../document-models/to-do-list/index.js"

export type ToDoState = {
    documentType: string;
    revision: {
        global: number;
        local: number;
    };
    global: ToDoListDocument["state"]["global"];
};