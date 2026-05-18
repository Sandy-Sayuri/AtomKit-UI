import type { Meta, StoryObj } from "@storybook/react";
import { FiEdit, FiTag, FiUser, FiUserCheck } from "react-icons/fi";
import { Badge } from "../../atoms/Badge";
import { DataTable, type DataTableColumn } from "./DataTable";

interface UserRow extends Record<string, unknown> {
  id: string;
  name: string;
  role: string;
  status: "Ativo" | "Pendente" | "Bloqueado";
}

const data: UserRow[] = [
  { id: "1", name: "Ana Souza", role: "Design System", status: "Ativo" },
  { id: "2", name: "Bruno Lima", role: "Frontend", status: "Pendente" },
  { id: "3", name: "Carla Dias", role: "Produto", status: "Bloqueado" },
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
