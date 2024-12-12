import React, { useCallback } from 'react';
import { Upload, FolderUp } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onProcess: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, onProcess }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div
        className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="text-lg font-medium text-gray-600 text-center">
            Arrastra archivos SQL o una carpeta aquí
          </p>
          <div className="flex gap-4">
            <label className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Seleccionar Archivos
              <input
                type="file"
                className="hidden"
                multiple
                accept=".sql"
                onChange={handleFileInput}
              />
            </label>
            <label className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors flex items-center">
              <FolderUp className="w-4 h-4 mr-2" />
              Seleccionar Carpeta
              <input
                type="file"
                className="hidden"
                webkitdirectory="true"
                directory=""
                multiple
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={onProcess}
        className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Procesar Archivos
      </button>
    </div>
  );
};