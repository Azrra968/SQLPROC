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