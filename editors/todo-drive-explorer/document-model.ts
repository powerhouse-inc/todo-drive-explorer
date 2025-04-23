import {
  documentModelDocumentModelModule,
  type DocumentModelModule,
  type EditorModule,
  type PHDocument,
} from "document-model";
import { ToDo } from "../../document-models/index.js";

// Create a type-safe lazy loader for editor modules
export const createLazyModuleLoader = <T,>(loader: () => Promise<T>) => {
  let modulePromise: Promise<T> | null = null;
  let loadedModule: T | null = null;
  
  return () => {
    if (loadedModule) return Promise.resolve(loadedModule);
    if (!modulePromise) {
      modulePromise = loader().then(module => {
        loadedModule = module;
        return module;
      });
    }
    return modulePromise;
  };
};

// Using a more generic type to avoid type errors with specific document models
export const documentModelsMap: Record<string, DocumentModelModule<any>> = {
  [ToDo.documentModel.id]: ToDo,
  [documentModelDocumentModelModule.documentModel.id]:
    documentModelDocumentModelModule,
};

export const documentEditorMap = {
  [ToDo.documentModel.id]: createLazyModuleLoader(() =>
    import("../to-do-list/index.js").then(m => m.default)
  ),
  [documentModelDocumentModelModule.documentModel.id]: createLazyModuleLoader(() =>
    import("@powerhousedao/builder-tools/style.css").then(() =>
      import("@powerhousedao/builder-tools/document-model-editor").then(
        m => m.documentModelEditorModule
      )
    )
  ),
} as const; 