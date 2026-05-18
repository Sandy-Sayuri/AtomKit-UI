import type { ReactNode } from "react";

export interface AccordionItem {
  content: ReactNode;
  icon?: ReactNode;
  id: string;
  title: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="ak-accordion">
      {items.map((item) => (
        <details className="ak-accordion__item" key={item.id}>
          <summary className="ak-accordion__summary">
            {item.icon ? <span className="ak-icon">{item.icon}</span> : null}
            <span>{item.title}</span>
          </summary>
          <div className="ak-accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
