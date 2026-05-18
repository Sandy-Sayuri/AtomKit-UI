import type { Meta, StoryObj } from "@storybook/react";
import { FiBell, FiHome, FiPieChart, FiSettings, FiUser } from "react-icons/fi";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { IconButton } from "../../atoms/IconButton";
import { StatsCard } from "../StatsCard";
import { MenuItemData } from "../navigation";
import { AppShell } from "./AppShell";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Section } from "./Section";
import { Sidebar } from "./Sidebar";

const menuItems: Array<MenuItemData<"admin" | "user">> = [
  { href: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  { href: "/reports", icon: <FiPieChart />, label: "Relatorios" },
  { icon: <FiSettings />, label: "Admin", roles: ["admin"], children: [{ href: "/settings", label: "Configuracoes" }] },
];

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => (
    <AppShell
      fullHeight
      layout="dashboard"
      header={
        <Header
          actions={
            <>
              <IconButton icon={<FiBell />} label="Notificacoes" />
              <Button iconLeft={<FiUser />} variant="outline">Conta</Button>
            </>
          }
          logo={<Badge>AtomKit</Badge>}
          title="Dashboard"
        />
      }
      sidebar={
        <Sidebar
          currentRole="admin"
          footer="v0.1.0"
          items={menuItems}
          profileSlot={<strong>Admin</strong>}
        />
      }
      footer={<Footer content="AtomKit UI" links={[{ href: "/", label: "Docs" }]} variant="muted" />}
    >
      <Container size="full">
        <Section actions={<Button>Novo relatorio</Button>} description="Exemplo usando AppShell, Header, Sidebar e Footer." title="Visao geral">
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <StatsCard icon={<FiPieChart />} label="Componentes" trend="+8" value="32" />
            <StatsCard icon={<FiUser />} label="Usuarios" trend="+12%" value="1.2k" />
          </div>
        </Section>
      </Container>
    </AppShell>
  ),
};
