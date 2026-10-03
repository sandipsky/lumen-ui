import { signal } from '@angular/core';
import { Avatar, BadgeDirective, Button } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

/** A neutral square host for the badge to sit on. */
const ICON_BOX =
  'display: inline-flex; align-items: center; justify-content: center; width: 40px; ' +
  'height: 40px; border-radius: 8px; background: var(--bg-dark); font-size: 20px';

/**
 * Consumers use the `[lBadge]` attribute directive; it appends the internal `<l-badge>` bubble
 * component to its host and positions it at the top-right corner.
 */
const meta: Meta<BadgeDirective> = {
  title: 'Data Display/Badge',
  component: BadgeDirective,
  decorators: [moduleMetadata({ imports: [Avatar, Button] })],
  args: {
    lBadge: 5,
    lBadgeColor: '',
    lBadgeSize: 'md',
    lBadgeOverflowCount: 99,
    lBadgeShowZero: false,
    lBadgeDynamic: false,
    lBadgeClick: fn(),
  },
  argTypes: {
    lBadge: {
      control: 'number',
      description: 'The count to display. Hidden at 0 unless `lBadgeShowZero` is set.',
      table: { defaultValue: { summary: 'null' } },
    },
    lBadgeColor: {
      control: 'text',
      description: 'Any CSS color or token; empty falls back to the badge red shade.',
      table: { defaultValue: { summary: "''" } },
    },
    lBadgeSize: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge bubble.',
      table: { defaultValue: { summary: "'md'" } },
    },
    lBadgeOverflowCount: {
      control: 'number',
      description: 'Show `N+` once the count passes this threshold.',
      table: { defaultValue: { summary: '99' } },
    },
    lBadgeShowZero: {
      control: 'boolean',
      description: 'Keep the badge visible when the count is 0.',
      table: { defaultValue: { summary: 'false' } },
    },
    lBadgeDynamic: {
      control: 'boolean',
      description: 'Play a pop animation whenever the count changes.',
      table: { defaultValue: { summary: 'false' } },
    },
    lBadgeClick: {
      action: 'lBadgeClick',
      description: "Emits when the bubble is clicked, without triggering the host's own click.",
      table: { category: 'outputs' },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-button variant="outlined" ${argsToTemplate(args)}>Inbox</l-button>`,
  }),
};

export default meta;
type Story = StoryObj<BadgeDirective>;

/** Every directive input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Drop `[lBadge]` on any element that can hold a child — an icon, a button, an avatar. */
export const OnElements: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <span style="${ICON_BOX}" [lBadge]="3">🔔</span>
        <span style="${ICON_BOX}" [lBadge]="12" lBadgeColor="var(--accent)">✉️</span>
        <l-button variant="outlined" [lBadge]="5">Inbox</l-button>
        <span
          style="display: inline-flex"
          [lBadge]="1"
          lBadgeSize="sm"
          lBadgeColor="var(--success)"
        >
          <l-avatar name="Ada Lovelace" size="36px" />
        </span>
      </div>
    `,
  }),
};

/** Counts above `lBadgeOverflowCount` render as `N+`; zero hides unless `lBadgeShowZero`. */
export const OverflowAndZero: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <span style="${ICON_BOX}" [lBadge]="128">🔔</span>
        <span style="${ICON_BOX}" [lBadge]="1200" [lBadgeOverflowCount]="999">🔔</span>
        <span style="${ICON_BOX}" [lBadge]="15" [lBadgeOverflowCount]="9">🔔</span>
        <span style="${ICON_BOX}" [lBadge]="0">🔕</span>
        <span style="${ICON_BOX}" [lBadge]="0" [lBadgeShowZero]="true">🔔</span>
      </div>
    `,
  }),
};

/** With `[lBadgeDynamic]="true"` the bubble pops each time the count changes. */
export const Dynamic: Story = {
  render: () => ({
    props: { count: signal(4) },
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <span style="${ICON_BOX}" [lBadge]="count()" [lBadgeDynamic]="true">🔔</span>
        <l-button variant="outlined" (click)="count.set(count() > 0 ? count() - 1 : 0)">
          −
        </l-button>
        <l-button variant="outlined" (click)="count.set(count() + 1)">+</l-button>
      </div>
    `,
  }),
};

/** `lBadgeSize` (sm / md / lg) and `lBadgeColor` (any CSS color or token). */
export const SizesAndColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px">
        <div style="display: flex; gap: 24px; align-items: center">
          <span style="${ICON_BOX}" [lBadge]="8" lBadgeSize="sm">🔔</span>
          <span style="${ICON_BOX}" [lBadge]="8" lBadgeSize="md">🔔</span>
          <span style="${ICON_BOX}" [lBadge]="8" lBadgeSize="lg">🔔</span>
        </div>
        <div style="display: flex; gap: 24px; align-items: center">
          <span style="${ICON_BOX}" [lBadge]="4">🔔</span>
          <span style="${ICON_BOX}" [lBadge]="4" lBadgeColor="var(--accent)">🔔</span>
          <span style="${ICON_BOX}" [lBadge]="4" lBadgeColor="var(--success)">🔔</span>
          <span style="${ICON_BOX}" [lBadge]="4" lBadgeColor="#6741d9">🔔</span>
        </div>
      </div>
    `,
  }),
};
