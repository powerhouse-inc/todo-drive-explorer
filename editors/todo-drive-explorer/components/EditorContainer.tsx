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
  useDocumentModel, 
  useDocumentEditorModule 
} from "../hooks/useDocumentModels.js";

export interface EditorContainerProps {
  driveId: string;
  documentId: string;
  documentType: string;
  onClose: () => void;
  title: string;
  context: EditorContext;
}

export const EditorContainer: React.FC<EditorContainerProps> = (props) => {
  const { driveId, documentId, documentType, onClose, title, context } = props;

  const [selectedTimelineItem, setSelectedTimelineItem] = useState<TimelineItem | null>(null);
  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  const { useDocumentEditorProps } = useDriveContext();
  const user = context.user as User | undefined;
  const timelineItems = useTimelineItems(documentId);

  const documentModelModule = useDocumentModel(
    documentType,
  ) as DocumentModelModule<PHDocument>;

  const { editorModule, isLoading } = useDocumentEditorModule(documentType);

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

  if (!document || isLoading) return loadingContent;

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
