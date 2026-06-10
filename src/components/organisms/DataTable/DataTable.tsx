import { Fragment, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useAtomKit, type AtomKitFormatter } from "../../../theme";

export type DataTableDensity = "compact" | "comfortable";
export type DataTableSortDirection = "asc" | "desc";
export type DataTableResponsiveMode = "scroll" | "stack";

export interface DataTableColumn<TData extends Record<string, unknown>> {
  align?: "left" | "center" | "right";
  exportValue?: (row: TData, rowIndex: number) => string | number;
  formatter?: string | AtomKitFormatter<TData>;
  header: ReactNode;
  hidden?: boolean;
  key: keyof TData | string;
  label?: ReactNode;
  labelGap?: number | string;
  labelIcon?: ReactNode;
  labelIconPosition?: "left" | "right";
  render?: (row: TData, rowIndex: number) => ReactNode;
  renderCell?: (value: unknown, row: TData, rowIndex: number) => ReactNode;
  renderHeader?: (column: DataTableColumn<TData>) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: TData) => string | number;
  width?: number | string;
}

export interface DataTableAction<TData extends Record<string, unknown>> {
  icon?: ReactNode;
  label: string;
  onClick: (row: TData, rowIndex: number) => void;
}

export interface DataTableBulkAction<TData extends Record<string, unknown>> {
  icon?: ReactNode;
  label: string;
  onClick: (rows: TData[]) => void;
}

