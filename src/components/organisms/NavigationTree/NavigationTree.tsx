import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

export interface NavigationTreeItem {
  activeColor?: string;
  badge?: ReactNode;
  children?: NavigationTreeItem[];
  color?: string;
  disabled?: boolean;
  emoji?: string;
  external?: boolean;
  href?: string;
  icon?: ReactNode;
  id: string;
  label: string;
  onClick?: () => void;
}

export interface NavigationTreeGroup {
  color?: string;
  defaultOpen?: boolean;
  emoji?: string;
  icon?: ReactNode;
  id: string;
  items: NavigationTreeItem[];
  label: string;
}

export interface NavigationTreeThemeOverrides {
  activeBackground?: string;
  activeTextColor?: string;
  background?: string;
  badgeColor?: string;
  border?: string;
  fontSize?: string;
  groupLabelColor?: string;
  hoverBackground?: string;
  iconColor?: string;
  itemHeight?: string;
  radius?: string;
  spacing?: string;
  textColor?: string;
}

export interface NavigationTreeProps {
  activeId?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  compact?: boolean;
  defaultOpenGroups?: string[];
  emptyState?: ReactNode;
  footer?: ReactNode;
  groups: NavigationTreeGroup[];
  header?: ReactNode;
  indentSize?: number;
  logo?: ReactNode;
  maxDepth?: number;
  maxHeight?: number | string;
  onItemSelect?: (item: NavigationTreeItem) => void;
  renderGroup?: (group: NavigationTreeGroup, open: boolean) => ReactNode;
  renderItem?: (item: NavigationTreeItem, state: { active: boolean; depth: number }) => ReactNode;
  searchPlaceholder?: string;
  searchable?: boolean;
  showBadges?: boolean;
  showEmojis?: boolean;
  showIcons?: boolean;
  themeOverrides?: NavigationTreeThemeOverrides;
  title?: ReactNode;
  width?: number | string;
}

function hasMatchingChild(items: NavigationTreeItem[], query: string): boolean {
  return items.some((item) => item.label.toLowerCase().includes(query) || hasMatchingChild(item.children ?? [], query));
}

function filterItems(items: NavigationTreeItem[], query: string): NavigationTreeItem[] {
  if (!query) {
    return items;
  }

  const filtered = items
    .map<NavigationTreeItem | null>((item) => {
      const children = filterItems(item.children ?? [], query);
      const matches = item.label.toLowerCase().includes(query);
      return matches || children.length > 0 ? { ...item, children } : null;
    })
    .filter((item): item is NavigationTreeItem => Boolean(item));

  return filtered;
}

function getInitialOpenGroups(groups: NavigationTreeGroup[], defaultOpenGroups?: string[]) {
  return new Set(groups.filter((group) => group.defaultOpen || defaultOpenGroups?.includes(group.id)).map((group) => group.id));
}

