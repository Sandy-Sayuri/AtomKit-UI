import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

export type DataTableDensity = "compact" | "comfortable";
export type DataTableSortDirection = "asc" | "desc";

export interface DataTableColumn<TData extends Record<string, unknown>> {
  align?: "left" | "center" | "right";
  header: ReactNode;
  key: keyof TData | string;
  label?: ReactNode;
  labelGap?: number | string;
  labelIcon?: ReactNode;
  labelIconPosition?: "left" | "right";
  render?: (row: TData, rowIndex: number) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: TData) => string | number;
}

export interface DataTableAction<TData extends Record<string, unknown>> {
  icon?: ReactNode;
  label: string;
  onClick: (row: TData, rowIndex: number) => void;
}

export interface DataTableProps<TData extends Record<string, unknown>> {
  bordered?: boolean;
  columns: Array<DataTableColumn<TData>>;
  data: TData[];
  density?: DataTableDensity;
  emptyState?: ReactNode;
  getRowId?: (row: TData, rowIndex: number) => string;
  loading?: boolean;
  loadingState?: ReactNode;
  onSelectionChange?: (rows: TData[]) => void;
  rowActions?: Array<DataTableAction<TData>>;
  selectable?: boolean;
  striped?: boolean;
}

interface SortState {
  direction: DataTableSortDirection;
  key: string;
}

function getCellValue<TData extends Record<string, unknown>>(row: TData, key: keyof TData | string) {
  return row[key as keyof TData];
}

function renderColumnLabel<TData extends Record<string, unknown>>(column: DataTableColumn<TData>) {
  const label = column.label ?? column.header;
  const style =
    column.labelGap !== undefined
      ? ({ "--ak-label-gap": typeof column.labelGap === "number" ? `${column.labelGap}px` : column.labelGap } as CSSProperties)
      : undefined;

  return (
    <span className="ak-label-content" style={style}>
      {column.labelIcon && column.labelIconPosition !== "right" ? <span className="ak-icon">{column.labelIcon}</span> : null}
      <span>{label}</span>
      {column.labelIcon && column.labelIconPosition === "right" ? <span className="ak-icon">{column.labelIcon}</span> : null}
    </span>
  );
}

export function DataTable<TData extends Record<string, unknown>>({
  bordered = false,
  columns,
  data,
  density = "comfortable",
  emptyState = "Nenhum registro encontrado.",
  getRowId,
  loading = false,
  loadingState = "Carregando...",
  onSelectionChange,
  rowActions = [],
  selectable = false,
  striped = false,
}: DataTableProps<TData>) {
  const [sort, setSort] = useState<SortState | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    if (!sort) {
      return data;
    }

    const column = columns.find((item) => String(item.key) === sort.key);
    if (!column) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = column.sortValue ? column.sortValue(a) : getCellValue(a, column.key);
      const bValue = column.sortValue ? column.sortValue(b) : getCellValue(b, column.key);
      const result = String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, data, sort]);

  const rowIds = rows.map((row, rowIndex) => getRowId?.(row, rowIndex) ?? String(rowIndex));
  const allVisibleSelected = rowIds.length > 0 && rowIds.every((id) => selectedIds.has(id));

  function updateSelection(next: Set<string>) {
    setSelectedIds(next);
    onSelectionChange?.(rows.filter((_, rowIndex) => next.has(rowIds[rowIndex])));
  }

  function toggleSort(column: DataTableColumn<TData>) {
    if (!column.sortable) {
      return;
    }

    setSort((current) => {
      const key = String(column.key);
      if (current?.key !== key) {
        return { key, direction: "asc" };
      }

      return { key, direction: current.direction === "asc" ? "desc" : "asc" };
    });
  }

  function toggleAll() {
    updateSelection(allVisibleSelected ? new Set() : new Set(rowIds));
  }

  function toggleRow(rowId: string) {
    const next = new Set(selectedIds);
    if (next.has(rowId)) {
      next.delete(rowId);
    } else {
      next.add(rowId);
    }
    updateSelection(next);
  }

  const classes = [
    "ak-data-table",
    `ak-data-table--${density}`,
    bordered ? "ak-data-table--bordered" : "",
    striped ? "ak-data-table--striped" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <table className="ak-data-table__table">
        <thead>
          <tr>
            {selectable ? (
              <th className="ak-data-table__th ak-data-table__th--select">
                <input
                  aria-label="Selecionar todas as linhas"
                  checked={allVisibleSelected}
                  onChange={toggleAll}
                  type="checkbox"
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const key = String(column.key);
              const direction = sort?.key === key ? sort.direction : undefined;

              return (
                <th className="ak-data-table__th" key={key} style={{ textAlign: column.align }}>
                  {column.sortable ? (
                    <button className="ak-data-table__sort" onClick={() => toggleSort(column)} type="button">
                      {renderColumnLabel(column)}
                      <span aria-hidden="true">{direction === "desc" ? "v" : "^"}</span>
                    </button>
                  ) : (
                    renderColumnLabel(column)
                  )}
                </th>
              );
            })}
            {rowActions.length > 0 ? <th className="ak-data-table__th ak-data-table__th--actions">Acoes</th> : null}
          </tr>
        </thead>
        <tbody>
          {loading || rows.length === 0 ? (
            <tr>
              <td
                className="ak-data-table__td ak-data-table__state"
                colSpan={columns.length + (selectable ? 1 : 0) + (rowActions.length > 0 ? 1 : 0)}
              >
                {loading ? loadingState : emptyState}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => {
              const rowId = rowIds[rowIndex];

              return (
                <tr className="ak-data-table__row" key={rowId}>
                  {selectable ? (
                    <td className="ak-data-table__td ak-data-table__td--select">
                      <input
                        aria-label={`Selecionar linha ${rowIndex + 1}`}
                        checked={selectedIds.has(rowId)}
                        onChange={() => toggleRow(rowId)}
                        type="checkbox"
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <td className="ak-data-table__td" key={String(column.key)} style={{ textAlign: column.align }}>
                      {column.render ? column.render(row, rowIndex) : String(getCellValue(row, column.key) ?? "")}
                    </td>
                  ))}
                  {rowActions.length > 0 ? (
                    <td className="ak-data-table__td ak-data-table__td--actions">
                      <div className="ak-data-table__actions">
                        {rowActions.map((action) => (
                          <button
                            className="ak-button ak-button--ghost ak-button--sm"
                            key={action.label}
                            onClick={() => action.onClick(row, rowIndex)}
                            type="button"
                          >
                            {action.icon ? <span className="ak-icon">{action.icon}</span> : null}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  ) : null}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
