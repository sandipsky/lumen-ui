import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LUITextarea } from '../../../components/ui/input/textarea/textarea';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './textarea-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the textarea.',
    type: 'string',
    default: '—',
    example: 'label="Message"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="Write something…"',
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
    description: 'Id for the native textarea; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'id="bio"',
  },
  {
    name: 'rows',
    description: 'Visible rows before the field scrolls (native prop).',
    type: 'number',
    default: '4',
    example: 'rows={8}',
  },
  {
    name: 'resizable',
    description: 'Show the drag-to-resize handle (vertical only).',
    type: 'boolean',
    default: 'false',
    example: 'resizable',
  },
  {
    name: 'error',
    description: 'Validation message shown under the field; also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.bio?.message}',
  },
  {
    name: 'viewMode',
    description: 'Render the value as plain text (line breaks preserved) instead of the textarea.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the value when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="(redacted)"',
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
    description: 'Called when Enter is pressed (a newline is still inserted).',
    type: 'KeyboardEvent',
    example: 'onEnter={(e) => …}',
  },
];

const bioSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
});

type BioForm = z.infer<typeof bioSchema>;

export default function TextareaStories() {
  const [controlledValue, setControlledValue] = useState('');

  const {
    register,
    formState: { errors, isValid },
  } = useForm<BioForm>({ resolver: zodResolver(bioSchema), mode: 'onBlur' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Textarea</h1>
        <p className="page-header__lead">
          Multi-line text field. Works uncontrolled with react-hook-form's register() and as a
          plain controlled component, and supports a configurable rows count.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label, placeholder and a default of 4 rows."
          code={'<LUITextarea label="Message" placeholder="Write something…" />'}
        >
          <LUITextarea label="Message" placeholder="Write something…" />
        </Story>

        <Story
          title="Rows"
          description="Set the visible height with rows."
          code={'<LUITextarea label="Notes" rows={8} />'}
        >
          <LUITextarea label="Notes" placeholder="Taller field" rows={8} />
        </Story>

        <Story
          title="Resizable"
          description="The drag-to-resize handle is hidden by default; enable it with resizable."
          code={'<LUITextarea label="Feedback" resizable />'}
        >
          <LUITextarea label="Feedback" placeholder="Drag the bottom-right corner" resizable />
        </Story>

        <Story
          title="Controlled"
          description="Bind the value with useState."
          code={`const [value, setValue] = useState('');

<LUITextarea label="Bio" value={value} onChange={(e) => setValue(e.target.value)} />`}
        >
          <div className="demo-col">
            <LUITextarea
              label="Bio"
              placeholder="Tell us about yourself"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="demo-readout">Length: {controlledValue.length}</p>
          </div>
        </Story>

        <Story
          title="Validation — react-hook-form + zod"
          description="min(10); the message surfaces via the error prop once the field is touched."
          code={`const schema = z.object({ bio: z.string().min(10, 'Bio must be at least 10 characters.') });
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur',
});

<LUITextarea label="Bio" {...register('bio')} error={errors.bio?.message} />`}
        >
          <div className="demo-col">
            <LUITextarea
              label="Bio"
              placeholder="At least 10 characters"
              {...register('bio')}
              error={errors.bio?.message}
            />
            <p className="demo-readout">valid: {String(isValid)}</p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={'<LUITextarea label="Disabled" disabled />'}
        >
          <LUITextarea label="Disabled" placeholder="Can't type here" disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value as plain text with line breaks preserved."
          code={'<LUITextarea label="Bio" value={"First line.\\nSecond line."} viewMode />'}
        >
          <LUITextarea label="Bio" value={'First line.\nSecond line.'} viewMode />
        </Story>

        <ApiTable
          component="LUITextarea"
          note="Wraps a native textarea — all native props (name, value/defaultValue, onChange, onBlur, ref, rows, …) pass through, so {...register('field')} works directly. The bound value is a string."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
