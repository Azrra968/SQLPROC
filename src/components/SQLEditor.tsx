import React from 'react';
import Editor from '@monaco-editor/react';

interface SQLEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const SQLEditor: React.FC<SQLEditorProps> = ({ value, onChange }) => {
  return (
    <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};