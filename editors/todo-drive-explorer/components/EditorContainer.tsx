/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  useDriveContext,
  exportDocument,
  type User,
} from "@powerhousedao/reactor-browser";
import {
  documentModelDocumentModelModule,
  type DocumentModelModule,
  type EditorContext,
  type EditorProps,
  type PHDocument,
  type EditorModule,
  type Operation,
} from "document-model";
import { useTimelineItems, getRevisionFromDate } from "@powerhousedao/common";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
  generateLargeTimeline,
  type TimelineItem,
} from "@powerhousedao/design-system";
import { useState, Suspense, type FC, useCallback, lazy } from "react";
import {
  ToDo
} from "../../../document-models/index.js"

export interface EditorContainerProps {
  driveId: string;
  documentId: string;
  documentType: string;
  onClose: () => void;
  title: string;
  context: EditorContext;
}

const documentModelsMap = {
  [ToDo.documentModel.id]: ToDo,
  [documentModelDocumentModelModule.documentModel.id]:
    documentModelDocumentModelModule,
};

// Create a type-safe lazy loader for editor modules
const createLazyModuleLoader = <T,>(loader: () => Promise<T>) => {
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

const documentEditorMap = {
  [ToDo.documentModel.id]: createLazyModuleLoader(() =>
    import("../../to-do-list/index.js").then(m => m.default)
  ),
  [documentModelDocumentModelModule.documentModel.id]: createLazyModuleLoader(() =>
    import("@powerhousedao/builder-tools/style.css").then(() =>
      import("@powerhousedao/builder-tools/document-model-editor").then(
        m => m.documentModelEditorModule
      )
    )
  ),
} as const;

function getDocumentModel(documentType: string) {
  return documentModelsMap[documentType];
}

function getDocumentEditor(documentType: string) {
  return documentEditorMap[documentType];
}

export const EditorContainer: React.FC<EditorContainerProps> = (props) => {
  const { driveId, documentId, documentType, onClose, title, context } = props;

  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null);
  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  const [editorModule, setEditorModule] = useState<unknown>(null);
  const { useDocumentEditorProps } = useDriveContext();
  const user = context.user as User | undefined;
  const timelineItems = useTimelineItems(documentId);

  const documentModelModule = getDocumentModel(
    documentType,
  ) as DocumentModelModule<PHDocument>;

  const { dispatch, error, document } = useDocumentEditorProps({
    documentId,
    documentType,
    driveId,
    documentModelModule,
    user,
  });

  const onExport = useCallback(async () => {
    if (document) {
      const ext = documentModelModule.documentModel.extension;
      await exportDocument(document, title, ext);
    }
  }, [document?.revision.global, document?.revision.local]);

  const loadingContent = (
    <div className="flex-1 flex justify-center items-center h-full">
      <DefaultEditorLoader />
    </div>
  );

  if (!document) return loadingContent;

  const editorLoader = getDocumentEditor(documentType);

  // Load editor module if not already loaded
  if (!editorModule && editorLoader) {
    void editorLoader().then(module => {
      setEditorModule(module);
    });
    return loadingContent;
  }

  if (!editorModule) {
    console.error("No editor found for document type:", documentType);
    return (
      <div className="flex-1">
        No editor found for document type: {documentType}
      </div>
    );
  }

  const moduleWithComponent = editorModule as EditorModule<PHDocument>;
  const EditorComponent = moduleWithComponent.Component;

  return showRevisionHistory ? (
    <RevisionHistory
      documentId={documentId}
      documentTitle={title}
      globalOperations={document.operations.global}
      key={documentId}
      localOperations={document.operations.local}
      onClose={() => setShowRevisionHistory(false)}
    />
  ) : (
    <Suspense fallback={loadingContent}>
      <DocumentToolbar
        onClose={onClose}
        onExport={onExport}
        onShowRevisionHistory={() => setShowRevisionHistory(true)}
        onSwitchboardLinkClick={() => {}}
        title={title}
        timelineButtonVisible
        timelineItems={timelineItems.data}
        onTimelineItemClick={setSelectedTimelineItem}
      />
      <EditorComponent
        context={{
          ...context,
          readMode: !!selectedTimelineItem,
          selectedTimelineRevision: getRevisionFromDate(
            selectedTimelineItem?.startDate,
            selectedTimelineItem?.endDate,
            document.operations.global,
          ),
        }}
        dispatch={dispatch}
        document={document}
        error={error}
      />
    </Suspense>
  );
};