export interface DataTablePagination {
  initialPage?: number;
  initialPageSize?: number;
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataTableToolbarContext<TData extends Record<string, unknown>> {
  allRows: TData[];
  clearSelection: () => void;
  exportCsv: () => void;
  page: number;
  pageSize: number;
  selectedRows: TData[];
  totalRows: number;
}

export interface DataTableProps<TData extends Record<string, unknown>> {
  bordered?: boolean;
  bulkActions?: Array<DataTableBulkAction<TData>>;
  columnVisibility?: Record<string, boolean>;
  columns: Array<DataTableColumn<TData>>;
  data: TData[];
  density?: DataTableDensity;
  emptyState?: ReactNode;
  expandableRows?: boolean;
  exportCsv?: boolean | { filename?: string; label?: string };
  getRowId?: (row: TData, rowIndex: number) => string;
  loading?: boolean;
  loadingState?: ReactNode;
  onSelectionChange?: (rows: TData[]) => void;
  pagination?: boolean | DataTablePagination;
  renderExpandedRow?: (row: TData, rowIndex: number) => ReactNode;
  renderToolbar?: (context: DataTableToolbarContext<TData>) => ReactNode;
  responsiveMode?: DataTableResponsiveMode;
  rowActions?: Array<DataTableAction<TData>>;
  selectable?: boolean;
  stickyHeader?: boolean;
  striped?: boolean;
  toolbar?: ReactNode;
}

interface SortState {
  direction: DataTableSortDirection;
  key: string;
}

function getCellValue<TData extends Record<string, unknown>>(row: TData, key: keyof TData | string) {
  return row[key as keyof TData];
}

function renderColumnLabel<TData extends Record<string, unknown>>(column: DataTableColumn<TData>) {
  if (column.renderHeader) {
    return column.renderHeader(column);
  }

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

function formatCell<TData extends Record<string, unknown>>(
  formatter: DataTableColumn<TData>["formatter"],
  value: unknown,
  row: TData,
  rowIndex: number,
  formatters: Record<string, AtomKitFormatter>,
) {
  if (!formatter) {
    return String(value ?? "");
  }

  if (typeof formatter === "function") {
    return formatter(value, row, rowIndex);
  }

  return formatters[formatter]?.(value, row, rowIndex) ?? String(value ?? "");
}

function getPaginationConfig(pagination: DataTableProps<Record<string, unknown>>["pagination"]) {
  if (!pagination) {
    return null;
  }

  if (pagination === true) {
    return {
      initialPage: 1,
      initialPageSize: 10,
      pageSizeOptions: [5, 10, 25, 50],
    };
  }

  return {
    initialPage: pagination.initialPage ?? 1,
    initialPageSize: pagination.initialPageSize ?? pagination.pageSize ?? 10,
    onPageChange: pagination.onPageChange,
    onPageSizeChange: pagination.onPageSizeChange,
    page: pagination.page,
    pageSize: pagination.pageSize,
    pageSizeOptions: pagination.pageSizeOptions ?? [5, 10, 25, 50],
  };
}

function downloadCsv(filename: string, content: string) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toCsvValue(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function DataTable<TData extends Record<string, unknown>>({
  bordered = false,
  bulkActions = [],
  columnVisibility,
  columns,
  data,
  density = "comfortable",
  emptyState = "Nenhum registro encontrado.",
  expandableRows = false,
  exportCsv = false,
  getRowId,
  loading = false,
  loadingState = "Carregando...",
  onSelectionChange,
  pagination = false,
  renderExpandedRow,
  renderToolbar,
  responsiveMode = "scroll",
  rowActions = [],
  selectable = false,
  stickyHeader = false,
  striped = false,
  toolbar,
}: DataTableProps<TData>) {
  const { formatters } = useAtomKit();
  const [sort, setSort] = useState<SortState | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const paginationConfig = getPaginationConfig(pagination);
  const [internalPage, setInternalPage] = useState(paginationConfig?.initialPage ?? 1);
  const [internalPageSize, setInternalPageSize] = useState(paginationConfig?.initialPageSize ?? 10);

  const visibleColumns = useMemo(
    () => columns.filter((column) => !column.hidden && columnVisibility?.[String(column.key)] !== false),
    [columnVisibility, columns],
  );

  const sortedRows = useMemo(() => {
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

  const page = paginationConfig?.page ?? internalPage;
  const pageSize = paginationConfig?.pageSize ?? internalPageSize;
  const totalPages = paginationConfig ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1;
  const currentPage = Math.min(page, totalPages);
  const rows = paginationConfig ? sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize) : sortedRows;
  const rowIds = rows.map((row, rowIndex) => getRowId?.(row, rowIndex) ?? String((currentPage - 1) * pageSize + rowIndex));
  const selectedRows = sortedRows.filter((row, rowIndex) => selectedIds.has(getRowId?.(row, rowIndex) ?? String(rowIndex)));
  const allVisibleSelected = rowIds.length > 0 && rowIds.every((id) => selectedIds.has(id));
  const controlColumnCount = (selectable ? 1 : 0) + (expandableRows ? 1 : 0);
  const actionColumnCount = rowActions.length > 0 ? 1 : 0;
  const totalColumnCount = visibleColumns.length + controlColumnCount + actionColumnCount;

  function updateSelection(next: Set<string>) {
    setSelectedIds(next);
    onSelectionChange?.(sortedRows.filter((row, rowIndex) => next.has(getRowId?.(row, rowIndex) ?? String(rowIndex))));
  }

  function clearSelection() {
    updateSelection(new Set());
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
    updateSelection(allVisibleSelected ? new Set() : new Set([...selectedIds, ...rowIds]));
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

  function toggleExpanded(rowId: string) {
    const next = new Set(expandedIds);
    if (next.has(rowId)) {
      next.delete(rowId);
    } else {
      next.add(rowId);
    }
    setExpandedIds(next);
  }

  function setPage(nextPage: number) {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    setInternalPage(safePage);
    paginationConfig?.onPageChange?.(safePage);
  }

  function setPageSize(nextPageSize: number) {
    setInternalPageSize(nextPageSize);
    setInternalPage(1);
    paginationConfig?.onPageSizeChange?.(nextPageSize);
  }

  function handleExportCsv() {
    const filename = typeof exportCsv === "object" ? exportCsv.filename ?? "atomkit-table.csv" : "atomkit-table.csv";
    const header = visibleColumns.map((column) => toCsvValue(column.label ?? column.header));
    const body = sortedRows.map((row, rowIndex) =>
      visibleColumns
        .map((column) => {
          const value = column.exportValue ? column.exportValue(row, rowIndex) : getCellValue(row, column.key);
          return toCsvValue(value);
        })
        .join(","),
    );
    downloadCsv(filename, [header.join(","), ...body].join("\n"));
  }

  const toolbarContext: DataTableToolbarContext<TData> = {
    allRows: sortedRows,
    clearSelection,
    exportCsv: handleExportCsv,
    page: currentPage,
    pageSize,
    selectedRows,
    totalRows: sortedRows.length,
  };

  const hasToolbar = Boolean(toolbar || renderToolbar || exportCsv || bulkActions.length > 0);
  const classes = [
    "ak-data-table",
    `ak-data-table--${density}`,
    `ak-data-table--responsive-${responsiveMode}`,
    bordered ? "ak-data-table--bordered" : "",
    stickyHeader ? "ak-data-table--sticky" : "",
    striped ? "ak-data-table--striped" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {hasToolbar ? (
        <div className="ak-data-table__toolbar">
          <div className="ak-data-table__toolbar-main">{renderToolbar ? renderToolbar(toolbarContext) : toolbar}</div>
          <div className="ak-data-table__toolbar-actions">
            {bulkActions.map((action) => (
              <button
                className="ak-button ak-button--outline ak-button--sm"
                disabled={selectedRows.length === 0}
                key={action.label}
                onClick={() => action.onClick(selectedRows)}
                type="button"
              >
                {action.icon ? <span className="ak-icon">{action.icon}</span> : null}
                {action.label}
              </button>
            ))}
            {exportCsv ? (
              <button className="ak-button ak-button--outline ak-button--sm" onClick={handleExportCsv} type="button">
                {typeof exportCsv === "object" ? exportCsv.label ?? "Exportar CSV" : "Exportar CSV"}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <table className="ak-data-table__table">
        <thead>
          <tr>
            {expandableRows ? <th className="ak-data-table__th ak-data-table__th--expand" aria-label="Expandir linhas" /> : null}
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
            {visibleColumns.map((column) => {
              const key = String(column.key);
              const direction = sort?.key === key ? sort.direction : undefined;
              const width = typeof column.width === "number" ? `${column.width}px` : column.width;

              return (
                <th className="ak-data-table__th" key={key} style={{ textAlign: column.align, width }}>
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
              <td className="ak-data-table__td ak-data-table__state" colSpan={totalColumnCount}>
                {loading ? loadingState : emptyState}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => {
              const rowId = rowIds[rowIndex];
              const expanded = expandedIds.has(rowId);

              return (
                <Fragment key={rowId}>
                  <tr className="ak-data-table__row">
                    {expandableRows ? (
                      <td className="ak-data-table__td ak-data-table__td--expand">
                        <button
                          aria-expanded={expanded}
                          aria-label={expanded ? "Recolher linha" : "Expandir linha"}
                          className="ak-data-table__expand-button"
                          onClick={() => toggleExpanded(rowId)}
                          type="button"
                        >
                          {expanded ? "-" : "+"}
                        </button>
                      </td>
                    ) : null}
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
                    {visibleColumns.map((column) => {
                      const value = getCellValue(row, column.key);
                      const content = column.render
                        ? column.render(row, rowIndex)
                        : column.renderCell
                          ? column.renderCell(value, row, rowIndex)
                          : formatCell(column.formatter, value, row, rowIndex, formatters);

                      return (
                        <td
                          className="ak-data-table__td"
                          data-label={typeof column.header === "string" ? column.header : undefined}
                          key={String(column.key)}
                          style={{ textAlign: column.align }}
                        >
                          {content}
                        </td>
                      );
                    })}
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
                  {expanded ? (
                    <tr className="ak-data-table__expanded-row">
                      <td className="ak-data-table__td ak-data-table__expanded-cell" colSpan={totalColumnCount}>
                        {renderExpandedRow?.(row, rowIndex) ?? null}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })
          )}
        </tbody>
      </table>

      {paginationConfig ? (
        <div className="ak-data-table__pagination">
          <span>
            Pagina {currentPage} de {totalPages}
          </span>
          <label>
            Linhas
            <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
              {paginationConfig.pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className="ak-data-table__pagination-actions">
            <button className="ak-button ak-button--outline ak-button--sm" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)} type="button">
              Anterior
            </button>
            <button
              className="ak-button ak-button--outline ak-button--sm"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              type="button"
            >
              Proxima
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
