import { signal } from '@angular/core';
import { Button, Chip } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type ChipStoryArgs = Chip & { label: string };

const VARIANTS = ['default', 'primary', 'success', 'error', 'warn', 'info', 'premium'];
const TAGS = ['Angular', 'TypeScript', 'Signals', 'RxJS', 'SCSS'];

const meta: Meta<ChipStoryArgs> = {
  title: 'Data Display/Chip',
  component: Chip,
  decorators: [moduleMetadata({ imports: [Button] })],
  args: {
    label: 'Chip',
    variant: 'default',
    size: 'md',
    dot: false,
    removable: false,
    removeLabel: 'Remove',
    removed: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Projected content (`<ng-content>`), not an input.',
    },
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Color tint of the chip.',
      table: { defaultValue: { summary: "'default'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Padding and font size of the pill.',
      table: { defaultValue: { summary: "'md'" } },
    },
    dot: {
      control: 'boolean',
      description: 'Show a leading dot in the variant color.',
      table: { defaultValue: { summary: 'false' } },
    },
    removable: {
      control: 'boolean',
      description: 'Show a remove button; pressing it emits `(removed)`.',
      table: { defaultValue: { summary: 'false' } },
    },
    removeLabel: {
      control: 'text',
      description: 'Accessible label for the remove button.',
      table: { defaultValue: { summary: "'Remove'" } },
    },
    removed: {
      action: 'removed',
      description: 'Fires when the remove button is pressed. The consumer removes the chip.',
      table: { category: 'outputs' },
    },
  },
  render: ({ label, ...args }) => ({
    props: { ...args, label },
    template: `<l-chip ${argsToTemplate(args)}>{{ label }}</l-chip>`,
  }),
};

export default meta;
type Story = StoryObj<ChipStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Seven tints: default, primary, success, error, warn, info and premium. */
export const Variants: Story = {
  render: () => ({
    props: { variants: VARIANTS },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (variant of variants; track variant) {
          <l-chip [variant]="variant">{{ variant }}</l-chip>
        }
      </div>
    `,
  }),
};

/** `[dot]="true"` adds a leading dot in the variant color — handy for live statuses. */
export const StatusDot: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <l-chip [dot]="true">Draft</l-chip>
        <l-chip variant="success" [dot]="true">Active</l-chip>
        <l-chip variant="warn" [dot]="true">Pending</l-chip>
        <l-chip variant="error" [dot]="true">Failed</l-chip>
        <l-chip variant="info" [dot]="true">Syncing</l-chip>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center">
        <l-chip variant="primary" size="sm">Small</l-chip>
        <l-chip variant="primary" size="md">Medium</l-chip>
        <l-chip variant="primary" size="lg">Large</l-chip>
      </div>
    `,
  }),
};

/** `(removed)` only reports the click — the consumer drops the chip from its own list. */
export const Removable: Story = {
  render: () => {
    const tags = signal(TAGS);
    return {
      props: {
        tags,
        remove: (tag: string) => tags.update((list) => list.filter((t) => t !== tag)),
        reset: () => tags.set(TAGS),
      },
      template: `
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px">
          <div style="display: flex; gap: 8px; flex-wrap: wrap">
            @for (tag of tags(); track tag) {
              <l-chip [removable]="true" [removeLabel]="'Remove ' + tag" (removed)="remove(tag)">
                {{ tag }}
              </l-chip>
            } @empty {
              <span style="font-size: 13px; color: var(--text-secondary)">All tags removed.</span>
            }
          </div>
          <l-button variant="outlined" size="sm" (click)="reset()">Reset</l-button>
        </div>
      `,
    };
  },
};
