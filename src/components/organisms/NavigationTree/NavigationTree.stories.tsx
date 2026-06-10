import type { Meta, StoryObj } from "@storybook/react";
import {
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiExternalLink,
  FiGrid,
  FiHome,
  FiLayers,
  FiLock,
  FiPlay,
  FiSettings,
  FiSliders,
  FiUsers,
} from "react-icons/fi";
import { AtomKitProvider } from "../../../theme";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { NavigationTree, type NavigationTreeGroup } from "./NavigationTree";

const documentationGroups: NavigationTreeGroup[] = [
  {
    defaultOpen: true,
    emoji: "📘",
    id: "docs",
    label: "Docs",
    items: [
      { emoji: "📄", href: "/docs/introduction", id: "introduction", label: "Introduction" },
      { href: "/docs/getting-started", icon: <FiPlay />, id: "getting-started", label: "Getting Started" },
      { href: "/docs/themes", icon: <FiSliders />, id: "theme-system", label: "Theme System" },
    ],
  },
  {
    defaultOpen: true,
    emoji: "🧩",
    id: "components",
    label: "Components",
    items: [
      { href: "/components/button", icon: <FiBox />, id: "button", label: "Button" },
      {
        badge: <Badge size="sm" variant="success">stable</Badge>,
        children: [
          { emoji: "✨", id: "basic-example", label: "Basic Example" },
          { id: "validation", label: "Validation States" },
        ],
        emoji: "📝",
        href: "/components/form-field",
        id: "form-field",
        label: "FormField",
      },
      { disabled: true, id: "calendar", label: "Calendar", badge: <Badge size="sm">planned</Badge> },
    ],
  },
  {
    defaultOpen: true,
    icon: <FiBarChart2 />,
    id: "charts",
    label: "Charts",
    items: [
      { id: "line-chart", label: "LineChart" },
      { id: "donut-chart", label: "DonutChart" },
      { external: true, href: "https://storybook.js.org", icon: <FiExternalLink />, id: "storybook", label: "Storybook" },
    ],
  },
];

const dashboardGroups: NavigationTreeGroup[] = [
  {
    defaultOpen: true,
    id: "main",
    label: "Main",
    items: [
      { icon: <FiHome />, id: "overview", label: "Overview" },
      { icon: <FiBarChart2 />, id: "analytics", label: "Analytics", badge: <Badge size="sm">12</Badge> },
      {
        children: [
          { icon: <FiUsers />, id: "members", label: "Members" },
          { icon: <FiLock />, id: "permissions", label: "Permissions" },
        ],
        icon: <FiSettings />,
        id: "admin",
        label: "Admin",
      },
    ],
  },
];

const customHierarchyGroups: NavigationTreeGroup[] = [
  {
    defaultOpen: true,
    id: "level-1",
    label: "Level 1",
    items: [
      {
        id: "level-2",
        label: "Level 2",
        children: [
          {
            id: "level-3",
            label: "Level 3",
            children: [
              {
                id: "level-4",
                label: "Level 4",
                children: [{ id: "level-5", label: "Level 5" }],
              },
            ],
          },
        ],
      },
    ],
  },
];

const meta = {
  title: "Navigation/NavigationTree",
  component: NavigationTree,
  tags: ["autodocs"],
  args: {
    activeId: "form-field",
    groups: documentationGroups,
    logo: <Badge>AK</Badge>,
    searchable: true,
    searchPlaceholder: "Buscar componentes...",
    showBadges: true,
    showEmojis: true,
    showIcons: true,
    title: "AtomKit UI",
  },
} satisfies Meta<typeof NavigationTree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSearch: Story = {
  args: { searchable: true },
};

export const WithIcons: Story = {
  args: { showEmojis: false, showIcons: true },
};

export const WithEmojis: Story = {
  args: { showEmojis: true, showIcons: false },
};

export const IconsAndEmojis: Story = {
  args: { showEmojis: true, showIcons: true },
};

export const WithBadges: Story = {
  args: { showBadges: true },
};

export const Compact: Story = {
  args: { compact: true },
};

export const Collapsible: Story = {
  args: { collapsed: true, collapsible: true },
};

export const DarkTheme: Story = {
  render: (args) => (
    <AtomKitProvider theme="dark">
      <NavigationTree {...args} />
    </AtomKitProvider>
  ),
};

export const CustomColors: Story = {
  args: {
    themeOverrides: {
      activeBackground: "#7c3aed",
      activeTextColor: "#ffffff",
      background: "#111827",
      border: "#273244",
      groupLabelColor: "#94a3b8",
      hoverBackground: "#1f2937",
      iconColor: "#c4b5fd",
      radius: "10px",
      textColor: "#e5e7eb",
    },
  },
};

export const CustomHierarchy: Story = {
  args: {
    activeId: "level-5",
    groups: customHierarchyGroups,
    indentSize: 22,
    maxDepth: 10,
  },
};

export const CustomItemColors: Story = {
  args: {
    groups: [
      {
        defaultOpen: true,
        id: "custom",
        label: "Custom Colors",
        color: "#7c3aed",
        items: [
          { activeColor: "#0f766e", color: "#0f766e", id: "green", label: "Green Item" },
          { activeColor: "#dc2626", color: "#dc2626", id: "red", label: "Red Item" },
        ],
      },
    ],
    activeId: "green",
  },
};

export const NestedItems: Story = {
  args: { groups: customHierarchyGroups },
};

export const DisabledItems: Story = {
  args: {
    groups: [
      {
        defaultOpen: true,
        id: "disabled",
        label: "Disabled",
        items: [
          { id: "enabled", label: "Enabled" },
          { disabled: true, id: "disabled-item", label: "Disabled Item" },
        ],
      },
    ],
  },
};

export const ExternalLinks: Story = {
  args: {
    groups: [
      {
        defaultOpen: true,
        id: "links",
        label: "External",
        items: [{ external: true, href: "https://storybook.js.org", icon: <FiExternalLink />, id: "external", label: "Storybook" }],
      },
    ],
  },
};

export const WithCustomFooter: Story = {
  args: {
    footer: <Button fullWidth size="sm" variant="outline">Open docs</Button>,
  },
};

export const DocumentationSidebarExample: Story = {
  args: {
    activeId: "theme-system",
    footer: <Badge variant="info">docs</Badge>,
    groups: documentationGroups,
    logo: <FiBookOpen />,
    title: "Docs",
  },
};

export const DashboardSidebarExample: Story = {
  args: {
    activeId: "analytics",
    groups: dashboardGroups,
    logo: <FiGrid />,
    title: "Dashboard",
  },
};

export const FullyCustomized: Story = {
  args: {
    activeId: "tokens",
    compact: true,
    footer: <Badge variant="success">online</Badge>,
    groups: [
      {
        color: "#22c55e",
        defaultOpen: true,
        emoji: "⚡",
        id: "system",
        label: "System",
        items: [
          { color: "#38bdf8", emoji: "🎨", id: "tokens", label: "Tokens", badge: <Badge size="sm">new</Badge> },
          { icon: <FiLayers />, id: "layers", label: "Layers" },
        ],
      },
    ],
    header: (
      <div className="ak-navigation-tree__header">
        <strong>Custom Header</strong>
      </div>
    ),
    searchable: true,
    themeOverrides: {
      activeBackground: "#22c55e",
      activeTextColor: "#03110a",
      background: "#050807",
      border: "#1f3d2d",
      groupLabelColor: "#86efac",
      hoverBackground: "#111c17",
      radius: "0px",
      textColor: "#d1fae5",
    },
    width: 320,
  },
};
