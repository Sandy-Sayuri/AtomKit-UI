import type { Meta, StoryObj } from "@storybook/react";
import { FiInbox, FiPlus } from "react-icons/fi";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    action: {
      children: "Criar item",
      iconLeft: <FiPlus />,
    },
    description: "Use um icone grande para reforcar o estado vazio sem acoplar uma biblioteca especifica.",
    icon: <FiInbox />,
    title: "Nenhum item encontrado",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
