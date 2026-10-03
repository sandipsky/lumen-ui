import { Button, Skeleton } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<Skeleton> = {
  title: 'Overlays & Feedback/Skeleton',
  component: Skeleton,
  decorators: [moduleMetadata({ imports: [Button] })],
  args: {
    width: '100%',
    height: '48px',
    radius: '8px',
    circle: false,
    animate: true,
    visible: true,
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Width as any CSS length; ignored when `circle` is set (width follows height).',
      table: { defaultValue: { summary: "'100%'" } },
    },
    height: {
      control: 'text',
      description: 'Height as any CSS length — required for standalone blocks and for `circle`.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    radius: {
      control: 'text',
      description: 'Corner radius (any CSS length); overridden to 50% when `circle` is set.',
      table: { defaultValue: { summary: "'8px'" } },
    },
    circle: {
      control: 'boolean',
      description: 'Render a circle: the width follows `height` and the radius becomes 50%.',
      table: { defaultValue: { summary: 'false' } },
    },
    animate: {
      control: 'boolean',
      description: 'Play the pulsing animation (also respects `prefers-reduced-motion`).',
      table: { defaultValue: { summary: 'true' } },
    },
    visible: {
      control: 'boolean',
      description: 'Show the skeleton overlay (true) or reveal the projected content (false).',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-skeleton ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Skeleton>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Stack a few blocks with different widths to mimic a paragraph. */
export const TextLines: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px; max-width: 420px">
        <l-skeleton height="1rem" />
        <l-skeleton height="1rem" width="80%" />
        <l-skeleton height="1rem" width="60%" />
      </div>
    `,
  }),
};

/** `circle` makes a circle whose diameter is the height — set `radius` for pills. */
export const CircleAndShapes: Story = {
  name: 'Circle & shapes',
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px">
        <l-skeleton [circle]="true" height="56px" />
        <l-skeleton height="40px" radius="20px" width="160px" />
        <l-skeleton height="80px" width="80px" radius="14px" />
      </div>
    `,
  }),
};

/** Compose blocks to preview a whole component while its data loads. */
export const UserCard: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 14px; max-width: 360px">
        <l-skeleton [circle]="true" height="48px" />
        <div style="display: flex; flex-direction: column; gap: 8px; flex: 1">
          <l-skeleton height="0.9rem" width="40%" />
          <l-skeleton height="0.8rem" width="70%" />
        </div>
      </div>
    `,
  }),
};

/** A static placeholder. */
export const NoAnimation: Story = {
  args: { animate: false },
};

/** Wrap real markup and bind `[visible]` to a loading flag; the overlay covers it until done. */
export const WrappingContent: Story = {
  render: () => ({
    props: { loading: true },
    template: `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px">
        <l-button variant="outlined" (click)="loading = !loading">
          {{ loading ? 'Finish loading' : 'Reload' }}
        </l-button>
        <l-skeleton [visible]="loading" radius="10px">
          <div
            style="padding: 16px; border: 1px solid var(--separator); border-radius: 10px;
              background: var(--bg-lightest)"
          >
            <h3 style="margin: 0 0 6px; font-size: 16px; color: var(--text-primary)">
              Aurora Borealis
            </h3>
            <p style="margin: 0; font-size: 14px; line-height: 20px; color: var(--text-secondary)">
              The northern lights are a natural display of shifting colour caused by charged
              particles meeting the upper atmosphere. This content is hidden behind the skeleton
              while loading.
            </p>
          </div>
        </l-skeleton>
      </div>
    `,
  }),
};
