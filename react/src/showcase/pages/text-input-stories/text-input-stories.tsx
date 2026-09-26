import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LUITextInput } from '../../../components/ui/input/text-input/text-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './text-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the input.',
    type: 'string',
    default: '—',
    example: 'label="Full name"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="Jane Doe"',
  },
  {
    name: 'disabled',
    description: 'Disable the field (native prop).',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'id',
    description: 'Id for the native input; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'id="name"',
  },
  {
    name: 'error',
    description: 'Validation message shown under the field; also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.name?.message}',
  },
  {
    name: 'viewMode',
    description: 'Render the value as plain text (from value/defaultValue) instead of the input.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the value when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Jane D."',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onInput',
    description: 'Native input event, on every keystroke.',
    type: 'FormEvent',
    example: 'onInput={(e) => …}',
  },
  {
    name: 'onChange',
    description: "Native change handler — in React it fires on every keystroke (what register() uses).",
    type: 'ChangeEvent',
    example: 'onChange={(e) => …}',
  },
  {
    name: 'onKeyUp',
    description: 'Native keyup event.',
    type: 'KeyboardEvent',
    example: 'onKeyUp={(e) => …}',
  },
  {
    name: 'onKeyDown',
    description: 'Native keydown event.',
    type: 'KeyboardEvent',
    example: 'onKeyDown={(e) => …}',
  },
  {
    name: 'onKeyPress',
    description: 'Native keypress event (deprecated in the DOM — prefer onKeyDown).',
    type: 'KeyboardEvent',
    example: 'onKeyPress={(e) => …}',
  },
  {
    name: 'onEnter',
    description: 'Called when Enter is pressed in the field.',
    type: 'KeyboardEvent',
    example: 'onEnter={(e) => …}',
  },
];

export default function TextInputStories() {
  const [controlledValue, setControlledValue] = useState('');
  const [lastEvent, setLastEvent] = useState('—');

  const { register, control } = useForm<{ name: string }>();
  const rhfName = useWatch({ control, name: 'name' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Text Input</h1>
        <p className="page-header__lead">
          Single-line text field. Works uncontrolled with react-hook-form's register() and as a
          plain controlled component, and passes the native input events through.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label and placeholder."
          code={'<LUITextInput label="Full name" placeholder="Jane Doe" />'}
        >
          <LUITextInput label="Full name" placeholder="Jane Doe" />
        </Story>

        <Story
          title="Controlled"
          description="Bind the value with useState."
          code={`const [value, setValue] = useState('');

<LUITextInput
  label="Email"
  placeholder="you@example.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
        >
          <div className="demo-col">
            <LUITextInput
              label="Email"
              placeholder="you@example.com"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="demo-readout">Value: {controlledValue || '—'}</p>
          </div>
        </Story>

        <Story
          title="react-hook-form — register"
          description="Spread register() onto the field; name, onChange, onBlur and ref flow through as native props."
          code={`const { register, control } = useForm<{ name: string }>();

<LUITextInput label="Name" {...register('name')} />`}
        >
          <div className="demo-col">
            <LUITextInput label="Name" placeholder="Type something" {...register('name')} />
            <p className="demo-readout">Form value: {rhfName || '—'}</p>
          </div>
        </Story>

        <Story
          title="Error message"
          description="Pass a validation message via error to show the inline alert and error styling."
          code={'<LUITextInput label="Username" defaultValue="jane" error="Username is already taken." />'}
        >
          <div className="demo-col">
            <LUITextInput label="Username" defaultValue="jane" error="Username is already taken." />
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state via the native disabled prop."
          code={'<LUITextInput label="Disabled" placeholder="Can\'t type here" disabled />'}
        >
          <LUITextInput label="Disabled" placeholder="Can't type here" disabled />
        </Story>

        <Story
          title="Events"
          description="Native events pass through: onInput, onChange, onKeyUp, onKeyDown, onKeyPress — plus onEnter."
          code={`<LUITextInput
  label="Search"
  onInput={(e) => onInput(e)}
  onEnter={(e) => onEnter(e)}
/>`}
        >
          <div className="demo-col">
            <LUITextInput
              label="Search"
              placeholder="Type, then press Enter"
              onInput={() => setLastEvent('input')}
              onChange={() => setLastEvent('change')}
              onKeyUp={() => setLastEvent('keyup')}
              onKeyDown={() => setLastEvent('keydown')}
              onKeyPress={() => setLastEvent('keypress')}
              onEnter={() => setLastEvent('enter ⏎')}
            />
            <p className="demo-readout">Last event: {lastEvent}</p>
          </div>
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value as plain text — no input container. viewValue overrides what is displayed."
          code={`<LUITextInput label="Full name" value="Jane Doe" viewMode />
<LUITextInput label="Nickname" value="Jane Doe" viewMode viewValue="Janie" />`}
        >
          <div className="demo-col">
            <LUITextInput label="Full name" value="Jane Doe" viewMode />
            <LUITextInput label="Nickname" value="Jane Doe" viewMode viewValue="Janie" />
          </div>
        </Story>

        <ApiTable
          component="LUITextInput"
          note="Wraps a native input — all native props (name, value/defaultValue, onChange, onBlur, ref, …) pass through, so {...register('field')} works directly. The bound value is a string."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
