import type { Meta, StoryObj } from "@storybook/react";
import { FiDownload, FiEdit, FiMail, FiTag, FiTrash2, FiUser, FiUserCheck } from "react-icons/fi";
import { AtomKitProvider } from "../../../theme";
import { Badge } from "../../atoms/Badge";
import { DataTable, type DataTableColumn } from "./DataTable";

interface UserRow extends Record<string, unknown> {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: string;
  salary: number;
  status: "Ativo" | "Pendente" | "Bloqueado";
}

const data: UserRow[] = [
  { createdAt: "2026-05-10", email: "ana@atomkit.local", id: "1", name: "Ana Souza", role: "Design System", salary: 9200, status: "Ativo" },
  { createdAt: "2026-05-14", email: "bruno@atomkit.local", id: "2", name: "Bruno Lima", role: "Frontend", salary: 8400, status: "Pendente" },
  { createdAt: "2026-05-18", email: "carla@atomkit.local", id: "3", name: "Carla Dias", role: "Produto", salary: 10100, status: "Bloqueado" },
  { createdAt: "2026-05-21", email: "diego@atomkit.local", id: "4", name: "Diego Alves", role: "Operacoes", salary: 7600, status: "Ativo" },
  { createdAt: "2026-05-22", email: "eva@atomkit.local", id: "5", name: "Eva Rocha", role: "Financeiro", salary: 8800, status: "Ativo" },
  { createdAt: "2026-05-25", email: "felipe@atomkit.local", id: "6", name: "Felipe Moura", role: "Suporte", salary: 6900, status: "Pendente" },
];

const columns: Array<DataTableColumn<UserRow>> = [
  { key: "name", header: "Nome", label: "Nome", labelIcon: <FiUser />, sortable: true },
  { key: "role", header: "Area", label: "Area", labelIcon: <FiTag />, labelIconPosition: "right", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge variant={row.status === "Ativo" ? "success" : row.status === "Pendente" ? "warning" : "danger"}>
        {row.status === "Ativo" ? <FiUserCheck /> : null}
        {row.status}
      </Badge>
    ),
    sortable: true,
  },
];

const meta = {
  title: "Organisms/DataTable",
  component: DataTable<UserRow>,
  tags: ["autodocs"],
  args: {
    bordered: true,
    columns,
    data,
    density: "comfortable",
    selectable: true,
    striped: true,
  },
  argTypes: {
    density: {
      control: "inline-radio",
      options: ["compact", "comfortable"],
    },
  },
} satisfies Meta<typeof DataTable<UserRow>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    rowActions: [
      {
        icon: <FiEdit />,
        label: "Editar",
        onClick: () => undefined,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyState: "Sem dados para exibir.",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithFormatters: Story = {
  args: {
    columns: [
      { key: "name", header: "Nome", sortable: true },
      { key: "salary", header: "Salario", align: "right", formatter: "currency", sortable: true },
      { key: "createdAt", header: "Criado em", formatter: "date", sortable: true },
      {
        key: "status",
        header: "Status",
        render: (row) => <Badge variant={row.status === "Ativo" ? "success" : row.status === "Pendente" ? "warning" : "danger"}>{row.status}</Badge>,
      },
    ],
  },
};

export const WithCustomProviderFormatter: Story = {
  render: (args) => (
    <AtomKitProvider
      formatters={{
        salaryRange: (value) => (Number(value) >= 9000 ? "Faixa senior" : "Faixa plena"),
      }}
    >
      <DataTable
        {...args}
        columns={[
          { key: "name", header: "Nome" },
          { key: "salary", header: "Faixa", formatter: "salaryRange" },
          { key: "email", header: "Contato", renderCell: (value) => <a href={`mailto:${value}`}>{String(value)}</a> },
        ]}
      />
    </AtomKitProvider>
  ),
};

export const Advanced: Story = {
  args: {
    bulkActions: [
      {
        icon: <FiMail />,
        label: "Enviar email",
        onClick: () => undefined,
      },
      {
        icon: <FiTrash2 />,
        label: "Arquivar",
        onClick: () => undefined,
      },
    ],
    columnVisibility: {
      email: false,
    },
    columns: [
      { key: "name", header: "Nome", labelIcon: <FiUser />, sortable: true },
      { key: "role", header: "Area", sortable: true },
      { key: "email", header: "Email" },
      { key: "salary", header: "Salario", align: "right", formatter: "currency", sortable: true },
      {
        key: "status",
        header: "Status",
        render: (row) => <Badge variant={row.status === "Ativo" ? "success" : row.status === "Pendente" ? "warning" : "danger"}>{row.status}</Badge>,
      },
    ],
    expandableRows: true,
    exportCsv: { filename: "usuarios-atomkit.csv", label: "Exportar" },
    getRowId: (row) => row.id,
    pagination: { initialPageSize: 3, pageSizeOptions: [3, 6] },
    renderExpandedRow: (row) => `${row.name} atua em ${row.role} e pode receber acoes administrativas customizadas.`,
    renderToolbar: ({ selectedRows, totalRows }) => `${selectedRows.length} selecionado(s) de ${totalRows} registros`,
    responsiveMode: "stack",
    rowActions: [
      {
        icon: <FiEdit />,
        label: "Editar",
        onClick: () => undefined,
      },
      {
        icon: <FiDownload />,
        label: "Baixar",
        onClick: () => undefined,
      },
    ],
    stickyHeader: true,
  },
};
