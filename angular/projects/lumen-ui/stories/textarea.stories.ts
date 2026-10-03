import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Textarea } from '@lumen-ui/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { fn } from 'storybook/test';

type TextareaStoryArgs = Textarea & { value: string };

const meta: Meta<TextareaStoryArgs> = {
  title: 'Form Inputs/Textarea',
  component: Textarea,
  decorators: [
    moduleMetadata({ imports: [FormsModule] }),
    componentWrapperDecorator((story) => `<div style="max-width: 360px">${story}</div>`),
  ],
  args: {
    value: '',
    label: 'Message',
    placeholder: 'Write something…',
    disabled: false,
    rows: 4,
    resizable: false,
    viewMode: false,
    input: fn(),
    change: fn(),
    keyup: fn(),
    keydown: fn(),
    keypress: fn(),
    enter: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Bound through `[(ngModel)]` (not an input) — the bound value is a string.',
    },
    label: {
      control: 'text',
      description: 'Label rendered above the field, linked to the textarea.',
      table: { defaultValue: { summary: "''" } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown while the field is empty.',
      table: { defaultValue: { summary: "''" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the field; binding a disabled FormControl does the same.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Id for the native textarea; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    rows: {
      control: 'number',
      description: 'Visible rows before the field scrolls.',
      table: { defaultValue: { summary: '4' } },
    },
    resizable: {
      control: 'boolean',
      description: 'Show the drag-to-resize handle (vertical only).',
      table: { defaultValue: { summary: 'false' } },
    },
    viewMode: {
      control: 'boolean',
      description:
        'Render the value as plain text (line breaks preserved) instead of the textarea.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to the value when omitted.',
    },
    input: { action: 'input', description: 'Emits the native input event on every keystroke.' },
    change: {
      action: 'change',
      description: 'Re-emits the native change event when the value is committed (on blur).',
    },
    keyup: { action: 'keyup', description: 'Re-emits the native keyup event.' },
    keydown: { action: 'keydown', description: 'Re-emits the native keydown event.' },
    keypress: { action: 'keypress', description: 'Re-emits the native keypress event.' },
    enter: {
      action: 'enter',
      description: 'Emits when Enter is pressed (a newline is still inserted).',
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-textarea ${argsToTemplate(args)} [(ngModel)]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Rows: Story = {
  args: { label: 'Notes', placeholder: 'Taller field', rows: 8 },
};

/** The drag-to-resize handle is hidden by default. */
export const Resizable: Story = {
  args: { label: 'Feedback', placeholder: 'Drag the bottom-right corner', resizable: true },
};

/**
 * Errors come from the bound control: the FormValidation directive shows the message once the
 * control is touched. This one is pre-touched so the error is visible straight away.
 */
export const WithError: Story = {
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule] })],
  render: () => {
    const bio = new FormControl('Too short', [Validators.required, Validators.minLength(10)]);
    bio.markAsTouched();
    return {
      props: { bio },
      template: `<l-textarea label="Bio" placeholder="At least 10 characters" [formControl]="bio" />`,
    };
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: "Can't type here", disabled: true },
};

/** Renders the value as plain text with line breaks preserved. */
export const ViewMode: Story = {
  args: { label: 'Bio', value: 'First line.\nSecond line.', viewMode: true },
};
