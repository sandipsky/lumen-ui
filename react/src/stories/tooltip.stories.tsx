import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUITooltip, type TooltipPlacement } from '@lumen-ui/react';

const meta = {
  title: 'Overlays & Feedback/Tooltip',
  component: LUITooltip,
  args: {
    content: 'Delete item',
    placement: 'top',
    trigger: 'hover',
    disabled: false,
    arrow: true,
    color: '',
    openDelay: 120,
    closeDelay: 80,
    children: <LUIButton variant="outlined">Hover me</LUIButton>,
  },
  argTypes: {
    content: { control: 'text', table: { defaultValue: { summary: "''" } } },
    placement: {
      control: 'select',
      options: [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
      ],
      description:
        'Preferred placement — a side plus optional start/end alignment; flips to the opposite ' +
        'side when it would overflow the viewport.',
      table: { defaultValue: { summary: "'top'" } },
    },
    trigger: {
      control: 'inline-radio',
      options: ['hover', 'focus', 'click'],
      description:
        'What reveals the tooltip — hover and focus triggers both also open on keyboard focus.',
      table: { defaultValue: { summary: "'hover'" } },
    },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    arrow: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    color: { control: 'text', table: { defaultValue: { summary: "''" } } },
    maxWidth: { control: 'number', table: { defaultValue: { summary: 'null' } } },
    openDelay: { control: 'number', table: { defaultValue: { summary: '120' } } },
    closeDelay: { control: 'number', table: { defaultValue: { summary: '80' } } },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LUITooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — hover (or tab to) the button. */
export const Playground: Story = {};

/** Twelve placements: each side plus start / center / end alignment. */
export const Placements: Story = {
  render: () => {
    const cell = (placement: TooltipPlacement, label: string) => (
      <LUITooltip content={placement} placement={placement}>
        <LUIButton variant="outlined">{label}</LUIButton>
      </LUITooltip>
    );
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(80px, auto))',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {cell('topLeft', 'TL')}
        {cell('top', 'Top')}
        {cell('topRight', 'TR')}
        {cell('leftTop', 'LT')}
        <span />
        {cell('rightTop', 'RT')}
        {cell('left', 'Left')}
        <span />
        {cell('right', 'Right')}
        {cell('leftBottom', 'LB')}
        <span />
        {cell('rightBottom', 'RB')}
        {cell('bottomLeft', 'BL')}
        {cell('bottom', 'Bottom')}
        {cell('bottomRight', 'BR')}
      </div>
    );
  },
};

/** `trigger="click"` toggles on click; click again or press Esc to dismiss. */
export const ClickTrigger: Story = {
  args: {
    content: 'Copied to clipboard!',
    trigger: 'click',
    children: <LUIButton>Click me</LUIButton>,
  },
};

/** `color` accepts any CSS color or design token. */
export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <LUITooltip content="Looks good" color="var(--success)">
        <LUIButton variant="outlined">Success</LUIButton>
      </LUITooltip>
      <LUITooltip content="Danger zone" color="var(--error)">
        <LUIButton variant="outlined">Error</LUIButton>
      </LUITooltip>
      <LUITooltip content="Heads up" color="var(--warn)">
        <LUIButton variant="outlined">Warn</LUIButton>
      </LUITooltip>
    </div>
  ),
};

/** `arrow={false}` hides the arrow; text wraps at `maxWidth` (240px by default). */
export const NoArrowLongText: Story = {
  name: 'No arrow / long text',
  args: {
    content:
      'Tooltips wrap onto multiple lines once they reach their max width, keeping long hints readable.',
    arrow: false,
    children: <LUIButton variant="outlined">Long tooltip</LUIButton>,
  },
};

/** The tooltip works on any element, not just buttons. */
export const OnPlainText: Story = {
  render: () => (
    <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)' }}>
      Hover the{' '}
      <LUITooltip content="An abbreviation shown on hover">
        <span
          style={{
            color: 'var(--accent-dark)',
            textDecoration: 'underline dotted',
            cursor: 'help',
          }}
        >
          abbr.
        </span>
      </LUITooltip>{' '}
      to see its meaning.
    </p>
  ),
};
