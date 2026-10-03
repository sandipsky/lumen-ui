import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUIMenu } from '@lumen-ui/react';

const meta = {
  title: 'Actions/Menu',
  component: LUIMenu,
  args: {
    mode: 'left',
    closeOnItemClick: true,
    contentMode: false,
    showActiveState: true,
    dropdownDisplay: <LUIButton variant="outlined">Actions</LUIButton>,
    children: (
      <>
        <div className="dropdown-item">Edit</div>
        <div className="dropdown-item">Duplicate</div>
        <div className="dropdown-item">Archive</div>
      </>
    ),
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['left', 'right'],
      table: { defaultValue: { summary: "'left'" } },
    },
    closeOnItemClick: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    contentMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showActiveState: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    dropdownDisplay: { control: false },
    children: { control: false },
    ref: { control: false },
  },
  // Centered so a right-aligned panel has room to open.
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LUIMenu {...args} />
    </div>
  ),
} satisfies Meta<typeof LUIMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every prop is wired to a control — use this one to play. Pass the trigger via
 * `dropdownDisplay` and give clickable rows the `dropdown-item` class.
 */
export const Playground: Story = {};

export const RightAligned: Story = {
  args: { mode: 'right' },
};

/** Add the `active` class to an item to mark the current choice. */
export const ActiveItem: Story = {
  args: {
    dropdownDisplay: <LUIButton variant="outlined">Sort by</LUIButton>,
    children: (
      <>
        <div className="dropdown-item active">Newest</div>
        <div className="dropdown-item">Oldest</div>
        <div className="dropdown-item">A–Z</div>
      </>
    ),
  },
};

/**
 * Arbitrary markup as children; `closeOnItemClick={false}` keeps it open on inner clicks and
 * `contentMode` drops the default padding.
 */
export const CustomContent: Story = {
  args: {
    closeOnItemClick: false,
    contentMode: true,
    dropdownDisplay: <LUIButton variant="outlined">Account</LUIButton>,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 240, padding: 16 }}>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>Ada Lovelace</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>ada@lumen.ui</p>
        <hr style={{ margin: '8px 0', border: 0, borderTop: '1px solid var(--separator)' }} />
        <LUIButton variant="primary" width="full">
          Manage account
        </LUIButton>
      </div>
    ),
  },
};
