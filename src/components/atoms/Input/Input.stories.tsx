import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    helperText: "Texto de apoio para orientar o preenchimento.",
    placeholder: "Digite aqui",
    size: "md",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    error: true,
    defaultValue: "Valor invalido",
    helperText: "Revise o valor informado.",
  },
};

export const WithIcons: Story = {
  args: {
    iconLeft: "@",
    iconRight: "ok",
    placeholder: "usuario",
  },
};
