import React from 'react';
import { Files, Download } from 'lucide-react';
import { SQLFile } from '../types';

interface ProcessedFilesListProps {
  files: SQLFile[];
  onDownload: () => void;
}

export const ProcessedFilesList: React.FC<ProcessedFilesListProps> = ({ files, onDownload }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Files className="mr-2" />
        Archivos Procesados ({files.length})
      </h2>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {files.map((file) => (
          <div
            key={file.id} // Use unique id as key
            className="p-3 bg-gray-50 rounded-md flex justify-between items-center"
          >
            <span className="font-medium">{file.name}</span>
            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {file.type}
            </span>
          </div>
        ))}
      </div>
      {files.length > 0 && (
        <button
          onClick={onDownload}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Download className="mr-2" />
          Descargar Scripts
        </button>
      )}
    </div>
  );
};