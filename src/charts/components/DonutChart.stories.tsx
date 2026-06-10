import type { Meta, StoryObj } from "@storybook/react";
import { themeShareData } from "../../mocks/charts";
import { AtomKitProvider } from "../../theme";
import { DonutChart } from "./DonutChart";

const meta = {
  title: "Charts/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  args: {
    animated: true,
    data: themeShareData,
    height: 280,
    innerRadiusRatio: 0.58,
    labelKey: "theme",
    showTooltip: true,
    valueKey: "value",
    width: 360,
  },
} satisfies Meta<typeof DonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: {
      donut: ["#7c3aed", "#0f766e", "#d97706", "#dc2626"],
    },
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="dark">
      <DonutChart {...args} />
    </AtomKitProvider>
  ),
};

export const WithTooltip: Story = {
  args: { showTooltip: true },
};

export const CustomTooltip: Story = {
  args: {
    renderTooltip: (payload) => (
      <div>
        <strong>{payload.label}</strong>
        <div>{payload.value}%</div>
      </div>
    ),
    tooltipStyle: {
      background: "#111827",
      border: "1px solid rgba(255,255,255,0.16)",
      borderRadius: 999,
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.26)",
      color: "#ffffff",
    },
  },
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
    height: 180,
    innerRadiusRatio: 0.68,
    width: 240,
  },
};
