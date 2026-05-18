import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { RenderByRole } from "./RenderByRole";
import { RenderIf } from "./RenderIf";

const meta = {
  title: "Conditional Rendering/Role Helpers",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RenderIfExample: Story = {
  render: () => (
    <RenderIf condition fallback={<span>Fallback</span>}>
      <Button>Renderizado</Button>
    </RenderIf>
  ),
};

export const RenderByRoleExample: Story = {
  render: () => (
    <RenderByRole allowedRoles={["admin"]} currentRole="admin" fallback={<span>Sem acesso visual</span>}>
      <Button>Editar configuracoes</Button>
    </RenderByRole>
  ),
};
