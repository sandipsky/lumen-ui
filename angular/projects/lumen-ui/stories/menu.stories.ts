import { Button, Menu } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<Menu> = {
  title: 'Actions/Menu',
  component: Menu,
  decorators: [moduleMetadata({ imports: [Button] })],
  args: {
    mode: 'left',
    closeOnItemClick: true,
    contentMode: false,
    showActiveState: true,
    appendBody: false,
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Which trigger edge the panel aligns to.',
      table: { defaultValue: { summary: "'left'" } },
    },
    closeOnItemClick: {
      control: 'boolean',
      description: 'Close the panel when a projected item is clicked.',
      table: { defaultValue: { summary: 'true' } },
    },
    contentMode: {
      control: 'boolean',
      description: "Drop the panel's inner padding (for custom, edge-to-edge content).",
      table: { defaultValue: { summary: 'false' } },
    },
    showActiveState: {
      control: 'boolean',
      description: 'Highlight the trigger while the panel is open.',
      table: { defaultValue: { summary: 'true' } },
    },
    appendBody: {
      control: 'boolean',
      description:
        'Render the panel under `<body>` instead of inside the component, so no ancestor can clip it.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  // Centered so a right-aligned panel has room to open.
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center">
        <l-menu ${argsToTemplate(args)}>
          <l-button dropdown-display variant="outlined">Actions</l-button>
          <div dropdown-item>Edit</div>
          <div dropdown-item>Duplicate</div>
          <div dropdown-item>Archive</div>
        </l-menu>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Menu>;

/**
 * Every input is wired to a control — use this one to play. Project the trigger via
 * `[dropdown-display]` and clickable rows via `[dropdown-item]`.
 */
export const Playground: Story = {};

export const RightAligned: Story = {
  args: { mode: 'right' },
};

/** Add the `active` class to an item to mark the current choice. */
export const ActiveItem: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center">
        <l-menu ${argsToTemplate(args)}>
          <l-button dropdown-display variant="outlined">Sort by</l-button>
          <div dropdown-item class="active">Newest</div>
          <div dropdown-item>Oldest</div>
          <div dropdown-item>A–Z</div>
        </l-menu>
      </div>
    `,
  }),
};

/**
 * The dashed box scrolls and has a `transform`, so a panel inside it would be clipped at the
 * box's edge. `appendBody` renders the panel under `<body>`, where nothing can clip it — turn the
 * control off to see the difference.
 */
export const AppendBody: Story = {
  args: { appendBody: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 72px; padding: 16px; overflow: auto; transform: translateZ(0); border: 1px dashed var(--separator-dark); border-radius: 8px">
        <l-menu ${argsToTemplate(args)}>
          <l-button dropdown-display variant="outlined">Actions</l-button>
          <div dropdown-item>Edit</div>
          <div dropdown-item>Duplicate</div>
          <div dropdown-item>Archive</div>
        </l-menu>
      </div>
    `,
  }),
};

/**
 * Arbitrary markup via `[dropdown-content]`; `closeOnItemClick=false` keeps it open on inner
 * clicks and `contentMode` drops the default padding.
 */
export const CustomContent: Story = {
  args: { closeOnItemClick: false, contentMode: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center">
        <l-menu ${argsToTemplate(args)}>
          <l-button dropdown-display variant="outlined">Account</l-button>
          <div dropdown-content style="display: flex; flex-direction: column; gap: 4px; width: 240px; padding: 16px">
            <p style="margin: 0; font-weight: 600; color: var(--text-primary)">Ada Lovelace</p>
            <p style="margin: 0; font-size: 13px; color: var(--text-secondary)">ada&#64;lumen.ui</p>
            <hr style="margin: 8px 0; border: 0; border-top: 1px solid var(--separator)" />
            <l-button variant="primary" width="full">Manage account</l-button>
          </div>
        </l-menu>
      </div>
    `,
  }),
};
