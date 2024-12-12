import { format } from 'sql-formatter';
import { SQLFile } from '../types';

export const generateHeader = (spName: string): string => {
  return `IF EXISTS ( SELECT *
             FROM   sysobjects
             WHERE  id = object_id(N'${spName}')
                    AND OBJECTPROPERTY(id, N'IsProcedure') = 1 )
BEGIN
    DROP PROCEDURE ${spName}
    PRINT 'Procedimiento Almacenado ${spName} eliminado ' + db_name() + ' ' + CONVERT(VARCHAR, GETDATE(), 120)
END    
GO\n\n`;
};

export const generateFooter = (spName: string): string => {
  return `\nIF EXISTS (SELECT * FROM sysobjects WHERE name = '${spName}')
    PRINT 'Procedimiento Almacenado ${spName} creado ' + db_name() + ' ' + CONVERT(VARCHAR, GETDATE(), 120)
GO`;
};

export const generateComments = (description: string, author: string): string => {
  const currentDate = new Date().toLocaleDateString('es-ES');
  return `/* Descripcion : ${description}
 * Autor       : ${author}
 * Fecha       : ${currentDate}
 * Comentario  : Script generado automáticamente
 */\n\n`;
};

export const formatSQL = (sql: string): string => {
  return format(sql, {
    language: 'tsql',
    indent: '    ',
    uppercase: true,
  });
};

export const processFiles = (files: SQLFile[]): SQLFile[] => {
  return files.map(file => {
    const spName = file.name.replace('.sql', '').split('_').slice(0, -1).join('_');
    const processedContent = `${generateHeader(spName)}${generateComments('SQL Script', 'Sistema')}${file.content}${generateFooter(spName)}`;
    const rollbackContent = `${generateHeader(spName)}${generateComments('Rollback script', 'Sistema')}${file.content}`;
    
    return {
      ...file,
      content: processedContent,
      rollbackContent,
    };
  });
};