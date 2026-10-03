import { FormsModule } from '@angular/forms';
import { Toggle } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type ToggleStoryArgs = Toggle & { checked: boolean };

const meta: Meta<ToggleStoryArgs> = {
  title: 'Form Inputs/Toggle',
  component: Toggle,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  args: {
    checked: true,
    label: 'Wi-Fi',
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
      description: 'Label rendered beside the switch.',
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
      description: 'Disable the switch — non-interactive, reduced opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Id for the native input; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    viewMode: {
      control: 'boolean',
      description: 'Render the state as plain "Yes"/"No" text instead of the switch.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to "Yes"/"No" when omitted.',
    },
    change: {
      action: 'change',
      description: 'Emits the new checked state whenever the user toggles the switch.',
    },
  },
  render: ({ checked, ...args }) => ({
    props: { ...args, checked },
    template: `<l-toggle ${argsToTemplate(args)} [(ngModel)]="checked" />`,
  }),
};

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const LabelPosition: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start">
        <l-toggle label="Left label" labelPosition="left" />
        <l-toggle label="Right label" labelPosition="right" />
        <l-toggle label="Top label" labelPosition="top" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px">
        <l-toggle label="Off" [disabled]="true" />
        <l-toggle label="On" [ngModel]="true" [disabled]="true" />
      </div>
    `,
  }),
};

/** Plain "Yes"/"No" text; `viewValue` overrides it. */
export const ViewMode: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px">
        <l-toggle label="Wi-Fi" [ngModel]="true" [viewMode]="true" />
        <l-toggle label="Bluetooth" [viewMode]="true" />
        <l-toggle label="Status" [ngModel]="true" [viewMode]="true" viewValue="Enabled" />
      </div>
    `,
  }),
};
