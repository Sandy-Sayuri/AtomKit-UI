import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Section } from "./Section";

const meta = {
  title: "Layout/Primitives",
  component: Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderFooterSection: Story = {
  render: () => (
    <div>
      <Header actions={<Button size="sm">Entrar</Button>} logo="AK" title="AtomKit UI" />
      <Container>
        <Section description="Container e Section respeitam tokens de tema." title="Conteudo">
          <p>Area de conteudo reutilizavel.</p>
        </Section>
      </Container>
      <Footer content="AtomKit UI" links={[{ href: "/", label: "Inicio" }]} />
    </div>
  ),
};
