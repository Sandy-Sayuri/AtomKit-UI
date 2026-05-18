import type { Meta, StoryObj } from "@storybook/react";
import { FiMoreHorizontal, FiSettings, FiUser } from "react-icons/fi";
import { Button } from "../../atoms/Button";
import { DropdownMenu } from "./DropdownMenu";

const meta = {
  title: "Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    items: [
      { icon: <FiUser />, label: "Perfil" },
      { icon: <FiSettings />, label: "Configuracoes" },
    ],
    trigger: <Button iconRight={<FiMoreHorizontal />} variant="outline">Abrir menu</Button>,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
