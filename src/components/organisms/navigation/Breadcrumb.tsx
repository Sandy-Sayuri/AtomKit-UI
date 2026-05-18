import type { ReactNode } from "react";

export interface BreadcrumbItem {
  href?: string;
  label: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export function Breadcrumb({ items, separator = "/" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="ak-breadcrumb">
      <ol className="ak-breadcrumb__list">
        {items.map((item, index) => (
          <li className="ak-breadcrumb__item" key={index}>
            {item.href && index < items.length - 1 ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            {index < items.length - 1 ? <span className="ak-breadcrumb__separator">{separator}</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
