import { Button, TooltipDirective } from '@lumen-ui/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

const meta: Meta<TooltipDirective> = {
  title: 'Overlays & Feedback/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({ imports: [Button] }),
    // Leave room around the triggers for the bubbles.
    componentWrapperDecorator(
      (story) =>
        `<div style="display: flex; justify-content: center; padding: 48px">${story}</div>`,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Attribute directive — apply `[lTooltip]` to any element. The bubble renders in a ' +
          'body-level fixed layer, so it escapes ancestor `overflow` clipping, flips when it ' +
          'would overflow the viewport, and dismisses on Esc.',
      },
    },
  },
  args: {
    lTooltip: 'Delete item',
    lTooltipPlacement: 'top',
    lTooltipTrigger: 'hover',
    lTooltipDisabled: false,
    lTooltipArrow: true,
    lTooltipColor: '',
    lTooltipOpenDelay: 120,
    lTooltipCloseDelay: 80,
  },
  argTypes: {
    lTooltip: {
      control: 'text',
      description: 'The tooltip text; an empty string disables the tooltip.',
      table: { defaultValue: { summary: "''" } },
    },
    lTooltipPlacement: {
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
    lTooltipTrigger: {
      control: 'inline-radio',
      options: ['hover', 'focus', 'click'],
      description:
        'What reveals the tooltip — hover and focus triggers both also open on keyboard focus.',
      table: { defaultValue: { summary: "'hover'" } },
    },
    lTooltipDisabled: {
      control: 'boolean',
      description: 'Suppress the tooltip without removing the directive.',
      table: { defaultValue: { summary: 'false' } },
    },
    lTooltipArrow: {
      control: 'boolean',
      description: 'Render the arrow pointing at the trigger.',
      table: { defaultValue: { summary: 'true' } },
    },
    lTooltipColor: {
      control: 'text',
      description: 'Any CSS color/token for the bubble background, e.g. `var(--error)`.',
      table: { defaultValue: { summary: "''" } },
    },
    lTooltipMaxWidth: {
      control: 'number',
      description:
        'Max bubble width in px before the text wraps; when unset, the style default (240px) ' +
        'applies.',
      table: { defaultValue: { summary: 'null' } },
    },
    lTooltipOpenDelay: {
      control: 'number',
      description: 'Delay before showing, in ms.',
      table: { defaultValue: { summary: '120' } },
    },
    lTooltipCloseDelay: {
      control: 'number',
      description: 'Delay before hiding, in ms.',
      table: { defaultValue: { summary: '80' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-button variant="outlined" ${argsToTemplate(args)}>Hover me</l-button>`,
  }),
};

export default meta;
type Story = StoryObj<TooltipDirective>;

/** Every input is wired to a control — hover (or tab to) the button. */
export const Playground: Story = {};

/** Twelve placements: each side plus start / center / end alignment. */
export const Placements: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(80px, auto)); gap: 12px">
        <l-button lTooltip="topLeft" lTooltipPlacement="topLeft" variant="outlined">TL</l-button>
        <l-button lTooltip="top" lTooltipPlacement="top" variant="outlined">Top</l-button>
        <l-button lTooltip="topRight" lTooltipPlacement="topRight" variant="outlined">TR</l-button>
        <l-button lTooltip="leftTop" lTooltipPlacement="leftTop" variant="outlined">LT</l-button>
        <span></span>
        <l-button lTooltip="rightTop" lTooltipPlacement="rightTop" variant="outlined">RT</l-button>
        <l-button lTooltip="left" lTooltipPlacement="left" variant="outlined">Left</l-button>
        <span></span>
        <l-button lTooltip="right" lTooltipPlacement="right" variant="outlined">Right</l-button>
        <l-button lTooltip="leftBottom" lTooltipPlacement="leftBottom" variant="outlined">
          LB
        </l-button>
        <span></span>
        <l-button lTooltip="rightBottom" lTooltipPlacement="rightBottom" variant="outlined">
          RB
        </l-button>
        <l-button lTooltip="bottomLeft" lTooltipPlacement="bottomLeft" variant="outlined">
          BL
        </l-button>
        <l-button lTooltip="bottom" lTooltipPlacement="bottom" variant="outlined">Bottom</l-button>
        <l-button lTooltip="bottomRight" lTooltipPlacement="bottomRight" variant="outlined">
          BR
        </l-button>
      </div>
    `,
  }),
};

/** `lTooltipTrigger="click"` toggles on click; click again or press Esc to dismiss. */
export const ClickTrigger: Story = {
  render: () => ({
    template: `
      <l-button lTooltip="Copied to clipboard!" lTooltipTrigger="click">Click me</l-button>
    `,
  }),
};

/** `lTooltipColor` accepts any CSS color or design token. */
export const CustomColor: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <l-button lTooltip="Looks good" lTooltipColor="var(--success)" variant="outlined">
          Success
        </l-button>
        <l-button lTooltip="Danger zone" lTooltipColor="var(--error)" variant="outlined">
          Error
        </l-button>
        <l-button lTooltip="Heads up" lTooltipColor="var(--warn)" variant="outlined">
          Warn
        </l-button>
      </div>
    `,
  }),
};

/** `[lTooltipArrow]="false"` hides the arrow; text wraps at `lTooltipMaxWidth` (240px default). */
export const NoArrowLongText: Story = {
  name: 'No arrow / long text',
  render: () => ({
    template: `
      <l-button
        variant="outlined"
        lTooltip="Tooltips wrap onto multiple lines once they reach their max width, keeping long hints readable."
        [lTooltipArrow]="false"
      >
        Long tooltip
      </l-button>
    `,
  }),
};

/** The directive works on any element, not just buttons. */
export const OnPlainText: Story = {
  render: () => ({
    template: `
      <p style="margin: 0; font-size: 15px; color: var(--text-secondary)">
        Hover the
        <span
          lTooltip="An abbreviation shown on hover"
          style="color: var(--accent-dark); text-decoration: underline dotted; cursor: help"
        >abbr.</span>
        to see its meaning.
      </p>
    `,
  }),
};
