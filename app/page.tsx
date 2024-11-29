"use client";

import React, { useState, useEffect } from "react";
import { CodeEditor } from "@/app/components/CodeEditor";
import { Sidebar } from "@/app/components/LanguageSidebar";
import { LANGUAGES, Language } from "@/app/components/LanguageConfig";
import { Moon, Sun } from "lucide-react";

export default function CodeEditorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(selectedLanguage.defaultCode);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [output, setOutput] = useState("No output yet");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkMode.matches ? "dark" : "light");

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    prefersDarkMode.addEventListener("change", handleThemeChange);
    return () =>
      prefersDarkMode.removeEventListener("change", handleThemeChange);
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setCode(language.defaultCode);
    setOutput("No output yet");
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = () => {
    if (
      selectedLanguage.name === "JavaScript" ||
      selectedLanguage.name === "TypeScript"
    ) {
      const originalConsoleLog = console.log;
      const logs: string[] = [];

      console.log = (...args) => {
        logs.push(args.map((arg) => String(arg)).join(" "));
      };

      try {
        new Function(code)();

        setOutput(
          logs.length > 0 ? logs.join("\n") : "Code executed with no output"
        );
      } catch (error) {
        setOutput(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        console.log = originalConsoleLog;
      }
    } else {
      setOutput(`Running ${selectedLanguage.name} code...\n${code}`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex">
        <Sidebar
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <div className="flex-grow flex flex-col">
          <div className="flex flex-col md:flex-row">
          
            <div className="w-full md:w-1/2">
              <div
                className={`h-12 flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <span className="px-8 font-bold">main.py</span>
                <div
                  className={`flex-grow border-l p-1.5 border-b ${
                    theme === "dark" ? "border-gray-600" : "border-gray-300 "
                  } ${
                    theme === "dark" ? "bg-zinc-700" : "bg-gray-300"
                  } flex justify-end items-center px-4`}
                >
                  <button
                    onClick={handleRun}
                    className="bg-blue-500 text-white font-bold px-4 py-1.5 rounded hover:bg-blue-600"
                  >
                    Run
                  </button>
                </div>
              </div>

              <CodeEditor
                language={selectedLanguage}
                theme={theme}
                onCodeChange={handleCodeChange}
              />
            </div>

           
            <div
              className={`w-full md:w-1/2  border-l ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-800"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div
                className={`h-12 flex justify-between  ${
                  theme === "dark" ? "bg-zinc-700" : "bg-gray-300"
                } border-gray-700 items-center px-4`}
              >
                <span className="font-bold">Output</span>
                <div>
                  <div className="flex justify-between gap-4 items-center px-4 py-">
                    <button
                      onClick={toggleTheme}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-400"
                    >
                      {theme === "light" ? <Moon /> : <Sun />}
                    </button>
                    <button
                      className={`${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      } px-4 py-1.5 border  rounded-sm border-gray-600`}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-2 overflow-auto">
                <pre
                  className={`whitespace-pre-wrap ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
