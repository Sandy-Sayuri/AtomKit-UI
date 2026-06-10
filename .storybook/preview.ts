import type { Preview } from "@storybook/react";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          "Showcase",
          ["Documentation App", "System Preview"],
          "Docs",
          ["Introduction", "Getting Started"],
          "Themes",
          ["Overview", "Playground", "AtomKitProvider"],
          "Layout",
          ["AppShell", "Primitives"],
          "Navigation",
          ["NavigationTree", "Menu", "DropdownMenu", "Breadcrumb"],
          "Conditional Rendering",
          "Components",
          [
            "Button",
            "IconButton",
            "Input",
            "FormField",
            "Alert",
            "Tooltip",
            "Accordion",
            "Tabs",
            "Card",
            "Badge",
            "DataTable",
            "EmptyState",
            "StatsCard",
          ],
          "Charts",
          ["Architecture", "LineChart", "BarChart", "AreaChart", "PieChart", "DonutChart", "Sparkline"],
          "Atoms",
          "Molecules",
          "Organisms",
        ],
      },
    },
  },
};

export default preview;
