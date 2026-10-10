import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeSwitch from ".";

const meta: Meta<typeof ThemeSwitch> = {
  title: "Miscellaneous/ThemeSwitch",
  component: ThemeSwitch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Switch para alternar entre **tema claro** (ícone de sol) e **tema escuro** (ícone de lua). " +
          "Aplica a classe `dark` no `<html>` e salva a escolha no **localStorage**.",
      },
    },
  },
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
