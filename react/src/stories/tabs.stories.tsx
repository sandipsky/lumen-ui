import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUITab, LUITabs, type LUITabsProps } from '@lumen-ui/react';

const meta = {
  title: 'Navigation/Tabs',
  component: LUITabs,
  subcomponents: { LUITab },
  args: {
    orientation: 'horizontal',
    variant: 'line',
    size: 'md',
    grow: false,
    value: 'profile',
    onChange: fn(),
    onActiveChange: fn(),
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: "'horizontal'" } },
    },
    variant: {
      control: 'inline-radio',
      options: ['line', 'pills'],
      description:
        '`line` slides an underline (or side bar) under the active tab; `pills` fills it with ' +
        'an accent pill.',
      table: { defaultValue: { summary: "'line'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "'md'" } },
    },
    grow: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    value: {
      control: 'select',
      options: ['profile', 'settings', 'notifications'],
      table: { defaultValue: { summary: 'undefined (first enabled tab)' } },
    },
    className: { control: false },
    children: { control: false },
  },
  // `value` is controlled here, so write the selection back to the args.
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUITabsProps>();
    return (
      <LUITabs
        {...args}
        onChange={(value) => {
          args.onChange?.(value);
          updateArgs({ value });
        }}
      >
        <LUITab label="Profile" icon="👤" value="profile">
          <p>Manage your public profile, avatar, and bio.</p>
        </LUITab>
        <LUITab label="Settings" icon="⚙️" value="settings">
          <p>Configure preferences, language, and theme.</p>
        </LUITab>
        <LUITab label="Notifications" icon="🔔" value="notifications">
          <p>Choose which events send you an email or push alert.</p>
        </LUITab>
        <LUITab label="Archived" value="archived" disabled>
          <p>Archived items.</p>
        </LUITab>
      </LUITabs>
    );
  },
} satisfies Meta<typeof LUITabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** The strip sits on the left with a sliding side bar; Up/Down navigates. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

/** The active tab is filled with a sliding accent pill. */
export const Pills: Story = {
  args: { variant: 'pills' },
};

/** Pills also work vertically. */
export const VerticalPills: Story = {
  args: { orientation: 'vertical', variant: 'pills' },
};

/** `grow` stretches horizontal tabs to equal widths. */
export const Grow: Story = {
  name: 'Full width (grow)',
  args: { grow: true },
};

/** `sm`, `md` (default) and `lg`. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <LUITabs size="sm">
        <LUITab label="One">
          <p>Small tabs.</p>
        </LUITab>
        <LUITab label="Two">
          <p>Second panel.</p>
        </LUITab>
      </LUITabs>
      <LUITabs size="md">
        <LUITab label="One">
          <p>Medium tabs.</p>
        </LUITab>
        <LUITab label="Two">
          <p>Second panel.</p>
        </LUITab>
      </LUITabs>
      <LUITabs size="lg">
        <LUITab label="One">
          <p>Large tabs.</p>
        </LUITab>
        <LUITab label="Two">
          <p>Second panel.</p>
        </LUITab>
      </LUITabs>
    </div>
  ),
};
