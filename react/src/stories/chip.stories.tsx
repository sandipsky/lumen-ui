import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIButton, LUIChip, type ChipVariant } from '@lumen-ui/react';

const VARIANTS: ChipVariant[] = [
  'default',
  'primary',
  'success',
  'error',
  'warn',
  'info',
  'premium',
];
const TAGS = ['React', 'TypeScript', 'Hooks', 'Vite', 'CSS'];

const row = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' } as const;

const meta = {
  title: 'Data Display/Chip',
  component: LUIChip,
  args: {
    children: 'Chip',
    variant: 'default',
    size: 'md',
    dot: false,
    removable: false,
    removeLabel: 'Remove',
    onRemoved: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'Chip label.' },
    variant: {
      control: 'select',
      options: VARIANTS,
      table: { defaultValue: { summary: "'default'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "'md'" } },
    },
    dot: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    removable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    removeLabel: { control: 'text', table: { defaultValue: { summary: "'Remove'" } } },
  },
} satisfies Meta<typeof LUIChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Seven tints: default, primary, success, error, warn, info and premium. */
export const Variants: Story = {
  render: () => (
    <div style={row}>
      {VARIANTS.map((variant) => (
        <LUIChip key={variant} variant={variant}>
          {variant}
        </LUIChip>
      ))}
    </div>
  ),
};

/** `dot` adds a leading dot in the variant color — handy for live statuses. */
export const StatusDot: Story = {
  render: () => (
    <div style={row}>
      <LUIChip dot>Draft</LUIChip>
      <LUIChip variant="success" dot>
        Active
      </LUIChip>
      <LUIChip variant="warn" dot>
        Pending
      </LUIChip>
      <LUIChip variant="error" dot>
        Failed
      </LUIChip>
      <LUIChip variant="info" dot>
        Syncing
      </LUIChip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <LUIChip variant="primary" size="sm">
        Small
      </LUIChip>
      <LUIChip variant="primary" size="md">
        Medium
      </LUIChip>
      <LUIChip variant="primary" size="lg">
        Large
      </LUIChip>
    </div>
  ),
};

function RemovableDemo() {
  const [tags, setTags] = useState(TAGS);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      <div style={row}>
        {tags.map((tag) => (
          <LUIChip
            key={tag}
            removable
            removeLabel={`Remove ${tag}`}
            onRemoved={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </LUIChip>
        ))}
        {!tags.length && (
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>All tags removed.</span>
        )}
      </div>
      <LUIButton variant="outlined" size="sm" onClick={() => setTags(TAGS)}>
        Reset
      </LUIButton>
    </div>
  );
}

/** `onRemoved` only reports the click — the consumer drops the chip from its own list. */
export const Removable: Story = {
  render: () => <RemovableDemo />,
};
