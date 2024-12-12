import { useCallback } from 'react';
import JSZip from 'jszip';
import { SQLFile } from '../types';

export const useFileDownload = () => {
  const handleDownload = useCallback(async (processedFiles: SQLFile[]) => {
    const zip = new JSZip();
    
    processedFiles.forEach((file) => {
      zip.file(file.name, file.content);
      if (file.rollbackContent) {
        zip.file(`RB_${file.name}`, file.rollbackContent);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sql-scripts.zip';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return { handleDownload };
};