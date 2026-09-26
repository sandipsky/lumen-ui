import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LUINumberInput } from '../../../components/ui/input/number-input/number-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './number-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the input.',
    type: 'string',
    default: '—',
    example: 'label="Quantity"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="0"',
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
    example: 'id="price"',
  },
  {
    name: 'decimalPlaces',
    description:
      '0 forbids decimals (the dot key is blocked); a positive number rounds the value to that many places on blur; left unset, any number of decimals is allowed.',
    type: 'number',
    default: 'unset',
    example: 'decimalPlaces={2}',
  },
  {
    name: 'prefix',
    description: 'Display-only adornment before the value — never part of the stored value.',
    type: 'string',
    default: "''",
    example: 'prefix="Rs."',
  },
  {
    name: 'suffix',
    description: 'Display-only adornment after the value — never part of the stored value.',
    type: 'string',
    default: "''",
    example: 'suffix="%"',
  },
  {
    name: 'allowNegative',
    description: 'Allow typing negative numbers; off by default (the minus key is blocked).',
    type: 'boolean',
    default: 'false',
    example: 'allowNegative',
  },
  {
    name: 'allowZero',
    description:
      'Allow a value of 0. On by default; when off, typing a bare 0 is blocked and a 0 value clears on blur.',
    type: 'boolean',
    default: 'true',
    example: 'allowZero={false}',
  },
  {
    name: 'error',
    description: 'Validation message shown under the field; also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.price?.message}',
  },
  {
    name: 'viewMode',
    description: 'Render the value (with prefix/suffix) as plain text instead of the input.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the affixed value when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Rs. 1,500"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onValueChange',
    description:
      'Called with the parsed numeric value on every change — null while the field is empty or incomplete.',
    type: 'number | null',
    example: 'onValueChange={(v) => …}',
  },
  {
    name: 'onChange',
    description:
      'Native change handler (what register() uses) — the event target value is the cleaned numeric string.',
    type: 'ChangeEvent',
    example: 'onChange={(e) => …}',
  },
];

export default function NumberInputStories() {
  const [quantity, setQuantity] = useState<number | null>(1234567.891);
  const [amount, setAmount] = useState<number | null>(1234567);
  const [discount, setDiscount] = useState<number | null>(null);

  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm<{ price: number | null }>({ mode: 'onBlur' });
  const price = useWatch({ control, name: 'price' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Number Input</h1>
        <p className="page-header__lead">
          A numeric field with keystroke filtering — letters and symbols are blocked outright — and
          optional prefix and suffix shown as static, non-editable adornments that never change the
          stored value. onValueChange reports the parsed number.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Letters and symbols are blocked outright — only digits can be typed."
          code={`<LUINumberInput
  label="Quantity"
  defaultValue={1234567.891}
  onValueChange={(v) => setQuantity(v)}
/>`}
        >
          <div className="demo-col">
            <LUINumberInput
              label="Quantity"
              placeholder="0"
              defaultValue={1234567.891}
              onValueChange={setQuantity}
            />
            <p className="demo-readout">Value: {quantity ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Decimal places"
          description="0 forbids decimals (the dot key is blocked); a positive number rounds to that many places on blur; unset allows any."
          code={`<LUINumberInput label="Integer" decimalPlaces={0} />
<LUINumberInput label="Two places" decimalPlaces={2} />
<LUINumberInput label="Any" />`}
        >
          <div className="demo-col">
            <LUINumberInput label="Integer (0)" decimalPlaces={0} defaultValue={1234567} />
            <LUINumberInput label="Two places (2)" decimalPlaces={2} defaultValue="1234567.891" />
            <LUINumberInput label="Any (unset)" defaultValue="1234567.891" />
            <p className="demo-readout">Type a decimal and blur to see rounding.</p>
          </div>
        </Story>

        <Story
          title="Prefix & suffix"
          description="Display-only adornments that stay visible (and uneditable) while you type."
          code={`<LUINumberInput label="Amount" prefix="Rs." decimalPlaces={2} onValueChange={(v) => setAmount(v)} />
<LUINumberInput label="Discount" suffix="%" decimalPlaces={2} onValueChange={(v) => setDiscount(v)} />`}
        >
          <div className="demo-col">
            <LUINumberInput
              label="Amount"
              prefix="Rs."
              decimalPlaces={2}
              defaultValue={1234567}
              onValueChange={setAmount}
            />
            <LUINumberInput
              label="Discount"
              suffix="%"
              decimalPlaces={2}
              onValueChange={setDiscount}
            />
            <p className="demo-readout">
              Raw values — amount: {amount ?? '—'}, discount: {discount ?? '—'}
            </p>
          </div>
        </Story>

        <Story
          title="Allow negative"
          description="Off by default, so the minus key is blocked. Turn it on to permit negatives."
          code={'<LUINumberInput label="Temperature" allowNegative decimalPlaces={1} suffix="°C" />'}
        >
          <LUINumberInput label="Temperature" allowNegative decimalPlaces={1} suffix="°C" />
        </Story>

        <Story
          title="Disallow zero"
          description="With allowZero={false}, typing a bare 0 is blocked (use .5 for fractions below one)."
          code={'<LUINumberInput label="Headcount" allowZero={false} decimalPlaces={0} />'}
        >
          <LUINumberInput label="Headcount" allowZero={false} decimalPlaces={0} />
        </Story>

        <Story
          title="react-hook-form — register"
          description="Like any native input the form value is a string — use setValueAs to store a number, and error for the message."
          code={`const { register, formState: { errors } } = useForm({ mode: 'onBlur' });

<LUINumberInput
  label="Price"
  prefix="Rs."
  decimalPlaces={2}
  {...register('price', {
    required: 'Price is required.',
    setValueAs: (v) => (v === '' ? null : Number(v)),
  })}
  error={errors.price?.message}
/>`}
        >
          <div className="demo-col">
            <LUINumberInput
              label="Price"
              prefix="Rs."
              decimalPlaces={2}
              {...register('price', {
                required: 'Price is required.',
                setValueAs: (v) => (v === '' || v == null ? null : Number(v)),
              })}
              error={errors.price?.message}
            />
            <p className="demo-readout">
              valid: {String(isValid)} · value: {price ?? '—'}
            </p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={'<LUINumberInput label="Disabled" prefix="Rs." disabled />'}
        >
          <LUINumberInput label="Disabled" prefix="Rs." defaultValue={1234567} disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value — including prefix/suffix — as plain text."
          code={'<LUINumberInput label="Price" prefix="Rs. " value="1500" viewMode />'}
        >
          <LUINumberInput label="Price" prefix="Rs. " value="1500" viewMode />
        </Story>

        <ApiTable
          component="LUINumberInput"
          note="Renders a native text input with numeric keystroke filtering, so {...register('field')} works directly — but like any native input the form value is a string. Use onValueChange for the parsed number (or null while empty), or register(..., { setValueAs }). decimalPlaces formatting is applied to the field on blur."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
