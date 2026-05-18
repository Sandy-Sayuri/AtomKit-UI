import type { Meta, StoryObj } from "@storybook/react";
import { salesData } from "../../mocks/charts";
import { AtomKitProvider } from "../../theme";
import { AreaChart } from "./AreaChart";

const meta = {
  title: "Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  args: {
    animated: true,
    data: salesData,
    fill: true,
    height: 260,
    lineWidth: 3,
    showGrid: true,
    showTooltip: true,
    width: 640,
    xKey: "month",
    yKey: "value",
  },
} satisfies Meta<typeof AreaChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: {
      area: "rgba(124, 58, 237, 0.16)",
      grid: "#e5e7eb",
      line: "#7c3aed",
      text: "#374151",
    },
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="dark">
      <AreaChart {...args} />
    </AtomKitProvider>
  ),
};

export const WithTooltip: Story = {
  args: { showTooltip: true },
};

export const WithLegend: Story = {
  args: { showLegend: true },
};

export const EmptyState: Story = {
  args: { data: [] },
};

export const LoadingState: Story = {
  args: { loading: true },
};

export const Compact: Story = {
  args: {
    height: 140,
    lineWidth: 2,
    showGrid: false,
    showXAxis: false,
  },
};
