import type { Meta, StoryObj } from "@storybook/react";
import { salesData } from "../../mocks/charts";
import { AtomKitProvider } from "../../theme";
import { LineChart } from "./LineChart";

const meta = {
  title: "Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  args: {
    animated: true,
    data: salesData,
    height: 260,
    lineWidth: 3,
    showGrid: true,
    showTooltip: true,
    showXAxis: true,
    showYAxis: false,
    width: 640,
    xKey: "month",
    yKey: "value",
  },
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: {
      grid: "#e5e7eb",
      line: "#7c3aed",
      text: "#374151",
    },
    lineWidth: 4,
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="dark">
      <LineChart {...args} />
    </AtomKitProvider>
  ),
};

export const WithTooltip: Story = {
  args: {
    showTooltip: true,
  },
};

export const WithLegend: Story = {
  args: {
    showLegend: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const Compact: Story = {
  args: {
    height: 140,
    lineWidth: 2,
    showGrid: false,
    showYAxis: false,
  },
};
