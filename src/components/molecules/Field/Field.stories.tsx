import type { Meta, StoryObj } from "@storybook/react";
import { FiMail } from "react-icons/fi";
import { FormField } from "./Field";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    helperText: "Use um email valido para receber notificacoes.",
    label: "Email",
    placeholder: "nome@email.com",
    required: true,
    type: "email",
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    defaultValue: "email",
    error: "Informe um email valido.",
  },
};

export const LabelIcon: Story = {
  args: {
    helperText: "Label com icone externo via ReactNode.",
    label: "E-mail",
    labelIcon: <FiMail />,
    labelIconPosition: "left",
    placeholder: "nome@email.com",
  },
};

export const LabelIconRight: Story = {
  args: {
    label: "E-mail",
    labelGap: 10,
    labelIcon: <FiMail />,
    labelIconPosition: "right",
    placeholder: "nome@email.com",
  },
};
