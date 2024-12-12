import { useState, useCallback } from 'react';
import { SQLFile } from '../types';
import { processFiles } from '../utils/sql/processor';

export const useFileProcessor = () => {
  const [files, setFiles] = useState<SQLFile[]>([]);
  const [processedFiles, setProcessedFiles] = useState<SQLFile[]>([]);
  const [editorContent, setEditorContent] = useState<string>('');

  const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
    const newFiles = await Promise.all(
      selectedFiles.map(async (file) => {
        const content = await file.text();
        const type = file.name.includes('_NUEVO')
          ? 'NEW'
          : file.name.includes('_MOD')
          ? 'MOD'
          : 'ORIGINAL';
        
        return {
          id: `${file.name}-${Date.now()}`,
          name: file.name,
          content,
          type,
        } as SQLFile;
      })
    );
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setEditorContent(value || '');
  }, []);

  const handleProcessFiles = useCallback(() => {
    if (files.length === 0) return;
    const processed = processFiles(files);
    setProcessedFiles(prev => [...prev, ...processed]);
    setFiles([]); // Clear processed files
  }, [files]);

  const handleProcessEditor = useCallback(() => {
    if (!editorContent.trim()) return;
    
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const editorFile: SQLFile = {
      id: `editor-${Date.now()}`,
      name: `SCRIPT_SQL_${timestamp}.sql`,
      content: editorContent,
      type: 'NEW'
    };

    const processed = processFiles([editorFile]);
    setProcessedFiles(prev => [...prev, ...processed]);
    setEditorContent(''); // Clear editor after processing
  }, [editorContent]);

  return {
    files,
    processedFiles,
    editorContent,
    handleFilesSelected,
    handleEditorChange,
    handleProcessFiles,
    handleProcessEditor
  };
};