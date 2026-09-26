import { LUIButton } from '../../../components/ui/button/button';
import { LUITooltip } from '../../../components/ui/tooltip/tooltip';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './tooltip-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'content',
    description: 'The tooltip text; an empty string disables the tooltip.',
    type: 'string',
    default: "''",
    example: 'content="Delete item"',
  },
  {
    name: 'placement',
    description:
      'Preferred placement — a side plus optional start/end alignment; flips to the opposite side when it would overflow the viewport.',
    type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
    default: "'top'",
    example: 'placement="bottomLeft"',
  },
  {
    name: 'trigger',
    description:
      'What reveals the tooltip — hover and focus triggers both also open on keyboard focus.',
    type: "'hover' | 'focus' | 'click'",
    default: "'hover'",
    example: 'trigger="click"',
  },
  {
    name: 'disabled',
    description: 'Suppress the tooltip without removing the wrapper.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'arrow',
    description: 'Render the arrow pointing at the trigger.',
    type: 'boolean',
    default: 'true',
    example: 'arrow={false}',
  },
  {
    name: 'color',
    description: 'Any CSS color/token for the bubble background.',
    type: 'string',
    default: "''",
    example: 'color="var(--error)"',
  },
  {
    name: 'maxWidth',
    description:
      'Max bubble width in px before the text wraps; when unset, the style default (240px) applies.',
    type: 'number | null',
    default: 'null',
    example: 'maxWidth={320}',
  },
  {
    name: 'openDelay',
    description: 'Delay before showing, in ms.',
    type: 'number',
    default: '120',
    example: 'openDelay={300}',
  },
  {
    name: 'closeDelay',
    description: 'Delay before hiding, in ms.',
    type: 'number',
    default: '80',
    example: 'closeDelay={0}',
  },
  {
    name: 'children',
    description: 'The trigger — a single element the tooltip is anchored to.',
    type: 'ReactNode',
    default: '—',
    example: '<LUITooltip content="Hint"><button>…</button></LUITooltip>',
  },
];

export default function TooltipStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Tooltip</h1>
        <p className="page-header__lead">
          A text hint that floats beside any element, inspired by Ant Design's <code>Tooltip</code>
          . Wrap a target in <code>LUITooltip</code>; it shows on hover and keyboard focus (or{' '}
          <code>click</code>), renders in a fixed layer that escapes ancestor{' '}
          <code>overflow</code> clipping, flips when it would overflow the viewport, and points an
          arrow at the trigger. Twelve placements, custom color, open/close delays, and
          Esc-to-dismiss are built in.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Hover or tab to the button. Shows on hover and focus by default."
          code={`<LUITooltip content="Delete item"><button>🗑 Delete</button></LUITooltip>`}
        >
          <LUITooltip content="Delete item">
            <LUIButton variant="outlined">Hover me</LUIButton>
          </LUITooltip>
        </Story>

        <Story
          title="Placements"
          description="Twelve placements: each side plus start / center / end alignment."
          code={`<LUITooltip content="Tooltip" placement="top"><button>Top</button></LUITooltip>
<LUITooltip content="Tooltip" placement="bottomLeft"><button>Bottom left</button></LUITooltip>`}
        >
          <div className="placement-grid">
            <LUITooltip content="topLeft" placement="topLeft">
              <LUIButton variant="outlined">TL</LUIButton>
            </LUITooltip>
            <LUITooltip content="top" placement="top">
              <LUIButton variant="outlined">Top</LUIButton>
            </LUITooltip>
            <LUITooltip content="topRight" placement="topRight">
              <LUIButton variant="outlined">TR</LUIButton>
            </LUITooltip>

            <LUITooltip content="leftTop" placement="leftTop">
              <LUIButton variant="outlined">LT</LUIButton>
            </LUITooltip>
            <span className="placement-spacer"></span>
            <LUITooltip content="rightTop" placement="rightTop">
              <LUIButton variant="outlined">RT</LUIButton>
            </LUITooltip>

            <LUITooltip content="left" placement="left">
              <LUIButton variant="outlined">Left</LUIButton>
            </LUITooltip>
            <span className="placement-spacer"></span>
            <LUITooltip content="right" placement="right">
              <LUIButton variant="outlined">Right</LUIButton>
            </LUITooltip>

            <LUITooltip content="leftBottom" placement="leftBottom">
              <LUIButton variant="outlined">LB</LUIButton>
            </LUITooltip>
            <span className="placement-spacer"></span>
            <LUITooltip content="rightBottom" placement="rightBottom">
              <LUIButton variant="outlined">RB</LUIButton>
            </LUITooltip>

            <LUITooltip content="bottomLeft" placement="bottomLeft">
              <LUIButton variant="outlined">BL</LUIButton>
            </LUITooltip>
            <LUITooltip content="bottom" placement="bottom">
              <LUIButton variant="outlined">Bottom</LUIButton>
            </LUITooltip>
            <LUITooltip content="bottomRight" placement="bottomRight">
              <LUIButton variant="outlined">BR</LUIButton>
            </LUITooltip>
          </div>
        </Story>

        <Story
          title="Click trigger"
          description='trigger="click" toggles on click; press Esc to dismiss.'
          code={`<LUITooltip content="Copied!" trigger="click"><button>Copy link</button></LUITooltip>`}
        >
          <LUITooltip content="Copied to clipboard!" trigger="click">
            <LUIButton>Click me</LUIButton>
          </LUITooltip>
        </Story>

        <Story
          title="Custom color"
          description="color accepts any CSS color or token."
          code={`<LUITooltip content="Danger zone" color="var(--error)"><button>Delete</button></LUITooltip>`}
        >
          <div className="demo-row">
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
        </Story>

        <Story
          title="No arrow / long text"
          description="arrow={false} hides the arrow; text wraps at maxWidth (default 240px)."
          code={`<LUITooltip content="A longer hint…" arrow={false}><span>Info</span></LUITooltip>`}
        >
          <LUITooltip
            content="Tooltips wrap onto multiple lines once they reach their max width, keeping long hints readable."
            arrow={false}
          >
            <LUIButton variant="outlined">Long tooltip</LUIButton>
          </LUITooltip>
        </Story>

        <Story
          title="On plain text"
          description="The tooltip wraps any element, not just buttons."
          code={`<LUITooltip content="I am a hint"><span>underlined term</span></LUITooltip>`}
        >
          <p className="demo-text">
            Hover the{' '}
            <LUITooltip content="An abbreviation shown on hover" placement="top">
              <span className="term">abbr.</span>
            </LUITooltip>{' '}
            to see its meaning.
          </p>
        </Story>

        <ApiTable
          component="LUITooltip"
          note="Wrapper component — wrap a single trigger element; the wrapper itself renders with display: contents, so layout is untouched. The bubble portals into a body-level fixed layer, so it escapes ancestor overflow clipping, flips when it would overflow the viewport, and dismisses on Esc. No callbacks."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
