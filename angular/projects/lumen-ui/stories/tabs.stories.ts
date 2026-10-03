import { Tab, Tabs } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

const meta: Meta<Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  decorators: [moduleMetadata({ imports: [Tab] })],
  parameters: {
    docs: {
      description: {
        component:
          'Project `<l-tab label icon value disabled>` children — the strip renders from their ' +
          "`label`/`icon` and the active tab's projected panel is shown. Follows the WAI-ARIA " +
          'tabs pattern with roving arrow-key navigation.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'line',
    size: 'md',
    grow: false,
    value: 'profile',
    activeChange: fn(),
    valueChange: fn(),
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Lay the strip out horizontally (top) or vertically (left).',
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
      description: 'Density of the tab buttons.',
      table: { defaultValue: { summary: "'md'" } },
    },
    grow: {
      control: 'boolean',
      description: 'Stretch horizontal tabs to fill the width in equal parts.',
      table: { defaultValue: { summary: 'false' } },
    },
    value: {
      control: 'select',
      options: ['profile', 'settings', 'notifications'],
      description:
        "The active tab's `value` (or its index when no `value` was given) — two-way " +
        '(`model()`). Defaults to the first enabled tab.',
      table: { defaultValue: { summary: 'null' } },
    },
    activeChange: {
      action: 'activeChange',
      description: "Emits the newly active tab's value when the user selects a tab.",
    },
    valueChange: { action: 'valueChange', description: 'The `model()` half of `[(value)]`.' },
  },
  render: (args) => ({
    props: args,
    template: `
      <l-tabs ${argsToTemplate(args)}>
        <l-tab label="Profile" icon="👤" value="profile">
          <p>Manage your public profile, avatar, and bio.</p>
        </l-tab>
        <l-tab label="Settings" icon="⚙️" value="settings">
          <p>Configure preferences, language, and theme.</p>
        </l-tab>
        <l-tab label="Notifications" icon="🔔" value="notifications">
          <p>Choose which events send you an email or push alert.</p>
        </l-tab>
        <l-tab label="Archived" value="archived" [disabled]="true">
          <p>Archived items.</p>
        </l-tab>
      </l-tabs>
    `,
  }),
};

export default meta;
type Story = StoryObj<Tabs>;

/** Every input is wired to a control — use this one to play. */
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
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px">
        <l-tabs size="sm">
          <l-tab label="One"><p>Small tabs.</p></l-tab>
          <l-tab label="Two"><p>Second panel.</p></l-tab>
        </l-tabs>
        <l-tabs size="md">
          <l-tab label="One"><p>Medium tabs.</p></l-tab>
          <l-tab label="Two"><p>Second panel.</p></l-tab>
        </l-tabs>
        <l-tabs size="lg">
          <l-tab label="One"><p>Large tabs.</p></l-tab>
          <l-tab label="Two"><p>Second panel.</p></l-tab>
        </l-tabs>
      </div>
    `,
  }),
};
