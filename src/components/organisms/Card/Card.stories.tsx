import type { Meta, StoryObj } from "@storybook/react";
import { FiBox, FiMoreHorizontal } from "react-icons/fi";
import { Button } from "../../atoms/Button";
import { IconButton } from "../../atoms/IconButton";
import { Field } from "../../molecules/Field";
import { Card } from "./Card";

const meta = {
  title: "Organisms/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Cadastro",
    description: "Exemplo de composicao usando atomos e moleculas.",
    variant: "elevated",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["elevated", "outlined", "ghost"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <Card {...args} footer={<Button>Salvar</Button>}>
      <Field helperText="Campo obrigatorio." label="Nome" placeholder="Digite seu nome" required />
    </Card>
  ),
};

export const CustomPadding: Story = {
  args: {
    children: "Conteudo com padding customizado por prop.",
    padding: "32px",
    variant: "outlined",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Cards aceitam qualquer ReactNode como icone.",
    icon: <FiBox />,
    title: "Com icone",
    description: "Exemplo usando React Icons.",
  },
};

export const WithActions: Story = {
  args: {
    actions: <IconButton icon={<FiMoreHorizontal />} label="Mais opcoes" />,
    children: "Card com icone, titulo, descricao e area de acoes.",
    description: "Actions aceita qualquer ReactNode.",
    icon: <FiBox />,
    title: "Card com actions",
  },
};
