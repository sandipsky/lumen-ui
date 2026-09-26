import { useState } from 'react';
import {
  LUISegmentedControl,
  type SegmentedOption,
} from '../../../components/ui/segmented-control/segmented-control';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './segmented-control-stories.css';

const ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const viewOptions: SegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Timeline', value: 'timeline', disabled: true },
];

const sizes = ['sm', 'md', 'lg'];

const plans = ['Free', 'Pro', 'Team'];

const apiInputs: ApiTableRow[] = [
  {
    name: 'options',
    description: 'Options to choose from — plain strings or { label, value, disabled } objects.',
    type: '(string | SegmentedOption)[]',
    default: '[]',
    example: 'options={ranges}',
  },
  {
    name: 'value',
    description: "The selected option's value (controlled — pair with onChange).",
    type: 'unknown',
    default: 'null',
    example: 'value={range}',
  },
  {
    name: 'orientation',
    description: 'Lay segments out in a row or a column; arrow-key navigation follows the axis.',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    example: 'orientation="vertical"',
  },
  {
    name: 'size',
    description: 'Control size.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'size="lg"',
  },
  {
    name: 'disabled',
    description:
      "Disable the whole control; a single segment can be disabled via its option's disabled flag.",
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'fullWidth',
    description: 'Stretch to the container width with equal-width segments.',
    type: 'boolean',
    default: 'false',
    example: 'fullWidth',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description: 'Called with the selected value when it changes.',
    type: 'unknown',
    example: 'onChange={(v) => setRange(v as string)}',
  },
];

export default function SegmentedControlStories() {
  const [range, setRange] = useState('Daily');
  const [view, setView] = useState('list');
  const [size, setSize] = useState('md');
  const [plan, setPlan] = useState('Pro');

  return (
    <div className="story-page segmented-control-stories">
      <header className="page-header">
        <h1 className="page-header__title">Segmented Control</h1>
        <p className="page-header__lead">
          A single-select switch rendered as connected segments (iOS / Ant Design{' '}
          <code>Segmented</code> style). Pass plain strings or{' '}
          <code>{'{ label, value, disabled }'}</code> objects, bind with <code>value</code> +{' '}
          <code>onChange</code>, and lay it out <code>horizontal</code> (default) or{' '}
          <code>vertical</code>. Sizes <code>sm</code> / <code>md</code> / <code>lg</code>,
          full-width mode, per-option disabling, and arrow-key navigation (the WAI-ARIA radio-group
          pattern) are built in.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Pass a string array and bind the selected value."
          code={`const ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
const [range, setRange] = useState('Daily');

<LUISegmentedControl options={ranges} value={range} onChange={(v) => setRange(v as string)} />`}
        >
          <div className="demo-col">
            <LUISegmentedControl
              options={ranges}
              value={range}
              onChange={(v) => setRange(v as string)}
            />
            <p className="demo-readout">Selected: {range}</p>
          </div>
        </Story>

        <Story
          title="Vertical"
          description="orientation='vertical' stacks the segments; arrow Up/Down navigates."
          code={`<LUISegmentedControl options={ranges} orientation="vertical" value={range} onChange={(v) => setRange(v as string)} />`}
        >
          <LUISegmentedControl
            options={ranges}
            orientation="vertical"
            value={range}
            onChange={(v) => setRange(v as string)}
          />
        </Story>

        <Story
          title="Sizes"
          description="sm, md (default) and lg."
          code={`<LUISegmentedControl options={sizes} size="sm" value={size} onChange={(v) => setSize(v as string)} />`}
        >
          <div className="demo-col">
            <LUISegmentedControl
              options={sizes}
              size="sm"
              value={size}
              onChange={(v) => setSize(v as string)}
            />
            <LUISegmentedControl
              options={sizes}
              size="md"
              value={size}
              onChange={(v) => setSize(v as string)}
            />
            <LUISegmentedControl
              options={sizes}
              size="lg"
              value={size}
              onChange={(v) => setSize(v as string)}
            />
          </div>
        </Story>

        <Story
          title="Object options + disabled"
          description="Use { label, value, disabled } objects; disabled segments are skipped by click and keyboard."
          code={`const viewOptions = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Timeline', value: 'timeline', disabled: true },
];

<LUISegmentedControl options={viewOptions} value={view} onChange={(v) => setView(v as string)} />`}
        >
          <div className="demo-col">
            <LUISegmentedControl
              options={viewOptions}
              value={view}
              onChange={(v) => setView(v as string)}
            />
            <p className="demo-readout">Selected: {view}</p>
          </div>
        </Story>

        <Story
          title="Full width"
          description="fullWidth stretches the control and splits the segments evenly."
          code={`<LUISegmentedControl options={plans} fullWidth value={plan} onChange={(v) => setPlan(v as string)} />`}
        >
          <LUISegmentedControl
            options={plans}
            fullWidth
            value={plan}
            onChange={(v) => setPlan(v as string)}
          />
        </Story>

        <Story
          title="Disabled"
          description="Disable the whole control with disabled."
          code={`<LUISegmentedControl options={plans} disabled value={plan} onChange={(v) => setPlan(v as string)} />`}
        >
          <LUISegmentedControl
            options={plans}
            disabled
            value={plan}
            onChange={(v) => setPlan(v as string)}
          />
        </Story>

        <ApiTable
          component="LUISegmentedControl"
          note="Controlled component — the bound value is the selected option's value. react-hook-form users wrap it in <Controller>. Follows the WAI-ARIA radio-group keyboard pattern."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
