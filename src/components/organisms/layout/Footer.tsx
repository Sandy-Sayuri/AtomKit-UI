import type { HTMLAttributes, ReactNode } from "react";

export interface FooterLink {
  href: string;
  label: ReactNode;
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  actions?: ReactNode;
  content?: ReactNode;
  links?: FooterLink[];
  variant?: "default" | "muted";
}

export function Footer({ actions, className = "", content, links = [], variant = "default", ...props }: FooterProps) {
  return (
    <footer className={["ak-footer", `ak-footer--${variant}`, className].filter(Boolean).join(" ")} {...props}>
      <div className="ak-footer__content">{content}</div>
      {links.length > 0 ? (
        <nav className="ak-footer__links">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
      {actions ? <div className="ak-footer__actions">{actions}</div> : null}
    </footer>
  );
}
