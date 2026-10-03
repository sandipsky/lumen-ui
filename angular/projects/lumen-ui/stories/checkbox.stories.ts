import { FormsModule } from '@angular/forms';
import { Checkbox } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type CheckboxStoryArgs = Checkbox & { checked: boolean };

const meta: Meta<CheckboxStoryArgs> = {
  title: 'Form Inputs/Checkbox',
  component: Checkbox,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  args: {
    checked: false,
    label: 'Remember me',
    labelPosition: 'right',
    disabled: false,
    viewMode: false,
    change: fn(),
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Bound through `[(ngModel)]` (not an input) — the boolean checked state.',
    },
    label: {
      control: 'text',
      description: 'Label rendered beside the box.',
      table: { defaultValue: { summary: "''" } },
    },
    labelPosition: {
      control: 'inline-radio',
      options: ['left', 'right', 'top'],
      description: 'Where the label sits relative to the control.',
      table: { defaultValue: { summary: "'right'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox — non-interactive, reduced opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Id for the native input; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    viewMode: {
      control: 'boolean',
      description: 'Render the state as plain "Yes"/"No" text instead of the box.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to "Yes"/"No" when omitted.',
    },
    change: {
      action: 'change',
      description: 'Emits the new checked state whenever the box is toggled.',
    },
  },
  render: ({ checked, ...args }) => ({
    props: { ...args, checked },
    template: `<l-checkbox ${argsToTemplate(args)} [(ngModel)]="checked" />`,
  }),
};

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const LabelPosition: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start">
        <l-checkbox label="Left label" labelPosition="left" />
        <l-checkbox label="Right label" labelPosition="right" />
        <l-checkbox label="Top label" labelPosition="top" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px">
        <l-checkbox label="Unchecked" [disabled]="true" />
        <l-checkbox label="Checked" [ngModel]="true" [disabled]="true" />
      </div>
    `,
  }),
};

/** Plain "Yes"/"No" text; `viewValue` overrides it. */
export const ViewMode: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px">
        <l-checkbox label="Remember me" [ngModel]="true" [viewMode]="true" />
        <l-checkbox label="Subscribe" [viewMode]="true" />
        <l-checkbox label="Terms" [ngModel]="true" [viewMode]="true" viewValue="Agreed" />
      </div>
    `,
  }),
};
