import { signal } from '@angular/core';
import { Box } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

type BoxStoryArgs = Box & { label: string };

const SPACING = ['xs', 'sm', 'md', 'lg', 'xl'];
/** Dashed outline around a demo, so margins show up. */
const CANVAS = 'border: 1px dashed var(--separator-dark); border-radius: 8px';

const spacing = (description: string) => ({
  control: 'select' as const,
  options: SPACING,
  description: `${description} Preset (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS value.`,
  table: { category: 'spacing', defaultValue: { summary: 'undefined' } },
});

const size = (description: string) => ({
  control: 'text' as const,
  description: `${description} A pixel number or any CSS size ('50%', '20rem', …).`,
  table: { category: 'size', defaultValue: { summary: 'undefined' } },
});

const meta: Meta<BoxStoryArgs> = {
  title: 'Layout/Box',
  component: Box,
  args: {
    label: 'Style props: p="md" bg="var(--accent-bg)" c="var(--accent-dark)"',
    p: 'md',
    bg: 'var(--accent-bg)',
    c: 'var(--accent-dark)',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Projected content (`<ng-content>`), not an input.',
    },
    m: spacing('Margin on all sides.'),
    mx: spacing('Horizontal margin (left + right); wins over `m`.'),
    my: spacing('Vertical margin (top + bottom); wins over `m`.'),
    mt: spacing('Top margin; wins over `my` / `m`.'),
    mb: spacing('Bottom margin; wins over `my` / `m`.'),
    ml: spacing('Left margin; wins over `mx` / `m`.'),
    mr: spacing('Right margin; wins over `mx` / `m`.'),
    p: spacing('Padding on all sides.'),
    px: spacing('Horizontal padding (left + right); wins over `p`.'),
    py: spacing('Vertical padding (top + bottom); wins over `p`.'),
    pt: spacing('Top padding; wins over `py` / `p`.'),
    pb: spacing('Bottom padding; wins over `py` / `p`.'),
    pl: spacing('Left padding; wins over `px` / `p`.'),
    pr: spacing('Right padding; wins over `px` / `p`.'),
    w: size('Width.'),
    miw: size('Min-width.'),
    maw: size('Max-width.'),
    h: size('Height.'),
    mih: size('Min-height.'),
    mah: size('Max-height.'),
    bg: {
      control: 'text',
      description: 'Background — any CSS color, including tokens like `var(--accent-bg)`.',
      table: { category: 'color', defaultValue: { summary: 'undefined' } },
    },
    c: {
      control: 'text',
      description: 'Text color — any CSS color, including tokens like `var(--accent-dark)`.',
      table: { category: 'color', defaultValue: { summary: 'undefined' } },
    },
  },
  render: ({ label, ...args }) => ({
    props: { ...args, label },
    template: `
      <div style="${CANVAS}">
        <l-box
          style="border-radius: 6px; font-size: 13px; font-weight: 600"
          ${argsToTemplate(args)}
        >
          {{ label }}
        </l-box>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<BoxStoryArgs>;

/** Every input is wired to a control; the dashed outline makes margins visible. */
export const Playground: Story = {};

/** The five spacing presets applied as padding. */
export const SpacingScale: Story = {
  render: () => ({
    props: { presets: SPACING },
    template: `
      <div style="display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap">
        @for (preset of presets; track preset) {
          <l-box [p]="preset" bg="var(--bg-light)" style="${CANVAS}">
            <l-box p="xs" bg="var(--accent)" c="var(--text-white)" style="font-size: 12px">
              p="{{ preset }}"
            </l-box>
          </l-box>
        }
      </div>
    `,
  }),
};

/** `mx`/`my` set a pair of sides, `mt`/`mb`/`ml`/`mr` a single one. */
export const MarginAndSides: Story = {
  render: () => ({
    template: `
      <l-box bg="var(--bg-light)" style="${CANVAS}">
        <l-box mx="xl" my="sm" p="sm" bg="var(--accent)" c="var(--text-white)">
          mx="xl" my="sm"
        </l-box>
        <l-box ml="xl" mb="sm" p="sm" bg="var(--accent-dark)" c="var(--text-white)">
          ml="xl" mb="sm"
        </l-box>
      </l-box>
    `,
  }),
};

/** `w`/`h` and the min/max variants take pixel numbers or any CSS size. */
export const Size: Story = {
  render: () => ({
    template: `
      <l-box w="100%" [maw]="320" [h]="56" p="sm" bg="var(--accent-bg)" c="var(--accent-dark)">
        w="100%" [maw]="320" [h]="56"
      </l-box>
    `,
  }),
};

/**
 * Use `l-box` as an attribute to render the box as a link, button or any other element — the
 * element's own attributes and events keep working.
 */
export const AsAnyElement: Story = {
  render: () => ({
    props: { clicks: signal(0) },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
        <a
          l-box
          href="https://mantine.dev"
          target="_blank"
          rel="noreferrer"
          p="sm"
          bg="var(--info-bg)"
          c="var(--info)"
          style="border-radius: 6px; text-decoration: none"
        >
          Renders an &lt;a&gt; — opens mantine.dev
        </a>
        <button
          l-box
          type="button"
          p="sm"
          bg="var(--accent)"
          c="var(--text-white)"
          style="border: none; border-radius: 6px; font: inherit; cursor: pointer"
          (click)="clicks.set(clicks() + 1)"
        >
          Renders a &lt;button&gt; — clicked {{ clicks() }}×
        </button>
      </div>
    `,
  }),
};
