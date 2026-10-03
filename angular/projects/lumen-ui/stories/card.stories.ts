import { signal } from '@angular/core';
import { Button, Card, Chip } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

type CardStoryArgs = Card & { content: string };

const meta: Meta<CardStoryArgs> = {
  title: 'Data Display/Card',
  component: Card,
  decorators: [moduleMetadata({ imports: [Button, Chip] })],
  args: {
    content:
      'Configure the project name, visibility and default branch. The header and footer are separated from the body by full-width dividers.',
    title: 'Project settings',
    variant: 'default',
    padding: 'md',
    shadow: 'none',
    bordered: true,
    hoverable: false,
  },
  argTypes: {
    content: {
      control: 'text',
      description:
        'Projected body content (`<ng-content>`), not an input. The `[card-extra]` and `[card-footer]` slots are filled with a button and a caption here.',
    },
    title: {
      control: 'text',
      description:
        'Header title, rendered on the left. Adding it (or `[card-extra]` content) shows the header.',
      table: { defaultValue: { summary: "''" } },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'dark'],
      description: 'Surface tint — `dark` uses the darker section background.',
      table: { defaultValue: { summary: "'default'" } },
    },
    padding: {
      control: 'inline-radio',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Inner padding of each region: none 0, sm 8, md 12, lg 20 (px).',
      table: { defaultValue: { summary: "'md'" } },
    },
    shadow: {
      control: 'inline-radio',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Drop-shadow strength.',
      table: { defaultValue: { summary: "'none'" } },
    },
    bordered: {
      control: 'boolean',
      description: 'Show the 1px border around the card.',
      table: { defaultValue: { summary: 'true' } },
    },
    hoverable: {
      control: 'boolean',
      description: 'Lift the card and add a shadow on hover — for clickable cards.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: ({ content, ...args }) => ({
    props: { ...args, content },
    template: `
      <l-card style="max-width: 420px" ${argsToTemplate(args)}>
        <l-button card-extra variant="ghost" size="sm">Edit</l-button>
        {{ content }}
        <span card-footer>Updated 2 days ago</span>
      </l-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** `default` sits on the lightest background; `dark` uses the darker section tint. */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 220px)); gap: 16px">
        <l-card title="Default">Lightest surface (--bg-lightest).</l-card>
        <l-card variant="dark" title="Dark">Darker surface (--bg-light).</l-card>
      </div>
    `,
  }),
};

/** Padding applies to each region, so the dividers stay full-width. */
export const Padding: Story = {
  render: () => ({
    props: { paddings: ['none', 'sm', 'md', 'lg'] },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 180px)); gap: 16px">
        @for (padding of paddings; track padding) {
          <l-card [padding]="padding" [title]="'padding=' + padding">
            Body content.
            <span card-footer>Footer</span>
          </l-card>
        }
      </div>
    `,
  }),
};

/** Four elevations, from flat (`none`, the default) to `lg`. */
export const Shadow: Story = {
  render: () => ({
    props: { shadows: ['none', 'sm', 'md', 'lg'] },
    template: `
      <div
        style="display: grid; grid-template-columns: repeat(4, minmax(0, 180px)); gap: 16px;
          padding: 8px"
      >
        @for (shadow of shadows; track shadow) {
          <l-card [shadow]="shadow" [title]="'shadow=' + shadow">Body content.</l-card>
        }
      </div>
    `,
  }),
};

/** `[hoverable]="true"` lifts the card on hover — pair it with `(click)` for clickable cards. */
export const Hoverable: Story = {
  render: () => ({
    props: { clicks: signal(0) },
    template: `
      <l-card
        style="max-width: 320px"
        title="Quarterly report"
        [hoverable]="true"
        (click)="clicks.set(clicks() + 1)"
      >
        <l-chip card-extra variant="success" [dot]="true">Ready</l-chip>
        Click anywhere on the card to open it.
        <span card-footer>Opened {{ clicks() }} time{{ clicks() === 1 ? '' : 's' }}</span>
      </l-card>
    `,
  }),
};
