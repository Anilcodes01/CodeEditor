'use client';

import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {  Language } from './LanguageConfig';
import { EditorView } from '@codemirror/view';

interface CodeEditorProps {
  language: Language;
  theme: 'light' | 'dark';
  onCodeChange: (code: string) => void;
}

export function CodeEditor({ 
  language, 
  theme, 
  onCodeChange 
}: CodeEditorProps) {
  const handleChange = useCallback((value: string) => {
    onCodeChange(value);
  }, [onCodeChange]);

  
  const darkTheme = EditorView.theme({
    "&": {
      backgroundColor: "#212836", 
      color: "#ffffff", 
      height: "100%",
      borderRadius: "8px",
    },
    ".cm-content": {
      backgroundColor: "#212836", 
      color: "#e5e7eb", 
      caretColor: "#ffffff", 
    },
    ".cm-gutters": {
      backgroundColor: "#212836", 
      color: "#6b7280", 
      borderRight: "0.5px solid #2c3e50",
    },
    ".cm-line": {
      fontFamily: "'Fira Code', monospace",
      fontSize: "14px",
    },
  });

  const lightTheme = EditorView.theme({
    "&": {
      backgroundColor: "#f9fafb", 
      color: "#1f2937", 
      height: "100%",
      borderRadius: "8px",
    },
    ".cm-content": {
      backgroundColor: "#f9fafb", 
      color: "#1f2937", 
      caretColor: "#1f2937", 
    },
    ".cm-gutters": {
      backgroundColor: "#f3f4f6",
      color: "#9ca3af", 
      borderRight: "0.5px solid #d1d5db",
    },
    ".cm-line": {
      fontFamily: "'Fira Code', monospace",
      fontSize: "14px",
    },
  });

  
  const customTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <CodeMirror
      value={language.defaultCode}
      extensions={[language.extension, customTheme]} 
      onChange={handleChange}
      height="770px"
    />
  );
}
