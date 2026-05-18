import type { Meta, StoryObj } from "@storybook/react";
import { FiArrowDown, FiArrowRight, FiPlus, FiSearch, FiUpload } from "react-icons/fi";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    fullWidth: false,
    loading: false,
    size: "md",
    variant: "primary",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "outline", "ghost", "danger", "success", "link"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithIcons: Story = {
  args: {
    iconLeft: <FiPlus />,
    iconRight: <FiArrowRight />,
    children: "Criar item",
  },
};

export const ReactIcons: Story = {
  args: {
    iconLeft: <FiSearch />,
    children: "Buscar",
  },
};

export const IconTop: Story = {
  args: {
    children: "Enviar arquivo",
    iconTop: <FiUpload />,
    variant: "outline",
  },
};

export const IconBottom: Story = {
  args: {
    children: "Mais detalhes",
    iconBottom: <FiArrowDown />,
    variant: "secondary",
  },
};

export const IconOnly: Story = {
  args: {
    children: "Buscar",
    icon: <FiSearch />,
    iconOnly: true,
  },
};

export const CustomGap: Story = {
  args: {
    children: "Continuar",
    gap: 16,
    iconRight: <FiArrowRight />,
  },
};
