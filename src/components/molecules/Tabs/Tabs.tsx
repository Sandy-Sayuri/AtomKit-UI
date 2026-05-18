import { useState, type ReactNode } from "react";

export interface TabItem {
  content: ReactNode;
  icon?: ReactNode;
  id: string;
  label: ReactNode;
}

export interface TabsProps {
  defaultValue?: string;
  items: TabItem[];
}

export function Tabs({ defaultValue, items }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultValue ?? items[0]?.id);
  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className="ak-tabs">
      <div className="ak-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            aria-selected={item.id === activeId}
            className="ak-tabs__tab"
            key={item.id}
            onClick={() => setActiveId(item.id)}
            role="tab"
            type="button"
          >
            {item.icon ? <span className="ak-icon">{item.icon}</span> : null}
            {item.label}
          </button>
        ))}
      </div>
      <div className="ak-tabs__panel" role="tabpanel">
        {activeItem?.content}
      </div>
    </div>
  );
}
