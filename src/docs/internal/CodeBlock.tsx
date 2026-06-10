import { useState, type ReactNode } from "react";
import { Button } from "../../components/atoms/Button";
import { Card } from "../../components/organisms/Card";

export interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ children, language = "tsx", title = "Exemplo" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = String(children).trim();

  async function copyCode() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Card
      actions={
        <Button onClick={copyCode} size="sm" variant="outline">
          {copied ? "Copiado" : "Copiar"}
        </Button>
      }
      className="ak-docs-code-card"
      title={title}
      variant="outlined"
    >
      <pre className="ak-docs-code" data-language={language}>
        <code>{code as ReactNode}</code>
      </pre>
    </Card>
  );
}
