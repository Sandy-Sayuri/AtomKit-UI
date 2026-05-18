import type { Meta, StoryObj } from "@storybook/react";
import { FiTrendingUp } from "react-icons/fi";
import { StatsCard } from "./StatsCard";

const meta = {
  title: "Organisms/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  args: {
    description: "Comparado ao mes anterior",
    icon: <FiTrendingUp />,
    label: "Receita",
    trend: "+12%",
    value: "R$ 42k",
  },
} satisfies Meta<typeof StatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
