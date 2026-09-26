import { useState } from 'react';
import { LUIBadgeWrapper } from '../../../components/ui/badge/badge';
import { LUIButton } from '../../../components/ui/button/button';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './badge-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'badge',
    description: 'The count to display. Hidden at 0 unless badgeShowZero is set.',
    type: 'number | null',
    default: 'null',
    example: 'badge={unread}',
  },
  {
    name: 'badgeColor',
    description: 'Any CSS color or token; defaults to the badge red shade.',
    type: 'string',
    default: "''",
    example: 'badgeColor="var(--accent)"',
  },
  {
    name: 'badgeSize',
    description: 'Size of the badge bubble.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'badgeSize="lg"',
  },
  {
    name: 'badgeOverflowCount',
    description: 'Show N+ once the count passes this threshold.',
    type: 'number',
    default: '99',
    example: 'badgeOverflowCount={999}',
  },
  {
    name: 'badgeShowZero',
    description: 'Keep the badge visible when the count is 0.',
    type: 'boolean',
    default: 'false',
    example: 'badgeShowZero',
  },
  {
    name: 'badgeDynamic',
    description: 'Play a pop animation whenever the count changes.',
    type: 'boolean',
    default: 'false',
    example: 'badgeDynamic',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onBadgeClick',
    description: "Fires when the badge bubble is clicked, without triggering the host's click.",
    type: 'MouseEvent',
    example: 'onBadgeClick={() => onBadgeClick()}',
  },
];

export default function BadgeStories() {
  const [count, setCount] = useState(3);
  const [lastClick, setLastClick] = useState('—');

  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => Math.max(0, c - 1));
  const onBadgeClick = () => setLastClick(new Date().toLocaleTimeString());

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Badge</h1>
        <p className="page-header__lead">
          A count badge applied by wrapping the target — put any element (button, icon, avatar)
          inside <code>LUIBadgeWrapper</code> and a bubble is positioned at its top-right corner.
          Props are prefixed to avoid clashing with native attributes: <code>badgeColor</code>,{' '}
          <code>badgeSize</code>, <code>badgeOverflowCount</code>, <code>badgeShowZero</code>,{' '}
          <code>badgeDynamic</code>, and the <code>onBadgeClick</code> callback. Hides at zero
          unless <code>badgeShowZero</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Wrap the element you want decorated in LUIBadgeWrapper."
          code={`<LUIBadgeWrapper badge={3}><button>🔔</button></LUIBadgeWrapper>
<LUIBadgeWrapper badge={12}><span className="icon">✉️</span></LUIBadgeWrapper>`}
        >
          <div className="demo-row">
            <LUIBadgeWrapper badge={3}>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={12}>
              <span className="icon-box">✉️</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={5}>
              <LUIButton variant="outlined">Inbox</LUIButton>
            </LUIBadgeWrapper>
          </div>
        </Story>

        <Story
          title="Sizes"
          description="badgeSize accepts sm, md (default) and lg."
          code={`<LUIBadgeWrapper badge={8} badgeSize="sm">…</LUIBadgeWrapper>
<LUIBadgeWrapper badge={8} badgeSize="md">…</LUIBadgeWrapper>
<LUIBadgeWrapper badge={8} badgeSize="lg">…</LUIBadgeWrapper>`}
        >
          <div className="demo-row">
            <LUIBadgeWrapper badge={8} badgeSize="sm">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={8} badgeSize="md">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={8} badgeSize="lg">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
          </div>
        </Story>

        <Story
          title="Overflow count"
          description="Counts above badgeOverflowCount render as N+."
          code={`<LUIBadgeWrapper badge={128} badgeOverflowCount={99}>…</LUIBadgeWrapper>`}
        >
          <div className="demo-row">
            <LUIBadgeWrapper badge={128} badgeOverflowCount={99}>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={1200} badgeOverflowCount={999}>
              <span className="icon-box">✉️</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={15} badgeOverflowCount={9}>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
          </div>
        </Story>

        <Story
          title="Show zero"
          description="A zero count is hidden by default; set badgeShowZero to keep it."
          code={`<LUIBadgeWrapper badge={0}>…</LUIBadgeWrapper>            {/* hidden */}
<LUIBadgeWrapper badge={0} badgeShowZero>…</LUIBadgeWrapper>`}
        >
          <div className="demo-row">
            <LUIBadgeWrapper badge={0}>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={0} badgeShowZero>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
          </div>
        </Story>

        <Story
          title="Dynamic (animates on change)"
          description="With badgeDynamic the badge pops each time the count changes."
          code={`<LUIBadgeWrapper badge={count} badgeDynamic>…</LUIBadgeWrapper>`}
        >
          <div className="demo-col">
            <LUIBadgeWrapper badge={count} badgeDynamic>
              <span className="icon-box icon-box--lg">🔔</span>
            </LUIBadgeWrapper>
            <div className="demo-row">
              <LUIButton variant="outlined" onClick={dec}>
                −
              </LUIButton>
              <LUIButton variant="outlined" onClick={inc}>
                +
              </LUIButton>
            </div>
          </div>
        </Story>

        <Story
          title="Color"
          description="badgeColor takes any CSS color or token (default is a red shade)."
          code={`<LUIBadgeWrapper badge={4} badgeColor="var(--accent)">…</LUIBadgeWrapper>`}
        >
          <div className="demo-row">
            <LUIBadgeWrapper badge={4}>
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={4} badgeColor="var(--accent)">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={4} badgeColor="var(--success)">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
            <LUIBadgeWrapper badge={4} badgeColor="#6741d9">
              <span className="icon-box">🔔</span>
            </LUIBadgeWrapper>
          </div>
        </Story>

        <Story
          title="Click action"
          description="onBadgeClick fires when the bubble is clicked, without triggering the host's own click."
          code={`<LUIBadgeWrapper badge={9} onBadgeClick={() => onBadgeClick()}>
  <button>Notifications</button>
</LUIBadgeWrapper>`}
        >
          <div className="demo-col">
            <LUIBadgeWrapper badge={9} onBadgeClick={onBadgeClick}>
              <LUIButton variant="outlined">Notifications</LUIButton>
            </LUIBadgeWrapper>
            <p className="demo-readout">Last badge click: {lastClick}</p>
          </div>
        </Story>

        <ApiTable
          component="LUIBadgeWrapper"
          note="React counterpart of the Angular [lBadge] directive — wrap any element that can contain a child. It renders a shrink-wrapping position: relative host span around its children with an internal LUIBadge bubble positioned at the top-right corner. Props are prefixed with badge to avoid clashing with native attributes (size, color)."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
