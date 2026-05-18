import type { Meta, StoryObj } from "@storybook/react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    size: "md",
    variant: "default",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "inline-radio",
      options: ["default", "success", "warning", "danger", "info"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <FiCheckCircle />,
    children: "Ativo",
    variant: "success",
  },
};

export const EmojiIcon: Story = {
  args: {
    icon: <FiInfo />,
    children: "Informacao",
    variant: "info",
  },
};
