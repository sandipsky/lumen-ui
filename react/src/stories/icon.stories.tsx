import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIIcon, LUI_ICON_NAMES } from '@lumen-ui/react';

const meta = {
  title: 'Actions/Icon',
  component: LUIIcon,
  args: {
    name: 'user',
    size: 20,
  },
  argTypes: {
    name: {
      control: 'select',
      options: LUI_ICON_NAMES,
      table: { type: { summary: 'LUIIconName' } },
    },
    size: {
      control: { type: 'number', min: 8, max: 96, step: 2 },
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '20' } },
    },
    color: {
      control: 'color',
      table: { defaultValue: { summary: 'var(--text-tertiary)' } },
    },
  },
} satisfies Meta<typeof LUIIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <LUIIcon name="settings" size={16} />
      <LUIIcon name="settings" />
      <LUIIcon name="settings" size={32} />
      <LUIIcon name="settings" size="3rem" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <LUIIcon name="notification" color="var(--accent)" />
      <LUIIcon name="trash" color="var(--error)" />
      <LUIIcon name="lock" color="var(--warn)" />
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: 'var(--info)',
        }}
      >
        <LUIIcon name="download" color="inherit" /> inherits
      </span>
    </div>
  ),
};

/** Every bundled icon — the `name` prop is the file name. */
export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: 8,
      }}
    >
      {LUI_ICON_NAMES.map((name) => (
        <div
          key={name}
          title={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '12px 6px',
            border: '1px solid var(--separator-light)',
            borderRadius: 6,
          }}
        >
          <LUIIcon name={name} size={24} />
          <span
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: 11,
              color: 'var(--text-secondary)',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
