import type { Meta, StoryObj } from "@storybook/react";
import { FiBox } from "react-icons/fi";
import { Select } from "./Select";

const companyOptions = [
  { label: "Martins Foods", value: "martins-foods" },
  { label: "Costa Retail", value: "costa-retail" },
  { label: "Lima Market", value: "lima-market" },
  { label: "Rocha Labs", value: "rocha-labs" },
];

const meta = {
  component: Select,
  title: "Atoms/Select",
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    options: companyOptions,
    placeholder: "Selecione uma empresa",
  },
};

export const WithIcon: Story = {
  args: {
    iconLeft: <FiBox />,
    options: companyOptions,
    placeholder: "Selecione uma empresa",
  },
};

export const Invalid: Story = {
  args: {
    helperText: "Escolha uma empresa para continuar.",
    invalid: true,
    options: companyOptions,
    placeholder: "Selecione uma empresa",
  },
};
