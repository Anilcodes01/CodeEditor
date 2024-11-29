import { LanguageSupport } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { go } from '@codemirror/lang-go';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';


export interface Language {
  name: string;
  extension: LanguageSupport;
  defaultCode: string;
}

export const LANGUAGES: Language[] = [
  {
    name: 'Python',
    extension: python(),
    defaultCode: 'def hello_world():\n    print("Hello, World!")\n\nhello_world()'
  },
  {
    name: 'JavaScript',
    extension: javascript(),
    defaultCode: 'function helloWorld() {\n    console.log("Hello, World!");\n}\n\nhelloWorld();'
  },
  {
    name: 'TypeScript',
    extension: javascript(),
    defaultCode: 'function helloWorld(): void {\n    console.log("Hello, World!");\n}\n\nhelloWorld();'
  },
  {
    name: 'Go',
    extension: go(),
    defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
  },
  {
    name: 'PHP',
    extension: php(),
    defaultCode: '<?php\n$greeting = "Hello, World!";\necho $greeting;\n?>'
  },
  {
    name: 'Swift',
    extension: javascript(),
    defaultCode: 'import Foundation\n\nprint("Hello, World!")'
  },
  {
    name: 'Rust',
    extension: rust(),
    defaultCode: 'fn main() {\n    println!("Hello, World!");\n}'
  },
  {
    name: 'C++',
    extension: cpp(),
    defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
  }
];
