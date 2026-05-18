import type { Meta, StoryObj } from "@storybook/react";
import { FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { Alert } from "./Alert";

const meta = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    children: "Componentes aceitam icones externos via ReactNode.",
    icon: <FiInfo />,
    title: "Informacao",
    variant: "info",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    icon: <FiAlertTriangle />,
    title: "Atencao necessaria",
    variant: "warning",
  },
};

export const Success: Story = {
  args: {
    icon: <FiCheckCircle />,
    title: "Tudo certo",
    variant: "success",
  },
};

export const IconTop: Story = {
  args: {
    icon: <FiAlertTriangle />,
    iconPosition: "top",
    title: "Fluxo bloqueado",
    variant: "warning",
  },
};
