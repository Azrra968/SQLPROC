import React from 'react';
import { FileUploader } from './components/FileUploader';
import { SQLEditor } from './components/SQLEditor';
import { ProcessedFilesList } from './components/ProcessedFilesList';
import { useFileProcessor } from './hooks/useFileProcessor';
import { useFileDownload } from './hooks/useFileDownload';

function App() {
  const { 
    files, 
    processedFiles, 
    editorContent,
    handleFilesSelected, 
    handleEditorChange,
    handleProcessFiles,
    handleProcessEditor
  } = useFileProcessor();
  const { handleDownload } = useFileDownload();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Procesador de Scripts SQL
          </h1>
          <p className="mt-2 text-gray-600">
            Carga, edita y genera scripts SQL con sus rollbacks
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FileUploader 
            onFilesSelected={handleFilesSelected}
            onProcess={handleProcessFiles}
          />
          <ProcessedFilesList 
            files={processedFiles}
            onDownload={() => handleDownload(processedFiles)}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Editor SQL</h2>
            <button
              onClick={handleProcessEditor}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              disabled={!editorContent.trim()}
            >
              Procesar SQL del Editor
            </button>
          </div>
          <SQLEditor value={editorContent} onChange={handleEditorChange} />
        </div>
      </div>
    </div>
  );
}