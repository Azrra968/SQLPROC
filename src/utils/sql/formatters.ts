import { format } from 'sql-formatter';

export const formatSQL = (sql: string): string => {
  return format(sql, {
    language: 'tsql',
    indent: '    ',
    uppercase: true,
  });
};