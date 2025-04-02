import { type ToDoDocument} from "../../../document-models/to-do/index.js"

export type ToDoState = {
    documentType: string;
    revision: {
        global: number;
        local: number;
    };
    global: ToDoDocument["state"]["global"];
};