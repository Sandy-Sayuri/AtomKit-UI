import type { Meta, StoryObj } from "@storybook/react";
import { sparklineData } from "../../mocks/charts";
import { AtomKitProvider } from "../../theme";
import { Sparkline } from "./Sparkline";

const meta = {
  title: "Charts/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  args: {
    animated: true,
    area: true,
    data: sparklineData,
    height: 72,
    lineWidth: 2,
    width: 240,
    xKey: "step",
    yKey: "value",
  },
} satisfies Meta<typeof Sparkline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: {
      area: "rgba(15, 118, 110, 0.14)",
      line: "#0f766e",
    },
  },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider style={{ padding: 24 }} theme="dark">
      <Sparkline {...args} />
    </AtomKitProvider>
  ),
};

export const WithTooltip: Story = {
  args: {},
};

export const WithLegend: Story = {
  args: {},
};

export const EmptyState: Story = {
  args: { data: [] },
};

export const LoadingState: Story = {
  args: { loading: true },
};

export const Compact: Story = {
  args: {
    area: false,
    height: 42,
    lineWidth: 1.5,
    width: 160,
  },
};
