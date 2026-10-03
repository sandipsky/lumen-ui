import { Icon, L_ICON_NAMES } from '@lumen-ui/angular';
import { type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<Icon> = {
  title: 'Actions/Icon',
  component: Icon,
  args: {
    name: 'user',
    size: 20,
  },
  argTypes: {
    name: {
      control: 'select',
      options: L_ICON_NAMES,
      description:
        'Icon to draw — an svg file name from the shared `icons/` folder without the extension. Required.',
      table: { type: { summary: 'IconName' } },
    },
    size: {
      control: { type: 'number', min: 8, max: 96, step: 2 },
      description: 'Width/height. A number is pixels; any CSS size string works too.',
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '20' } },
    },
    color: {
      control: 'color',
      description:
        'Icon color — any CSS color, including `var(--…)` tokens. Pass `"inherit"` to follow the surrounding text color.',
      table: { defaultValue: { summary: 'var(--text-tertiary)' } },
    },
  },
};

export default meta;
type Story = StoryObj<Icon>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center">
        <l-icon name="settings" [size]="16" />
        <l-icon name="settings" />
        <l-icon name="settings" [size]="32" />
        <l-icon name="settings" size="3rem" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center">
        <l-icon name="notification" color="var(--accent)" />
        <l-icon name="trash" color="var(--error)" />
        <l-icon name="lock" color="var(--warn)" />
        <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--info)">
          <l-icon name="download" color="inherit" /> inherits
        </span>
      </div>
    `,
  }),
};

/** Every bundled icon — the `name` input is the file name. */
export const AllIcons: Story = {
  render: () => ({
    props: { names: L_ICON_NAMES },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px">
        @for (name of names; track name) {
          <div
            [title]="name"
            style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 6px; border: 1px solid var(--separator-light); border-radius: 6px"
          >
            <l-icon [name]="name" [size]="24" />
            <span style="max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: var(--text-secondary)">
              {{ name }}
            </span>
          </div>
        }
      </div>
    `,
  }),
};
