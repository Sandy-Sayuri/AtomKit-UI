import type { Meta, StoryObj } from "@storybook/react";
import { AtomKitProvider } from "../../theme";
import { PieChart } from "./PieChart";

const data = [
  { label: "React", value: 42 },
  { label: "Docs", value: 28 },
  { label: "Tokens", value: 18 },
  { label: "Build", value: 12 },
];

const meta = {
  title: "Charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  args: {
    data,
    height: 280,
    legend: true,
    showLabels: false,
  },
} satisfies Meta<typeof PieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};

export const Minimal: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="minimal">
      <PieChart {...args} />
    </AtomKitProvider>
  ),
};
