import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUIFlex, LUISpacer } from '@lumen-ui/react';

const PRESETS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const box: CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  background: 'var(--accent-bg)',
  color: 'var(--accent-dark)',
};
/** Hatched fill so the otherwise invisible spacer shows up. */
const hatch: CSSProperties = {
  background: 'repeating-linear-gradient(45deg, var(--accent-bg) 0 4px, transparent 4px 8px)',
};

const meta = {
  title: 'Layout/Spacer',
  component: LUISpacer,
  args: {
    h: 'md',
  },
  argTypes: {
    h: { control: 'select', options: PRESETS, table: { defaultValue: { summary: 'undefined' } } },
    w: { control: 'select', options: PRESETS, table: { defaultValue: { summary: 'undefined' } } },
  },
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <div style={box}>First</div>
      <LUISpacer {...args} style={{ ...hatch, ...args.style }} />
      <div style={box}>Second</div>
    </div>
  ),
} satisfies Meta<typeof LUISpacer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control; the hatched band is the spacer. */
export const Playground: Story = {};

/** Push siblings apart in a stack with `h`. */
export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <div style={box}>First</div>
      <LUISpacer h="md" />
      <div style={box}>Second</div>
      <LUISpacer h="xl" />
      <div style={box}>Third</div>
    </div>
  ),
};

/** Separate items in a row with `w`; the spacer never shrinks inside flex layouts. */
export const Horizontal: Story = {
  render: () => (
    <LUIFlex align="center">
      <LUIButton>Save</LUIButton>
      <LUISpacer w={24} />
      <LUIButton variant="outlined">Cancel</LUIButton>
    </LUIFlex>
  ),
};

/** The five presets — xs 4px, sm 8px, md 16px, lg 24px, xl 32px. */
export const PresetSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {PRESETS.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <code style={{ width: 24, fontSize: 12 }}>{size}</code>
          <LUISpacer w={size} style={{ height: 16, background: 'var(--accent)' }} />
        </div>
      ))}
    </div>
  ),
};

/** A number is pixels; any CSS size string also works. */
export const CustomSizes: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <div style={box}>40px below</div>
      <LUISpacer h={40} style={hatch} />
      <div style={box}>3rem below</div>
      <LUISpacer h="3rem" style={hatch} />
      <div style={box}>End</div>
    </div>
  ),
};