function toSize(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

export function NavigationTree({
  activeId,
  collapsed = false,
  collapsible = false,
  compact = false,
  defaultOpenGroups,
  emptyState = "Nenhum item encontrado.",
  footer,
  groups,
  header,
  indentSize = 18,
  logo,
  maxDepth,
  maxHeight,
  onItemSelect,
  renderGroup,
  renderItem,
  searchPlaceholder = "Buscar...",
  searchable = false,
  showBadges = true,
  showEmojis = true,
  showIcons = true,
  themeOverrides,
  title,
  width = 280,
}: NavigationTreeProps) {
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => getInitialOpenGroups(groups, defaultOpenGroups));
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(
    () =>
      groups
        .map((group) => {
          const items = filterItems(group.items, normalizedQuery);
          const matchesGroup = group.label.toLowerCase().includes(normalizedQuery);
          return matchesGroup || items.length > 0 ? { ...group, items: matchesGroup && normalizedQuery ? group.items : items } : null;
        })
        .filter((group): group is NavigationTreeGroup => Boolean(group)),
    [groups, normalizedQuery],
  );

  const style = {
    "--ak-nav-tree-active-bg": themeOverrides?.activeBackground,
    "--ak-nav-tree-active-color": themeOverrides?.activeTextColor,
    "--ak-nav-tree-bg": themeOverrides?.background,
    "--ak-nav-tree-badge-color": themeOverrides?.badgeColor,
    "--ak-nav-tree-border": themeOverrides?.border,
    "--ak-nav-tree-font-size": themeOverrides?.fontSize,
    "--ak-nav-tree-group-color": themeOverrides?.groupLabelColor,
    "--ak-nav-tree-hover-bg": themeOverrides?.hoverBackground,
    "--ak-nav-tree-icon-color": themeOverrides?.iconColor,
    "--ak-nav-tree-indent": `${indentSize}px`,
    "--ak-nav-tree-item-height": themeOverrides?.itemHeight,
    "--ak-nav-tree-radius": themeOverrides?.radius,
    "--ak-nav-tree-spacing": themeOverrides?.spacing,
    "--ak-nav-tree-text": themeOverrides?.textColor,
    maxHeight: toSize(maxHeight),
    width: toSize(width),
  } as CSSProperties;

  function toggleGroup(groupId: string) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  function toggleItem(itemId: string) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }

  function renderTreeItem(item: NavigationTreeItem, depth: number): ReactNode {
    if (maxDepth !== undefined && depth > maxDepth) {
      return null;
    }

    const hasChildren = Boolean(item.children?.length);
    const active = item.id === activeId;
    const expanded = normalizedQuery ? hasMatchingChild(item.children ?? [], normalizedQuery) || openItems.has(item.id) : openItems.has(item.id);
    const itemStyle = {
      "--ak-nav-tree-item-color": item.color,
      "--ak-nav-tree-item-active-bg": item.activeColor,
      paddingLeft: `calc(var(--ak-nav-tree-spacing, var(--ak-spacing)) + ${depth * indentSize}px)`,
    } as CSSProperties;

    if (renderItem) {
      return (
        <li className="ak-navigation-tree__node" key={item.id}>
          {renderItem(item, { active, depth })}
          {hasChildren && expanded ? <ul className="ak-navigation-tree__children">{item.children?.map((child) => renderTreeItem(child, depth + 1))}</ul> : null}
        </li>
      );
    }

    const content = (
      <>
        {showIcons && item.icon ? <span className="ak-icon ak-navigation-tree__icon">{item.icon}</span> : null}
        {showEmojis && item.emoji ? <span className="ak-navigation-tree__emoji">{item.emoji}</span> : null}
        <span className="ak-navigation-tree__label">{item.label}</span>
        {showBadges && item.badge ? <span className="ak-navigation-tree__badge">{item.badge}</span> : null}
        {item.external ? <span className="ak-navigation-tree__external">↗</span> : null}
        {hasChildren ? <span className="ak-navigation-tree__chevron">{expanded ? "v" : ">"}</span> : null}
      </>
    );

    const className = [
      "ak-navigation-tree__item",
      active ? "ak-navigation-tree__item--active" : "",
      item.disabled ? "ak-navigation-tree__item--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const sharedProps = {
      className,
      style: itemStyle,
    };

    return (
      <li className="ak-navigation-tree__node" key={item.id}>
        {item.href && !item.disabled ? (
          <a
            {...sharedProps}
            href={item.href}
            onClick={() => {
              item.onClick?.();
              onItemSelect?.(item);
            }}
            rel={item.external ? "noreferrer" : undefined}
            target={item.external ? "_blank" : undefined}
          >
            {content}
          </a>
        ) : (
          <button
            {...sharedProps}
            disabled={item.disabled}
            onClick={() => {
              if (hasChildren) {
                toggleItem(item.id);
              }
              item.onClick?.();
              onItemSelect?.(item);
            }}
            type="button"
          >
            {content}
          </button>
        )}
        {hasChildren && expanded ? <ul className="ak-navigation-tree__children">{item.children?.map((child) => renderTreeItem(child, depth + 1))}</ul> : null}
      </li>
    );
  }

  return (
    <aside
      className={[
        "ak-navigation-tree",
        compact ? "ak-navigation-tree--compact" : "",
        collapsed ? "ak-navigation-tree--collapsed" : "",
        collapsible ? "ak-navigation-tree--collapsible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {header ?? (
        title || logo ? (
          <div className="ak-navigation-tree__header">
            {logo ? <div className="ak-navigation-tree__logo">{logo}</div> : null}
            {title ? <strong className="ak-navigation-tree__title">{title}</strong> : null}
          </div>
        ) : null
      )}
      {searchable && !collapsed ? (
        <input
          className="ak-navigation-tree__search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          value={query}
        />
      ) : null}
      <div className="ak-navigation-tree__scroll">
        {visibleGroups.length === 0 ? <div className="ak-navigation-tree__empty">{emptyState}</div> : null}
        {visibleGroups.map((group) => {
          const open = normalizedQuery ? true : openGroups.has(group.id);
          return (
            <section className="ak-navigation-tree__group" key={group.id}>
              <button
                className="ak-navigation-tree__group-trigger"
                onClick={() => toggleGroup(group.id)}
                style={{ "--ak-nav-tree-group-custom-color": group.color } as CSSProperties}
                type="button"
              >
                {renderGroup ? (
                  renderGroup(group, open)
                ) : (
                  <>
                    {showIcons && group.icon ? <span className="ak-icon ak-navigation-tree__icon">{group.icon}</span> : null}
                    {showEmojis && group.emoji ? <span className="ak-navigation-tree__emoji">{group.emoji}</span> : null}
                    {!collapsed ? <span className="ak-navigation-tree__group-label">{group.label}</span> : null}
                    {!collapsed ? <span className="ak-navigation-tree__chevron">{open ? "v" : ">"}</span> : null}
                  </>
                )}
              </button>
              {open && !collapsed ? <ul className="ak-navigation-tree__items">{group.items.map((item) => renderTreeItem(item, 0))}</ul> : null}
            </section>
          );
        })}
      </div>
      {footer && !collapsed ? <div className="ak-navigation-tree__footer">{footer}</div> : null}
    </aside>
  );
}
