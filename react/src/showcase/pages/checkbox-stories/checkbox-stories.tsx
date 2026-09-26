import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LUICheckbox } from '../../../components/ui/input/checkbox/checkbox';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './checkbox-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered beside the box.',
    type: 'string',
    default: "''",
    example: 'label="Remember me"',
  },
  {
    name: 'labelPosition',
    description: 'Where the label sits relative to the control.',
    type: "'left' | 'right' | 'top'",
    default: "'right'",
    example: 'labelPosition="left"',
  },
  {
    name: 'viewMode',
    description: 'Render the state as plain "Yes"/"No" text (from checked/defaultChecked) instead of the box.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to "Yes"/"No" when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Agreed"',
  },
  {
    name: 'checked / defaultChecked',
    description: 'Controlled / uncontrolled checked state (native props).',
    type: 'boolean',
    default: '—',
    example: 'checked={agreed}',
  },
  {
    name: 'disabled',
    description: 'Disable the checkbox — non-interactive, reduced opacity.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'id',
    description: 'Id for the native input (the label wraps the input, so it is optional).',
    type: 'string',
    default: '—',
    example: 'id="terms"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description:
      'Native change event whenever the box is toggled — read e.target.checked for the new state.',
    type: 'ChangeEvent<HTMLInputElement>',
    example: 'onChange={(e) => setChecked(e.target.checked)}',
  },
];

export default function CheckboxStories() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    formState: { isValid },
  } = useForm<{ terms: boolean }>({
    mode: 'onChange',
    defaultValues: { terms: false },
  });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Checkbox</h1>
        <p className="page-header__lead">
          A custom-styled boolean checkbox over a native <code>input type="checkbox"</code>. Works
          controlled (<code>checked</code> + <code>onChange</code>) or uncontrolled — spreading
          react-hook-form's <code>register()</code> works directly — and supports{' '}
          <code>labelPosition</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label sits on the right by default."
          code={`<LUICheckbox label="Remember me" />`}
        >
          <LUICheckbox label="Remember me" />
        </Story>

        <Story
          title="Label position"
          description="Place the label on the left, right or top of the box."
          code={`<LUICheckbox label="Left label" labelPosition="left" />
<LUICheckbox label="Right label" labelPosition="right" />
<LUICheckbox label="Top label" labelPosition="top" />`}
        >
          <div className="demo-row">
            <LUICheckbox label="Left label" labelPosition="left" />
            <LUICheckbox label="Right label" labelPosition="right" />
            <LUICheckbox label="Top label" labelPosition="top" />
          </div>
        </Story>

        <Story
          title="Controlled — useState"
          description="Bind the checked state with checked + onChange."
          code={`const [subscribed, setSubscribed] = useState(false);

<LUICheckbox
  label="Subscribe"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>`}
        >
          <div className="demo-col">
            <LUICheckbox
              label="Subscribe to the newsletter"
              checked={subscribed}
              onChange={(event) => setSubscribed(event.target.checked)}
            />
            <p className="demo-readout">Value: {String(subscribed)}</p>
          </div>
        </Story>

        <Story
          title="react-hook-form — required"
          description="Spread register() onto the checkbox; require it to be checked for the form to be valid."
          code={`const { register, formState: { isValid } } = useForm({
  mode: 'onChange',
  defaultValues: { terms: false },
});

<LUICheckbox label="I accept the terms" {...register('terms', { required: true })} />`}
        >
          <div className="demo-col">
            <LUICheckbox label="I accept the terms" {...register('terms', { required: true })} />
            <p className="demo-readout">valid: {String(isValid)}</p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={`<LUICheckbox label="Disabled" disabled />`}
        >
          <LUICheckbox label="Disabled" disabled />
        </Story>

        <Story
          title="View mode"
          description={'viewMode renders the state as plain "Yes"/"No" text.'}
          code={`<LUICheckbox label="Remember me" checked viewMode />
<LUICheckbox label="Subscribe" viewMode />`}
        >
          <div className="demo-row">
            <LUICheckbox label="Remember me" checked viewMode />
            <LUICheckbox label="Subscribe" viewMode />
          </div>
        </Story>

        <ApiTable
          component="LUICheckbox"
          note="Wraps a native input type=checkbox — all native input props (name, checked, defaultChecked, onChange, onBlur, ref, …) pass through, so spreading react-hook-form's register() works directly; the bound value is the boolean checked state."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
