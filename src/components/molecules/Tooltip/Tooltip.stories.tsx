import type { Meta, StoryObj } from "@storybook/react";
import { FiHelpCircle } from "react-icons/fi";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    children: "Passe o mouse",
    content: "Tooltip com icone externo opcional.",
    icon: <FiHelpCircle />,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
