import { useState } from 'react';
import { LUITab } from '../../../components/ui/tabs/tab';
import { LUITabs } from '../../../components/ui/tabs/tabs';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './tabs-stories.css';

const tabsApiInputs: ApiTableRow[] = [
  {
    name: 'orientation',
    description: 'Lay the strip out horizontally (top) or vertically (left).',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    example: 'orientation="vertical"',
  },
  {
    name: 'variant',
    description:
      "'line' slides an underline (or side bar) under the active tab; 'pills' fills it with an accent pill.",
    type: "'line' | 'pills'",
    default: "'line'",
    example: 'variant="pills"',
  },
  {
    name: 'size',
    description: 'Density of the tab buttons.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'size="lg"',
  },
  {
    name: 'grow',
    description: 'Stretch horizontal tabs to fill the width in equal parts.',
    type: 'boolean',
    default: 'false',
    example: 'grow',
  },
  {
    name: 'value',
    description:
      "The active tab's value (or its index when no value was given). Controlled when provided — pair with onChange; omit for uncontrolled use (defaults to the first enabled tab).",
    type: 'unknown',
    default: 'undefined',
    example: 'value={active}',
  },
];

const tabsApiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description:
      "Called with the newly active tab's value when the user selects a tab (the write half of the Angular [(value)] binding).",
    type: 'unknown',
    example: 'onChange={setActive}',
  },
  {
    name: 'onActiveChange',
    description:
      "Called with the newly active tab's value when the user selects a tab (port of the Angular activeChange output).",
    type: 'unknown',
    example: 'onActiveChange={(v) => onTab(v)}',
  },
];

const tabApiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Strip label.',
    type: 'string',
    default: "''",
    example: 'label="Profile"',
  },
  {
    name: 'icon',
    description: 'Optional leading glyph/emoji.',
    type: 'string',
    default: "''",
    example: 'icon="👤"',
  },
  {
    name: 'value',
    description: "Explicit value bound to LUITabs value. Defaults to the tab's index.",
    type: 'unknown',
    default: 'undefined',
    example: 'value="profile"',
  },
  {
    name: 'disabled',
    description: 'Disable the tab; it is skipped by arrow-key navigation.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
];

export default function TabsStories() {
  const [active, setActive] = useState<unknown>('profile');

  return (
    <div className="story-page tabs-stories">
      <header className="page-header">
        <h1 className="page-header__title">Tabs</h1>
        <p className="page-header__lead">
          A tab set with a sliding active indicator, laid out <code>horizontal</code> (default) or{' '}
          <code>vertical</code> via the <code>orientation</code> prop. Give it{' '}
          <code>&lt;LUITab&gt;</code> children with a <code>label</code> (and optional{' '}
          <code>icon</code>); the active panel fades in. Two visual styles — <code>line</code>{' '}
          (underline / side bar) and <code>pills</code> — plus sizes <code>sm</code>/
          <code>md</code>/<code>lg</code>, equal-width <code>grow</code>, disabled tabs, controlled{' '}
          <code>value</code> + <code>onChange</code>, and arrow-key navigation (WAI-ARIA tabs
          pattern).
        </p>
      </header>

      <div className="stories">
        <Story
          title="Horizontal (line)"
          description="The default: an underline indicator that slides between tabs."
          code={`<LUITabs value={active} onChange={setActive}>
  <LUITab label="Profile" value="profile">…</LUITab>
  <LUITab label="Settings" value="settings">…</LUITab>
  <LUITab label="Notifications" value="notifications">…</LUITab>
</LUITabs>`}
        >
          <LUITabs value={active} onChange={setActive}>
            <LUITab label="Profile" icon="👤" value="profile">
              <p>Manage your public profile, avatar, and bio.</p>
            </LUITab>
            <LUITab label="Settings" icon="⚙️" value="settings">
              <p>Configure preferences, language, and theme.</p>
            </LUITab>
            <LUITab label="Notifications" icon="🔔" value="notifications">
              <p>Choose which events send you an email or push alert.</p>
            </LUITab>
            <LUITab label="Archived" value="archived" disabled>
              <p>Archived items.</p>
            </LUITab>
          </LUITabs>
        </Story>

        <Story
          title="Vertical"
          description='orientation="vertical" puts the strip on the left with a sliding side bar; Up/Down navigates.'
          code={`<LUITabs orientation="vertical">…</LUITabs>`}
        >
          <LUITabs orientation="vertical">
            <LUITab label="Overview" icon="📊">
              <p>A high-level summary of your workspace activity this week.</p>
            </LUITab>
            <LUITab label="Members" icon="👥">
              <p>Invite teammates and manage their roles and permissions.</p>
            </LUITab>
            <LUITab label="Billing" icon="💳">
              <p>Review invoices, update your plan, and manage payment methods.</p>
            </LUITab>
          </LUITabs>
        </Story>

        <Story
          title="Pills"
          description='variant="pills" fills the active tab with a sliding accent pill.'
          code={`<LUITabs variant="pills">…</LUITabs>`}
        >
          <LUITabs variant="pills">
            <LUITab label="Day">
              <p>Today's schedule at a glance.</p>
            </LUITab>
            <LUITab label="Week">
              <p>The full week laid out.</p>
            </LUITab>
            <LUITab label="Month">
              <p>A month-long calendar view.</p>
            </LUITab>
          </LUITabs>
        </Story>

        <Story
          title="Vertical pills"
          description="Pills also work vertically."
          code={`<LUITabs variant="pills" orientation="vertical">…</LUITabs>`}
        >
          <LUITabs variant="pills" orientation="vertical">
            <LUITab label="General" icon="🧭">
              <p>General application settings.</p>
            </LUITab>
            <LUITab label="Security" icon="🔒">
              <p>Password, two-factor authentication, and active sessions.</p>
            </LUITab>
            <LUITab label="Integrations" icon="🧩">
              <p>Connect third-party apps and services.</p>
            </LUITab>
          </LUITabs>
        </Story>

        <Story
          title="Full width (grow)"
          description="grow stretches horizontal tabs to equal widths."
          code={`<LUITabs grow>…</LUITabs>`}
        >
          <LUITabs grow>
            <LUITab label="Description">
              <p>The full product description.</p>
            </LUITab>
            <LUITab label="Reviews">
              <p>What customers are saying.</p>
            </LUITab>
            <LUITab label="Shipping">
              <p>Delivery options and return policy.</p>
            </LUITab>
          </LUITabs>
        </Story>

        <Story
          title="Sizes"
          description="sm, md (default) and lg."
          code={`<LUITabs size="lg">…</LUITabs>`}
        >
          <div className="demo-col">
            <LUITabs size="sm">
              <LUITab label="One">
                <p>Small tabs.</p>
              </LUITab>
              <LUITab label="Two">
                <p>Second panel.</p>
              </LUITab>
            </LUITabs>
            <LUITabs size="lg">
              <LUITab label="One">
                <p>Large tabs.</p>
              </LUITab>
              <LUITab label="Two">
                <p>Second panel.</p>
              </LUITab>
            </LUITabs>
          </div>
        </Story>

        <ApiTable
          component="LUITabs"
          note="Give it LUITab children (direct children) — the strip renders from their label/icon and the active tab's panel is shown. WAI-ARIA tabs pattern with roving arrow-key navigation."
          inputs={tabsApiInputs}
          outputs={tabsApiOutputs}
        />

        <ApiTable
          component="LUITab"
          note="One tab inside LUITabs. Panel content is children, shown while active; the parent tab set owns the active state. No callbacks."
          inputs={tabApiInputs}
        />
      </div>
    </div>
  );
}
