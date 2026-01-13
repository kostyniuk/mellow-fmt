export interface PrettierOptionValue {
  value: string | boolean | number | Record<string, any>
  label: string
  description?: string
  codeExample: string
}

export interface SubOption {
  key: string
  label: string
  defaultValue: string | boolean | number
  type?: 'checkbox' | 'select'
  choices?: string[]
}

export interface PrettierOption {
  name: string
  key: string
  description: string
  defaultValue: string | boolean | number | Record<string, any>
  cliOverride: string
  apiOverride: string
  options: PrettierOptionValue[]
  language?: string
  subOptions?: SubOption[]
  inputCode?: string // Unformatted code for dynamic formatting
}

export const prettierOptions: PrettierOption[] = [
  {
    name: 'Print Width',
    key: 'printWidth',
    description:
      'Specify the line length that the printer will wrap on. For readability, it is recommended not to exceed 80 characters.',
    defaultValue: 80,
    cliOverride: '--print-width <int>',
    apiOverride: 'printWidth: <int>',
    options: [
      {
        value: 80,
        label: '80 (default)',
        description: 'Standard line width for readability',
        codeExample: `function example() {
  const message = "Hello";
  return message;
}`,
      },
      {
        value: 120,
        label: '120',
        description: 'Wider lines, common in some teams',
        codeExample: `function example() {
  const message = "Hello, this is a longer line that would wrap at 80 but fits at 120 characters easily";
  return message;
}`,
      },
    ],
  },
  {
    name: 'Tab Width',
    key: 'tabWidth',
    description: 'Specify the number of spaces per indentation-level.',
    defaultValue: 2,
    cliOverride: '--tab-width <int>',
    apiOverride: 'tabWidth: <int>',
    options: [
      {
        value: 2,
        label: '2 (default)',
        codeExample: `function example() {
  if (true) {
    return "nested";
  }
}`,
      },
      {
        value: 4,
        label: '4',
        codeExample: `function example() {
    if (true) {
        return "nested";
    }
}`,
      },
    ],
  },
  {
    name: 'Tabs',
    key: 'useTabs',
    description: 'Indent lines with tabs instead of spaces.',
    defaultValue: false,
    cliOverride: '--use-tabs',
    apiOverride: 'useTabs: <bool>',
    options: [
      {
        value: false,
        label: 'false (default)',
        description: 'Use spaces for indentation',
        codeExample: `function example() {
  return "spaces";
}`,
      },
      {
        value: true,
        label: 'true',
        description: 'Use tabs for indentation',
        codeExample: `function example() {
	return "tabs";
}`,
      },
    ],
  },
  {
    name: 'Semicolons',
    key: 'semi',
    description: 'Print semicolons at the ends of statements.',
    defaultValue: true,
    cliOverride: '--no-semi',
    apiOverride: 'semi: <bool>',
    options: [
      {
        value: true,
        label: 'true (default)',
        description: 'Add a semicolon at the end of every statement',
        codeExample: `const greeting = "Hello";
const name = "World";
console.log(greeting, name);`,
      },
      {
        value: false,
        label: 'false',
        description:
          'Only add semicolons at the beginning of lines that may introduce ASI failures',
        codeExample: `const greeting = "Hello"
const name = "World"
console.log(greeting, name)`,
      },
    ],
  },
  {
    name: 'Quotes',
    key: 'singleQuote',
    description:
      'Use single quotes instead of double quotes. JSX quotes ignore this option.',
    defaultValue: false,
    cliOverride: '--single-quote',
    apiOverride: 'singleQuote: <bool>',
    options: [
      {
        value: false,
        label: 'false (default)',
        description: 'Use double quotes',
        codeExample: `const greeting = "Hello";
const message = "It's a nice day";`,
      },
      {
        value: true,
        label: 'true',
        description: 'Use single quotes',
        codeExample: `const greeting = 'Hello';
const message = "It's a nice day";`,
      },
    ],
  },
  {
    name: 'Quote Props',
    key: 'quoteProps',
    description: 'Change when properties in objects are quoted.',
    defaultValue: 'as-needed',
    cliOverride: '--quote-props <as-needed|consistent|preserve>',
    apiOverride: 'quoteProps: "<as-needed|consistent|preserve>"',
    options: [
      {
        value: 'as-needed',
        label: 'as-needed (default)',
        description: 'Only add quotes around object properties where required',
        codeExample: `const obj = {
  foo: "bar",
  "foo-bar": "baz",
  123: "number"
};`,
      },
      {
        value: 'consistent',
        label: 'consistent',
        description:
          'If at least one property requires quotes, quote all properties',
        codeExample: `const obj = {
  "foo": "bar",
  "foo-bar": "baz",
  "123": "number"
};`,
      },
      {
        value: 'preserve',
        label: 'preserve',
        description: 'Respect the input use of quotes in object properties',
        codeExample: `const obj = {
  "foo": "bar",
  "foo-bar": "baz",
  123: "number"
};`,
      },
    ],
  },
  {
    name: 'JSX Quotes',
    key: 'jsxSingleQuote',
    description: 'Use single quotes instead of double quotes in JSX.',
    defaultValue: false,
    cliOverride: '--jsx-single-quote',
    apiOverride: 'jsxSingleQuote: <bool>',
    language: 'tsx',
    options: [
      {
        value: false,
        label: 'false (default)',
        description: 'Use double quotes in JSX',
        codeExample: `<button
  className="btn"
  id="submit"
  onClick={handleClick}
>
  Click Me
</button>`,
      },
      {
        value: true,
        label: 'true',
        description: 'Use single quotes in JSX',
        codeExample: `<button
  className='btn'
  id='submit'
  onClick={handleClick}
>
  Click Me
</button>`,
      },
    ],
  },
  {
    name: 'Trailing Commas',
    key: 'trailingComma',
    description:
      'Print trailing commas wherever possible in multi-line comma-separated syntactic structures.',
    defaultValue: 'all',
    cliOverride: '--trailing-comma <all|es5|none>',
    apiOverride: 'trailingComma: "<all|es5|none>"',
    options: [
      {
        value: 'all',
        label: 'all (default)',
        description:
          'Trailing commas wherever possible (including function parameters)',
        codeExample: `const obj = {
  foo: "bar",
  baz: "qux",
};

function example(
  param1,
  param2,
) {
  return [
    item1,
    item2,
  ];
}`,
      },
      {
        value: 'es5',
        label: 'es5',
        description:
          'Trailing commas where valid in ES5 (objects, arrays, etc.)',
        codeExample: `const obj = {
  foo: "bar",
  baz: "qux",
};

function example(
  param1,
  param2
) {
  return [
    item1,
    item2,
  ];
}`,
      },
      {
        value: 'none',
        label: 'none',
        description: 'No trailing commas',
        codeExample: `const obj = {
  foo: "bar",
  baz: "qux"
};

function example(
  param1,
  param2
) {
  return [
    item1,
    item2
  ];
}`,
      },
    ],
  },
  {
    name: 'Bracket Spacing',
    key: 'bracketSpacing',
    description: 'Print spaces between brackets in object literals.',
    defaultValue: true,
    cliOverride: '--no-bracket-spacing',
    apiOverride: 'bracketSpacing: <bool>',
    options: [
      {
        value: true,
        label: 'true (default)',
        description: 'Spaces inside brackets',
        codeExample: `const obj = { foo: bar };
import { useState } from "react";`,
      },
      {
        value: false,
        label: 'false',
        description: 'No spaces inside brackets',
        codeExample: `const obj = {foo: bar};
import {useState} from "react";`,
      },
    ],
  },
  {
    name: 'Object Wrap',
    key: 'objectWrap',
    description:
      'Configure how Prettier wraps object literals when they could fit on one line or span multiple lines.',
    defaultValue: 'preserve',
    cliOverride: '--object-wrap <preserve|collapse>',
    apiOverride: 'objectWrap: "<preserve|collapse>"',
    options: [
      {
        value: 'preserve',
        label: 'preserve (default)',
        description:
          'Keep as multi-line if there is a newline between opening brace and first property',
        codeExample: `const expanded = {
  foo: "bar",
  baz: "qux",
};

const compact = { foo: "bar", baz: "qux" };`,
      },
      {
        value: 'collapse',
        label: 'collapse',
        description: 'Fit to a single line when possible',
        codeExample: `const obj = { foo: "bar", baz: "qux" };`,
      },
    ],
  },
  {
    name: 'Bracket Line',
    key: 'bracketSameLine',
    description:
      'Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).',
    defaultValue: false,
    cliOverride: '--bracket-same-line',
    apiOverride: 'bracketSameLine: <bool>',
    language: 'tsx',
    options: [
      {
        value: false,
        label: 'false (default)',
        description: 'Bracket on its own line',
        codeExample: `<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}
>
  Click Here
</button>`,
      },
      {
        value: true,
        label: 'true',
        description: 'Bracket at end of last attribute line',
        codeExample: `<button
  className="prettier-class"
  id="prettier-id"
  onClick={this.handleClick}>
  Click Here
</button>`,
      },
    ],
  },
  {
    name: 'Arrow Function Parentheses',
    key: 'arrowParens',
    description: 'Include parentheses around a sole arrow function parameter.',
    defaultValue: 'always',
    cliOverride: '--arrow-parens <always|avoid>',
    apiOverride: 'arrowParens: "<always|avoid>"',
    options: [
      {
        value: 'always',
        label: 'always (default)',
        description: 'Always include parens',
        codeExample: `const add = (x) => x + 1;
const multiply = (x) => (y) => x * y;
const greet = (name) => \`Hello, \${name}!\`;`,
      },
      {
        value: 'avoid',
        label: 'avoid',
        description: 'Omit parens when possible',
        codeExample: `const add = x => x + 1;
const multiply = x => y => x * y;
const greet = name => \`Hello, \${name}!\`;`,
      },
    ],
  },
  {
    name: 'Prose Wrap',
    key: 'proseWrap',
    description:
      'By default, Prettier will not change wrapping in markdown text since some services use a linebreak-sensitive renderer.',
    defaultValue: 'preserve',
    cliOverride: '--prose-wrap <always|never|preserve>',
    apiOverride: 'proseWrap: "<always|never|preserve>"',
    language: 'markdown',
    options: [
      {
        value: 'preserve',
        label: 'preserve (default)',
        description: 'Do nothing, leave prose as-is',
        codeExample: `This is a long line of text that will remain on a single line regardless of the print width setting.

This paragraph
has intentional
line breaks.`,
      },
      {
        value: 'always',
        label: 'always',
        description: 'Wrap prose if it exceeds the print width',
        codeExample: `This is a long line of text that will be
wrapped to fit within the print width.

This paragraph has intentional line breaks
that will be reflowed.`,
      },
      {
        value: 'never',
        label: 'never',
        description: 'Un-wrap each block of prose into one line',
        codeExample: `This is a long line of text that will remain on a single line.

This paragraph has intentional line breaks that will be joined into one line.`,
      },
    ],
  },
  {
    name: 'HTML Whitespace Sensitivity',
    key: 'htmlWhitespaceSensitivity',
    description:
      'Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars.',
    defaultValue: 'css',
    cliOverride: '--html-whitespace-sensitivity <css|strict|ignore>',
    apiOverride: 'htmlWhitespaceSensitivity: "<css|strict|ignore>"',
    language: 'html',
    options: [
      {
        value: 'css',
        label: 'css (default)',
        description: "Respect the default value of CSS display property",
        codeExample: `<span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span>
<div class="voluptatem architecto">
  Architecto rerum architecto.
</div>`,
      },
      {
        value: 'strict',
        label: 'strict',
        description:
          'Whitespace (or the lack of it) around all tags is considered significant',
        codeExample: `<span class="dolorum atque aspernatur"
  >Est molestiae sunt facilis qui rem.</span
>
<div class="voluptatem architecto">
  Architecto rerum architecto.
</div>`,
      },
      {
        value: 'ignore',
        label: 'ignore',
        description:
          'Whitespace (or the lack of it) around all tags is considered insignificant',
        codeExample: `<span class="dolorum atque aspernatur">
  Est molestiae sunt facilis qui rem.
</span>
<div class="voluptatem architecto">
  Architecto rerum architecto.
</div>`,
      },
    ],
  },
  {
    name: 'Single Attribute Per Line',
    key: 'singleAttributePerLine',
    description: 'Enforce single attribute per line in HTML, Vue, and JSX.',
    defaultValue: false,
    cliOverride: '--single-attribute-per-line',
    apiOverride: 'singleAttributePerLine: <bool>',
    language: 'tsx',
    options: [
      {
        value: false,
        label: 'false (default)',
        description: 'Do not enforce single attribute per line',
        codeExample: `<button className="btn" id="submit" type="button">
  Submit
</button>`,
      },
      {
        value: true,
        label: 'true',
        description: 'Enforce single attribute per line',
        codeExample: `<button
  className="btn"
  id="submit"
  type="button"
>
  Submit
</button>`,
      },
    ],
  },
  {
    name: 'End of Line',
    key: 'endOfLine',
    description:
      'Specify the line ending style. LF is common on Linux and macOS, CRLF is common on Windows.',
    defaultValue: 'lf',
    cliOverride: '--end-of-line <lf|crlf|cr|auto>',
    apiOverride: 'endOfLine: "<lf|crlf|cr|auto>"',
    options: [
      {
        value: 'lf',
        label: 'lf (default)',
        description: 'Line Feed only (\\n), common on Linux/macOS and in git repos',
        codeExample: `const a = 1;
const b = 2;
// Lines end with \\n`,
      },
      {
        value: 'crlf',
        label: 'crlf',
        description: 'Carriage Return + Line Feed (\\r\\n), common on Windows',
        codeExample: `const a = 1;
const b = 2;
// Lines end with \\r\\n`,
      },
      {
        value: 'cr',
        label: 'cr',
        description: 'Carriage Return only (\\r), used very rarely',
        codeExample: `const a = 1;
const b = 2;
// Lines end with \\r`,
      },
      {
        value: 'auto',
        label: 'auto',
        description:
          'Maintain existing line endings (mixed values are normalized)',
        codeExample: `const a = 1;
const b = 2;
// Preserves existing line endings`,
      },
    ],
  },
  {
    name: 'Embedded Language Formatting',
    key: 'embeddedLanguageFormatting',
    description:
      'Control whether Prettier formats quoted code embedded in the file.',
    defaultValue: 'auto',
    cliOverride: '--embedded-language-formatting=<off|auto>',
    apiOverride: 'embeddedLanguageFormatting: "<off|auto>"',
    options: [
      {
        value: 'auto',
        label: 'auto (default)',
        description:
          'Format embedded code if Prettier can automatically identify it',
        codeExample: `const html = /* html */ \`
  <div class="container">
    <p>Formatted HTML</p>
  </div>
\`;`,
      },
      {
        value: 'off',
        label: 'off',
        description: 'Never automatically format embedded code',
        codeExample: `const html = /* html */ \`
<div class="container"><p>Unformatted HTML</p></div>
\`;`,
      },
    ],
  },
  {
    name: 'Experimental Ternaries',
    key: 'experimentalTernaries',
    description:
      "Try prettier's new ternary formatting before it becomes the default behavior.",
    defaultValue: false,
    cliOverride: '--experimental-ternaries',
    apiOverride: 'experimentalTernaries: <bool>',
    options: [
      {
        value: false,
        label: 'false (default)',
        description:
          'Keep question marks on the same line as the consequent',
        codeExample: `const result = condition1
  ? value1
  : condition2
  ? value2
  : value3;`,
      },
      {
        value: true,
        label: 'true',
        description:
          'Use curious ternaries, with the question mark after the condition',
        codeExample: `const result = condition1 ?
  value1
: condition2 ?
  value2
: value3;`,
      },
    ],
  },
]
