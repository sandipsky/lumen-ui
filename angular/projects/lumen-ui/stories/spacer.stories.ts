import { Button, Flex, Spacer } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

const PRESETS = ['xs', 'sm', 'md', 'lg', 'xl'];

const BOX =
  'padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; ' +
  'background: var(--accent-bg); color: var(--accent-dark)';
/** Hatched fill so the otherwise invisible spacer shows up. */
const HATCH =
  'background: repeating-linear-gradient(45deg, var(--accent-bg) 0 4px, transparent 4px 8px)';

const meta: Meta<Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  decorators: [moduleMetadata({ imports: [Button, Flex] })],
  args: {
    h: 'md',
  },
  argTypes: {
    h: {
      control: 'select',
      options: PRESETS,
      description:
        'Vertical space — sets the height. Preset (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS size.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    w: {
      control: 'select',
      options: PRESETS,
      description:
        'Horizontal space — sets the width. Preset (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS size.',
      table: { defaultValue: { summary: 'undefined' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px">
        <div style="${BOX}">First</div>
        <l-spacer style="${HATCH}" ${argsToTemplate(args)} />
        <div style="${BOX}">Second</div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Spacer>;

/** Every input is wired to a control; the hatched band is the spacer. */
export const Playground: Story = {};

/** Push siblings apart in a stack with `h`. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="max-width: 320px">
        <div style="${BOX}">First</div>
        <l-spacer h="md" />
        <div style="${BOX}">Second</div>
        <l-spacer h="xl" />
        <div style="${BOX}">Third</div>
      </div>
    `,
  }),
};

/** Separate items in a row with `w`; the spacer never shrinks inside flex layouts. */
export const Horizontal: Story = {
  render: () => ({
    template: `
      <l-flex align="center">
        <l-button>Save</l-button>
        <l-spacer [w]="24" />
        <l-button variant="outlined">Cancel</l-button>
      </l-flex>
    `,
  }),
};

/** The five presets — xs 4px, sm 8px, md 16px, lg 24px, xl 32px. */
export const PresetSizes: Story = {
  render: () => ({
    props: { presets: PRESETS },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px">
        @for (size of presets; track size) {
          <div style="display: flex; align-items: center; gap: 12px">
            <code style="width: 24px; font-size: 12px">{{ size }}</code>
            <l-spacer [w]="size" style="height: 16px; background: var(--accent)" />
          </div>
        }
      </div>
    `,
  }),
};

/** A number is pixels; any CSS size string also works. */
export const CustomSizes: Story = {
  render: () => ({
    template: `
      <div style="max-width: 320px">
        <div style="${BOX}">40px below</div>
        <l-spacer [h]="40" style="${HATCH}" />
        <div style="${BOX}">3rem below</div>
        <l-spacer h="3rem" style="${HATCH}" />
        <div style="${BOX}">End</div>
      </div>
    `,
  }),
};
