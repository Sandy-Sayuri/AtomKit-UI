import type { Meta, StoryObj } from "@storybook/react";
import { componentUsageData } from "../../mocks/charts";
import { AtomKitProvider } from "../../theme";
import { BarChart } from "./BarChart";

const meta = {
  title: "Charts/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  args: {
    animated: true,
    data: componentUsageData,
    height: 260,
    radius: 6,
    showGrid: true,
    showTooltip: true,
    showXAxis: true,
    width: 640,
    xKey: "name",
    yKey: "value",
  },
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: {
      bar: "#0f766e",
      grid: "#d1d5db",
      text: "#374151",
    },
    radius: 10,
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="dark">
      <BarChart {...args} />
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
    height: 150,
    radius: 3,
    showGrid: false,
  },
};
