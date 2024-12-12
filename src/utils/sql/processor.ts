import { SQLFile } from '../../types';
import { generateHeader, generateFooter, generateComments } from './templates';

const findCreateProcedureIndex = (content: string): number => {
  const match = content.toUpperCase().match(/CREATE\s+(?:OR\s+ALTER\s+)?PROCEDURE/i);
  return match ? match.index! : -1;
};

const findAsIndex = (content: string, startIndex: number): number => {
  const asMatch = content.slice(startIndex).toUpperCase().match(/\bAS\b/);
  return asMatch ? startIndex + asMatch.index! + 2 : -1;
};

const insertCommentsAfterAs = (content: string): string => {
  const createIndex = findCreateProcedureIndex(content);
  if (createIndex === -1) return content;

  const asIndex = findAsIndex(content, createIndex);
  if (asIndex === -1) return content;

  const before = content.slice(0, asIndex);
  const after = content.slice(asIndex);
  
  return before + '\n' + generateComments('SQL Script', 'Sistema') + after;
};

export const processFiles = (files: SQLFile[]): SQLFile[] => {
  return files.map(file => {
    const spName = file.name.replace('.sql', '').split('_').slice(0, -1).join('_');
    const contentWithComments = insertCommentsAfterAs(file.content);
    
    const processedContent = `${generateHeader(spName)}${contentWithComments}${generateFooter(spName)}`;
    const rollbackContent = `${generateHeader(spName)}${file.content}${generateFooter(spName)}`;
    
    return {
      ...file,
      content: processedContent,
      rollbackContent,
    };
  });
};