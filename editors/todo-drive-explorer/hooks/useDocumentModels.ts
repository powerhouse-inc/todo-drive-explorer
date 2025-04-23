import { useState, useEffect } from 'react';
import { documentModelsMap, documentEditorMap, createLazyModuleLoader } from '../document-model.js';
import { type DocumentModelModule, type EditorModule, type PHDocument } from 'document-model';

/**
 * Hook that returns the document model for a given document type
 */
export function useDocumentModel(documentType: string): DocumentModelModule<any> {
  return documentModelsMap[documentType];
}

/**
 * Hook that loads and returns the editor module for a given document type
 */
export function useDocumentEditorModule(documentType: string) {
  const [editorModule, setEditorModule] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const editorLoader = documentEditorMap[documentType];
    
    if (editorLoader && !editorModule) {
      setIsLoading(true);
      
      editorLoader()
        .then(module => {
          setEditorModule(module);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err instanceof Error ? err : new Error('Failed to load editor module'));
          setIsLoading(false);
        });
    }
  }, [documentType, editorModule]);

  return {
    editorModule,
    isLoading,
    error
  };
} 