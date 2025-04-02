import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import type { FileNode, Node } from "document-drive";
import { EditorContainer } from "./EditorContainer.js";
import type { EditorContext, DocumentModelModule } from "document-model";
import { CreateDocumentModal } from "@powerhousedao/design-system";
import { CreateDocument } from "./CreateDocument.js";
import { useDriveContext } from "@powerhousedao/reactor-browser";

import { type ToDoState } from "../types/todo.js"

interface DriveExplorerProps {
  driveId: string;
  nodes: Node[];
  onAddFolder: (name: string, parentFolder?: string) => void;
  onDeleteNode: (nodeId: string) => void;
  renameNode: (nodeId: string, name: string) => void;
  onCopyNode: (nodeId: string, targetName: string, parentId?: string) => void;
  context: EditorContext;
}

export function DriveExplorer({
  driveId,
  nodes,
  context,
}: DriveExplorerProps) {
  const [activeDocumentId, setActiveDocumentId] = useState<
    string | undefined
  >();
  const [openModal, setOpenModal] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);
  const { addDocument, documentModels, useDriveDocumentStates } = useDriveContext();

  const [state, fetchDocuments] = useDriveDocumentStates({ driveId });

  useEffect(() => {
    fetchDocuments(driveId).catch(console.error);
  }, [activeDocumentId]);

  const { todoNodes } = useMemo(() => {
    return Object.keys(state).reduce(
      (acc, curr) => {
        const document = state[curr];
        if (document.documentType.startsWith("powerhouse/todo")) {
          acc.todoNodes[curr] = document as ToDoState;
        }

        return acc;
      },
      {
        todoNodes: {} as Record<string, ToDoState>,
      },
    );
  }, [state]);


  const handleEditorClose = useCallback(() => {
    setActiveDocumentId(undefined);
  }, []);

  const onCreateDocument = useCallback(
    async (fileName: string) => {
      setOpenModal(false);

      const documentModel = selectedDocumentModel.current;
      if (!documentModel) return;

      const node = await addDocument(
        driveId,
        fileName,
        documentModel.documentModel.id,
      );

      selectedDocumentModel.current = null;
      setActiveDocumentId(node.id);
    },
    [addDocument, driveId],
  );

  const onSelectDocumentModel = useCallback(
    (documentModel: DocumentModelModule) => {
      selectedDocumentModel.current = documentModel;
      setOpenModal(true);
    },
    [],
  );

  const filteredDocumentModels = documentModels;


  const fileNodes = nodes.filter((node) => node.kind === "file") as FileNode[];
  // Get the active document info from nodes
  const activeDocument = activeDocumentId
    ? fileNodes.find((file) => file.id === activeDocumentId)
    : undefined;

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeDocument ? (
          <EditorContainer
            context={context}
            documentId={activeDocumentId!}
            documentType={activeDocument.documentType}
            driveId={driveId}
            onClose={handleEditorClose}
            title={activeDocument.name}
          />
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">ToDos:</h2>
            <table>
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Document Type</th>
                  <th>Tasks</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(todoNodes).map(([documentId, todoNode]) => (
                  <tr key={documentId}>
                    <td>
                      <div onClick={() => setActiveDocumentId(documentId)}>
                        {documentId}
                      </div>
                    </td>
                    <td>{todoNode.documentType}</td>
                    <td>{todoNode.global.stats.total}</td>
                    <td>{todoNode.global.stats.checked}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Create Document Section */}
            <CreateDocument
              createDocument={onSelectDocumentModel}
              documentModels={filteredDocumentModels}
            />
          </>
        )}
      </div>

      {/* Create Document Modal */}
      <CreateDocumentModal
        onContinue={onCreateDocument}
        onOpenChange={(open) => setOpenModal(open)}
        open={openModal}
      />
    </div>
  );
}
