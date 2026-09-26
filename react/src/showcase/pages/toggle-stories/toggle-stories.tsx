import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LUIToggle } from '../../../components/ui/input/toggle/toggle';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './toggle-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered beside the switch.',
    type: 'string',
    default: "''",
    example: 'label="Wi-Fi"',
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
    description: 'Render the state as plain "Yes"/"No" text (from checked/defaultChecked) instead of the switch.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to "Yes"/"No" when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Enabled"',
  },
  {
    name: 'checked / defaultChecked',
    description: 'Controlled / uncontrolled checked state (native props).',
    type: 'boolean',
    default: '—',
    example: 'checked={enabled}',
  },
  {
    name: 'disabled',
    description: 'Disable the switch — non-interactive, reduced opacity.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'id',
    description: 'Id for the native input (the label wraps the input, so it is optional).',
    type: 'string',
    default: '—',
    example: 'id="wifi"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description:
      'Native change event whenever the user toggles the switch — read e.target.checked for the new state.',
    type: 'ChangeEvent<HTMLInputElement>',
    example: 'onChange={(e) => setEnabled(e.target.checked)}',
  },
];

export default function ToggleStories() {
  const [enabled, setEnabled] = useState(true);

  const { register, control } = useForm<{ email: boolean }>({
    defaultValues: { email: false },
  });
  const emailValue = useWatch({ control, name: 'email' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Toggle</h1>
        <p className="page-header__lead">
          A boolean switch built on the shared slider styles, over a native{' '}
          <code>input type="checkbox"</code>. Works controlled (<code>checked</code> +{' '}
          <code>onChange</code>) or uncontrolled with react-hook-form's <code>register()</code>, and
          the label can sit on either side via <code>labelPosition</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label sits on the right by default."
          code={`<LUIToggle label="Wi-Fi" />`}
        >
          <LUIToggle label="Wi-Fi" />
        </Story>

        <Story
          title="Label position"
          description="Place the label on the left, right or top of the switch."
          code={`<LUIToggle label="Left label" labelPosition="left" />
<LUIToggle label="Right label" labelPosition="right" />
<LUIToggle label="Top label" labelPosition="top" />`}
        >
          <div className="demo-row">
            <LUIToggle label="Left label" labelPosition="left" />
            <LUIToggle label="Right label" labelPosition="right" />
            <LUIToggle label="Top label" labelPosition="top" />
          </div>
        </Story>

        <Story
          title="Controlled — useState"
          description="Bind the checked state with checked + onChange."
          code={`const [enabled, setEnabled] = useState(true);

<LUIToggle
  label="Notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`}
        >
          <div className="demo-col">
            <LUIToggle
              label="Notifications"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
            />
            <p className="demo-readout">Value: {String(enabled)}</p>
          </div>
        </Story>

        <Story
          title="react-hook-form — register"
          description="Spread register() onto the toggle; the bound value is the boolean checked state."
          code={`const { register, watch } = useForm({ defaultValues: { email: false } });

<LUIToggle label="Email me" {...register('email')} />`}
        >
          <div className="demo-col">
            <LUIToggle label="Email me" {...register('email')} />
            <p className="demo-readout">Form value: {String(emailValue)}</p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={`<LUIToggle label="Disabled" disabled />`}
        >
          <LUIToggle label="Disabled" disabled />
        </Story>

        <Story
          title="View mode"
          description={'viewMode renders the state as plain "Yes"/"No" text; viewValue overrides it.'}
          code={`<LUIToggle label="Wi-Fi" checked viewMode />
<LUIToggle label="Bluetooth" viewMode />
<LUIToggle label="Status" checked viewMode viewValue="Enabled" />`}
        >
          <div className="demo-row">
            <LUIToggle label="Wi-Fi" checked viewMode />
            <LUIToggle label="Bluetooth" viewMode />
            <LUIToggle label="Status" checked viewMode viewValue="Enabled" />
          </div>
        </Story>

        <ApiTable
          component="LUIToggle"
          note="Wraps a native input type=checkbox — all native input props (name, checked, defaultChecked, onChange, onBlur, ref, …) pass through, so spreading react-hook-form's register() works directly; the bound value is the boolean checked state."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
