import { Badge } from "../../components/atoms/Badge";
import { DataTable, type DataTableColumn } from "../../components/organisms/DataTable";

export interface PropRow extends Record<string, unknown> {
  defaultValue?: string;
  description: string;
  name: string;
  required?: boolean;
  type: string;
}

const columns: Array<DataTableColumn<PropRow>> = [
  {
    header: "Prop",
    key: "name",
    render: (row) => (
      <span className="ak-docs-prop-name">
        {row.name}
        {row.required ? <Badge size="sm" variant="danger">required</Badge> : null}
      </span>
    ),
  },
  { header: "Tipo", key: "type", render: (row) => <code>{row.type}</code> },
  { header: "Default", key: "defaultValue", render: (row) => (row.defaultValue ? <code>{row.defaultValue}</code> : "-") },
  { header: "Descricao", key: "description" },
];

export interface PropsTableProps {
  rows: PropRow[];
}

export function PropsTable({ rows }: PropsTableProps) {
  return <DataTable bordered columns={columns} data={rows} density="compact" striped />;
}
