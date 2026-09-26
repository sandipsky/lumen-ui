import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUIOtpInput } from '../../../components/ui/input/otp-input/otp-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './otp-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'value',
    description: 'Controlled value — the concatenated string of all boxes.',
    type: 'string',
    default: '—',
    example: 'value={code}',
  },
  {
    name: 'length',
    description: 'Number of character boxes.',
    type: 'number',
    default: '6',
    example: 'length={4}',
  },
  {
    name: 'type',
    description: 'number restricts entry to digits; text allows any non-space character.',
    type: "'number' | 'text'",
    default: "'number'",
    example: 'type="text"',
  },
  {
    name: 'mask',
    description: 'Hide the entered characters as dots (PIN mode).',
    type: 'boolean',
    default: 'false',
    example: 'mask',
  },
  {
    name: 'size',
    description: 'Box size preset.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'size="lg"',
  },
  {
    name: 'disabled',
    description: 'Disable all boxes.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'error',
    description: 'Paint the boxes in the error color — e.g. after a failed verification.',
    type: 'boolean',
    default: 'false',
    example: 'error',
  },
  {
    name: 'autoFocus',
    description: 'Focus the first box on render.',
    type: 'boolean',
    default: 'false',
    example: 'autoFocus',
  },
  {
    name: 'separator',
    description: 'Render a dash between every box, e.g. 123-456.',
    type: 'boolean',
    default: 'false',
    example: 'separator',
  },
  {
    name: 'ariaLabel',
    description: 'Accessible label for the group of boxes.',
    type: 'string',
    default: "'One-time code'",
    example: 'ariaLabel="PIN"',
  },
  {
    name: 'name',
    description:
      'Base name for the native inputs (each box appends its index); auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'name="otp"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description: 'Called with the full concatenated value on every change.',
    type: 'string',
    example: 'onChange={(v) => setCode(v)}',
  },
  {
    name: 'onCompleted',
    description: 'Called with the value once every box is filled.',
    type: 'string',
    example: 'onCompleted={(v) => verify(v)}',
  },
  {
    name: 'onBlur',
    description:
      "Called when a box loses focus — wire to react-hook-form Controller's field.onBlur for touched state.",
    type: 'void',
    example: 'onBlur={field.onBlur}',
  },
];

export default function OtpInputStories() {
  const [code, setCode] = useState('');
  const [pin, setPin] = useState('');
  const [sized, setSized] = useState('');

  // Show / hide toggle demo — bind `mask` to state.
  const [secret, setSecret] = useState('');
  const [masked, setMasked] = useState(true);

  const [lastCompleted, setLastCompleted] = useState('');

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">OTP / PIN Input</h1>
        <p className="page-header__lead">
          A row of single-character boxes for one-time codes and PINs, in the spirit of Ant
          Design's <code>Input.OTP</code> and Mantine's <code>PinInput</code>. Typing advances to
          the next box, Backspace walks back, arrow keys move between boxes, and pasting a code
          distributes it across them. Set <code>mask</code> to hide the entered characters,{' '}
          <code>type="number"</code> to restrict to digits, and bind with <code>value</code> +{' '}
          <code>onChange</code> (wrap in a react-hook-form <code>Controller</code> for forms).
          Sizes <code>sm</code> / <code>md</code> / <code>lg</code>, error state, and an optional
          separator are built in.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Six digit boxes bound with value + onChange. onCompleted fires once every box is filled."
          code={`const [code, setCode] = useState('');

<LUIOtpInput length={6} value={code} onChange={setCode} onCompleted={onCompleted} />`}
        >
          <div className="demo-col">
            <LUIOtpInput
              length={6}
              value={code}
              onChange={setCode}
              onCompleted={setLastCompleted}
            />
            <p className="demo-readout">Value: {code || '—'}</p>
            {lastCompleted && <p className="demo-readout">Completed: {lastCompleted}</p>}
          </div>
        </Story>

        <Story
          title="Masked (PIN)"
          description="mask hides the characters as dots — for PINs and secrets."
          code={`<LUIOtpInput length={4} mask type="number" value={pin} onChange={setPin} />`}
        >
          <LUIOtpInput length={4} mask type="number" value={pin} onChange={setPin} />
        </Story>

        <Story
          title="Show / hide toggle"
          description="Bind mask to state to let users reveal what they typed."
          code={`const [masked, setMasked] = useState(true);

<LUIOtpInput length={6} mask={masked} value={secret} onChange={setSecret} />
<LUIButton variant="ghost" onClick={() => setMasked((m) => !m)}>…</LUIButton>`}
        >
          <div className="demo-row">
            <LUIOtpInput length={6} mask={masked} value={secret} onChange={setSecret} />
            <LUIButton variant="outlined" size="sm" onClick={() => setMasked((m) => !m)}>
              {masked ? 'Show' : 'Hide'}
            </LUIButton>
          </div>
        </Story>

        <Story
          title="Sizes"
          description="sm, md (default) and lg."
          code={`<LUIOtpInput size="sm" length={4} />
<LUIOtpInput size="md" length={4} />
<LUIOtpInput size="lg" length={4} />`}
        >
          <div className="demo-col">
            <LUIOtpInput size="sm" length={4} value={sized} onChange={setSized} />
            <LUIOtpInput size="md" length={4} value={sized} onChange={setSized} />
            <LUIOtpInput size="lg" length={4} value={sized} onChange={setSized} />
          </div>
        </Story>

        <Story
          title="With separator"
          description="separator drops a dash between every box, e.g. 123-456."
          code={`<LUIOtpInput length={6} separator />`}
        >
          <LUIOtpInput length={6} separator />
        </Story>

        <Story
          title="Error"
          description="error paints the boxes in the error color — e.g. after a failed verification."
          code={`<LUIOtpInput length={6} error value={code} onChange={setCode} />`}
        >
          <LUIOtpInput length={6} error value={code} onChange={setCode} />
        </Story>

        <Story
          title="Disabled"
          description="disabled blocks all input."
          code={`<LUIOtpInput length={6} disabled />`}
        >
          <LUIOtpInput length={6} disabled />
        </Story>

        <ApiTable
          component="LUIOtpInput"
          note="A controlled component: pass value and onChange(value) — the bound value is the concatenated string of all boxes, with empty boxes contributing nothing. With react-hook-form, wrap it in a <Controller> and wire field.value / field.onChange / field.onBlur."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
