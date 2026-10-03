import { signal } from '@angular/core';
import { Avatar, Button, Header, Sidebar } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type HeaderStoryArgs = Header & { title: string };

const meta: Meta<HeaderStoryArgs> = {
  title: 'Navigation/Header',
  component: Header,
  decorators: [moduleMetadata({ imports: [Avatar, Button, Sidebar] })],
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'LumenUI',
    menuToggle: fn(),
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Projected content (`<ng-content>`), not an input.',
    },
    menuToggle: {
      action: 'menuToggle',
      description: "Fired by the hamburger button; wire it to the sidebar's `toggle()`.",
      table: { category: 'outputs' },
    },
  },
  render: ({ title, ...args }) => ({
    props: { ...args, title },
    template: `
      <l-header ${argsToTemplate(args)}>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary)">
          {{ title }}
        </span>
      </l-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<HeaderStoryArgs>;

/** The hamburger emits `menuToggle` (see Actions); everything else is projected content. */
export const Playground: Story = {};

/** Projected content is laid out in a flex row — push actions right with `margin-left: auto`. */
export const WithActions: Story = {
  render: () => ({
    template: `
      <l-header>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary)">Projects</span>
        <span style="font-size: 13px; color: var(--text-secondary)">/ Website redesign</span>
        <div style="margin-left: auto; display: flex; align-items: center; gap: 12px">
          <l-button variant="ghost" size="sm">🔔</l-button>
          <l-button size="sm">New task</l-button>
          <l-avatar name="Ada Lovelace" size="28px" />
        </div>
      </l-header>
    `,
  }),
};

/** Wired to a sidebar: `(menuToggle)="sidebar.toggle()"` collapses the rail. */
export const WithSidebar: Story = {
  render: () => ({
    props: { collapsed: signal(false) },
    template: `
      <div style="display: flex; height: 320px; overflow: hidden; transform: translateZ(0)">
        <l-sidebar #sidebar [(collapsed)]="collapsed">
          <div
            style="display: flex; align-items: center; justify-content: center; height: 48px;
              margin: 12px; border-radius: 8px; background: var(--accent);
              color: var(--text-white); font-weight: 700; font-size: 18px"
          >
            L
          </div>
        </l-sidebar>
        <div style="display: flex; flex-direction: column; flex: 1; min-width: 0">
          <l-header (menuToggle)="sidebar.toggle()">
            <span style="font-size: 14px; font-weight: 600; color: var(--text-primary)">
              LumenUI
            </span>
          </l-header>
          <main
            style="flex: 1; padding: 24px; font-size: 14px; color: var(--text-secondary);
              background: var(--bg-light)"
          >
            Rail collapsed: {{ collapsed() }}
          </main>
        </div>
      </div>
    `,
  }),
};
