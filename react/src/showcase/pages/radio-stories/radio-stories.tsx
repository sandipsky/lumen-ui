import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LUIRadio, type RadioOption } from '../../../components/ui/input/radio/radio';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './radio-stories.css';

const plans: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Optional group label rendered above the options.',
    type: 'string',
    default: "''",
    example: 'label="Plan"',
  },
  {
    name: 'options',
    description: 'Options to render — one radio per { label, value, disabled? } entry.',
    type: 'RadioOption[]',
    default: '[]',
    example: 'options={plans}',
  },
  {
    name: 'name',
    description:
      'Native name shared across the group so only one option can be selected; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'name="plan"',
  },
  {
    name: 'value / defaultValue',
    description: 'Controlled / uncontrolled selected value, matched strictly against option.value.',
    type: 'string | number',
    default: '—',
    example: 'value={plan}',
  },
  {
    name: 'disabled',
    description:
      "Disable the whole group; a single entry can be disabled via its option's disabled flag.",
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'labelPosition',
    description: 'Where each option label sits relative to its control.',
    type: "'left' | 'right' | 'top'",
    default: "'right'",
    example: 'labelPosition="left"',
  },
  {
    name: 'viewMode',
    description: "Render the selected option's label as plain text instead of the radio group.",
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: "Custom content shown in view mode; falls back to the selected option's label when omitted.",
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Pro (yearly)"',
  },
  {
    name: 'orientation',
    description: 'inline lays options out in a row; stacked in a column.',
    type: "'inline' | 'stacked'",
    default: "'inline'",
    example: 'orientation="stacked"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description:
      "Native change event when the selection changes — e.target.value is the selected option's value as a string.",
    type: 'ChangeEvent<HTMLInputElement>',
    example: 'onChange={(e) => setPlan(e.target.value)}',
  },
];

export default function RadioStories() {
  const [plan, setPlan] = useState('pro');

  const { register, control } = useForm<{ plan: string }>({
    defaultValues: { plan: 'free' },
  });
  const formPlan = useWatch({ control, name: 'plan' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Radio</h1>
        <p className="page-header__lead">
          A radio group driven by an <code>options</code> array of <code>{'{ label, value }'}</code>
          . Renders native radios, so it binds controlled (<code>value</code> +{' '}
          <code>onChange</code>) or by spreading react-hook-form's <code>register()</code>; lays
          out <code>inline</code> by default (or <code>stacked</code>), and supports{' '}
          <code>labelPosition</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="react-hook-form — register"
          description="Spread register() onto the group; the option whose value matches is selected."
          code={`const plans = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];
const { register, watch } = useForm({ defaultValues: { plan: 'free' } });

<LUIRadio options={plans} {...register('plan')} />`}
        >
          <div className="demo-col">
            <LUIRadio options={plans} {...register('plan')} />
            <p className="demo-readout">Selected: {formPlan}</p>
          </div>
        </Story>

        <Story
          title="Controlled — useState"
          description="Bind the group's value with value + onChange."
          code={`const [plan, setPlan] = useState('pro');

<LUIRadio
  name="plan-controlled"
  options={plans}
  value={plan}
  onChange={(e) => setPlan(e.target.value)}
/>`}
        >
          <div className="demo-col">
            <LUIRadio
              name="plan-controlled"
              options={plans}
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
            />
            <p className="demo-readout">Value: {plan}</p>
          </div>
        </Story>

        <Story
          title="Stacked"
          description="Switch to a vertical column with orientation='stacked'."
          code={`<LUIRadio name="plan-stacked" options={plans} orientation="stacked" />`}
        >
          <LUIRadio name="plan-stacked" options={plans} orientation="stacked" />
        </Story>

        <Story
          title="Label position"
          description="Place each option's label on the left or top of its control."
          code={`<LUIRadio name="plan-left" options={plans} labelPosition="left" />
<LUIRadio name="plan-top" options={plans} labelPosition="top" />`}
        >
          <div className="demo-col">
            <LUIRadio name="plan-left" options={plans} labelPosition="left" />
            <LUIRadio name="plan-top" options={plans} labelPosition="top" />
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Disable the whole group with disabled, or a single entry via the option's disabled flag."
          code={`<LUIRadio name="plan-disabled" options={plans} disabled />`}
        >
          <LUIRadio name="plan-disabled" options={plans} disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the selected option's label as plain text."
          code={'<LUIRadio label="Plan" options={plans} value="pro" viewMode />'}
        >
          <LUIRadio label="Plan" options={plans} value="pro" viewMode />
        </Story>

        <ApiTable
          component="LUIRadio"
          note="Renders one native input type=radio per option sharing the same name — name, onChange, onBlur and ref pass through to the native inputs, so spreading register() works on the group. Note: option values become native value attributes, so they reach react-hook-form as strings (coerce numbers back yourself)."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
