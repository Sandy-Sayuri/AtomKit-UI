import type { Meta, StoryObj } from "@storybook/react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { IconButton } from "./IconButton";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: <FiSearch />,
    label: "Buscar",
    size: "md",
    variant: "ghost",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "outline", "ghost", "danger", "success"],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Actions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <IconButton icon={<FiSearch />} label="Buscar" />
      <IconButton icon={<FiEdit />} label="Editar" variant="outline" />
      <IconButton icon={<FiTrash2 />} label="Excluir" variant="danger" />
    </div>
  ),
};
