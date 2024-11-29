'use client';

import React from 'react';
import { LanguageIcons } from './LanguageIcons';
import { LANGUAGES, Language } from './LanguageConfig';
import { Code } from 'lucide-react';

interface SidebarProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function Sidebar({ 
  selectedLanguage, 
  onLanguageChange 
}: SidebarProps) {
  return (
    <div className="    p-2 space-y-2 flex flex-col items-center">
      {LANGUAGES.map((lang) => {
        const Icon = LanguageIcons[lang.name as keyof typeof LanguageIcons] || Code;
        return (
          <button
            key={lang.name}
            onClick={() => onLanguageChange(lang)}
            className={`p-2 rounded-sm  border border-gray-500 ${
              selectedLanguage.name === lang.name 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title={lang.name}
          >
            <Icon size={24} />
          </button>
        );
      })}
    </div>
  );
}