import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUICard, LUIChip, type CardPadding, type CardShadow } from '@lumen-ui/react';

const PADDINGS: CardPadding[] = ['none', 'sm', 'md', 'lg'];
const SHADOWS: CardShadow[] = ['none', 'sm', 'md', 'lg'];

const grid = (columns: number, width: number) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, minmax(0, ${width}px))`,
  gap: 16,
});

const meta = {
  title: 'Data Display/Card',
  component: LUICard,
  args: {
    children:
      'Configure the project name, visibility and default branch. The header and footer are separated from the body by full-width dividers.',
    title: 'Project settings',
    extra: (
      <LUIButton variant="ghost" size="sm">
        Edit
      </LUIButton>
    ),
    footer: 'Updated 2 days ago',
    variant: 'default',
    padding: 'md',
    shadow: 'none',
    bordered: true,
    hoverable: false,
    style: { maxWidth: 420 },
  },
  argTypes: {
    children: { control: 'text', description: 'Card body.' },
    title: { control: 'text' },
    extra: { control: false },
    footer: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'dark'],
      table: { defaultValue: { summary: "'default'" } },
    },
    padding: {
      control: 'inline-radio',
      options: PADDINGS,
      table: { defaultValue: { summary: "'md'" } },
    },
    shadow: {
      control: 'inline-radio',
      options: SHADOWS,
      table: { defaultValue: { summary: "'none'" } },
    },
    bordered: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    hoverable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    style: { control: 'object' },
  },
} satisfies Meta<typeof LUICard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** `default` sits on the lightest background; `dark` uses the darker section tint. */
export const Variants: Story = {
  render: () => (
    <div style={grid(2, 220)}>
      <LUICard title="Default">Lightest surface (--bg-lightest).</LUICard>
      <LUICard variant="dark" title="Dark">
        Darker surface (--bg-light).
      </LUICard>
    </div>
  ),
};

/** Padding applies to each region, so the dividers stay full-width. */
export const Padding: Story = {
  render: () => (
    <div style={grid(4, 180)}>
      {PADDINGS.map((padding) => (
        <LUICard key={padding} padding={padding} title={`padding=${padding}`} footer="Footer">
          Body content.
        </LUICard>
      ))}
    </div>
  ),
};

/** Four elevations, from flat (`none`, the default) to `lg`. */
export const Shadow: Story = {
  render: () => (
    <div style={{ ...grid(4, 180), padding: 8 }}>
      {SHADOWS.map((shadow) => (
        <LUICard key={shadow} shadow={shadow} title={`shadow=${shadow}`}>
          Body content.
        </LUICard>
      ))}
    </div>
  ),
};

function HoverableDemo() {
  const [clicks, setClicks] = useState(0);
  return (
    <LUICard
      style={{ maxWidth: 320 }}
      title="Quarterly report"
      extra={
        <LUIChip variant="success" dot>
          Ready
        </LUIChip>
      }
      footer={`Opened ${clicks} time${clicks === 1 ? '' : 's'}`}
      hoverable
      onClick={() => setClicks(clicks + 1)}
    >
      Click anywhere on the card to open it.
    </LUICard>
  );
}

/** `hoverable` lifts the card on hover — pair it with `onClick` for clickable cards. */
export const Hoverable: Story = {
  render: () => <HoverableDemo />,
};
