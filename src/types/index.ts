export interface SQLFile {
  id: string; // Add unique identifier
  name: string;
  content: string;
  type: 'NEW' | 'MOD' | 'ORIGINAL';
  rollbackContent?: string;
}

export interface ProcessedFiles {
  original: SQLFile;
  rollback: SQLFile;
}