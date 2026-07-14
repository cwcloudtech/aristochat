import React from 'react';

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case',
  'default', 'break', 'continue', 'class', 'extends', 'implements', 'interface', 'type', 'enum',
  'import', 'export', 'from', 'as', 'new', 'delete', 'typeof', 'instanceof', 'in', 'of', 'try', 'catch',
  'finally', 'throw', 'async', 'await', 'yield', 'static', 'public', 'private', 'protected', 'readonly',
  'abstract', 'void', 'null', 'undefined', 'true', 'false', 'this', 'super', 'def', 'elif', 'except',
  'pass', 'lambda', 'with', 'global', 'nonlocal', 'self', 'None', 'True', 'False', 'and', 'or', 'not',
  'is', 'fn', 'func', 'package', 'struct', 'impl', 'trait', 'match', 'use', 'mod', 'pub', 'mut', 'echo',
  'then', 'fi', 'done', 'esac', 'local',
]);

const TOKEN_REGEX =
  /(\/\/[^\n]*|#[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\b(0[xX][0-9a-fA-F]+|\d+\.?\d*)\b|\b([A-Za-z_]\w*)\b(?=\s*\()|\b([A-Za-z_]\w*)\b/g;

export function highlightCode(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  Array.from(code.matchAll(TOKEN_REGEX)).forEach((match) => {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(code.slice(lastIndex, index));
    }

    const [full, lineComment, blockComment, string, number, funcCall, word] = match;

    if (lineComment || blockComment) {
      nodes.push(
        <span key={key++} className="tok-comment">
          {full}
        </span>
      );
    } else if (string) {
      nodes.push(
        <span key={key++} className="tok-string">
          {full}
        </span>
      );
    } else if (number) {
      nodes.push(
        <span key={key++} className="tok-number">
          {full}
        </span>
      );
    } else if (funcCall) {
      nodes.push(
        <span key={key++} className="tok-function">
          {full}
        </span>
      );
    } else if (word && KEYWORDS.has(word)) {
      nodes.push(
        <span key={key++} className="tok-keyword">
          {full}
        </span>
      );
    } else {
      nodes.push(full);
    }

    lastIndex = index + full.length;
  });

  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }

  return nodes;
}
