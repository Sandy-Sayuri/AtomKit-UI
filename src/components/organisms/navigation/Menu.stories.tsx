import type { Meta, StoryObj } from "@storybook/react";
import { FiHome, FiLock, FiSettings, FiUsers } from "react-icons/fi";
import { Badge } from "../../atoms/Badge";
import { Menu, type MenuItemData } from "./Menu";

const items: Array<MenuItemData<"admin" | "user">> = [
  { href: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  {
    icon: <FiSettings />,
    label: "Administracao",
    roles: ["admin"],
    children: [
      { href: "/users", icon: <FiUsers />, label: "Usuarios" },
      { href: "/permissions", icon: <FiLock />, label: "Permissoes" },
    ],
  },
  { badge: <Badge size="sm">3</Badge>, disabled: true, label: "Notificacoes" },
];

const meta = {
  title: "Navigation/Menu",
  component: Menu<"admin" | "user">,
  tags: ["autodocs"],
  args: {
    activeItem: "/dashboard",
    currentRole: "admin",
    items,
    orientation: "vertical",
  },
} satisfies Meta<typeof Menu<"admin" | "user">>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const ByRole: Story = {
  args: {
    currentRole: "user",
  },
};
