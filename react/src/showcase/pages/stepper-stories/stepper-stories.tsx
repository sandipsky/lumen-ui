import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUITextInput } from '../../../components/ui/input/text-input/text-input';
import { LUIStepper, type Step } from '../../../components/ui/stepper/stepper';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './stepper-stories.css';

const basicSteps: Step[] = [
  { title: 'First step', description: 'Create an account' },
  { title: 'Second step', description: 'Verify email' },
  { title: 'Final step', description: 'Get full access' },
];

const errorSteps: Step[] = [
  { title: 'Shipping', description: 'Address confirmed' },
  { title: 'Payment', description: 'Card was declined', error: true },
  { title: 'Confirm', description: 'Place the order' },
];

const iconSteps: Step[] = [
  { title: 'Cart', icon: '🛒' },
  { title: 'Address', icon: '📦' },
  { title: 'Payment', icon: '💳' },
  { title: 'Complete', icon: '🎉' },
];

const wizardSteps: Step[] = [
  { title: 'Details', description: 'Your information' },
  { title: 'Address', description: 'Where to ship' },
  { title: 'Payment', description: 'How you pay' },
  { title: 'Review', description: 'Confirm & submit' },
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'steps',
    description: 'The ordered steps to render.',
    type: 'Step[]',
    default: '[]',
    example: 'steps={steps}',
  },
  {
    name: 'active',
    description:
      'Index of the current step. Angular model() — omit for internal state (click-driven), or pair with onActiveChange for controlled usage.',
    type: 'number',
    default: '0',
    example: 'active={current}',
  },
  {
    name: 'orientation',
    description: 'Lay the steps out in a row or stacked vertically.',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    example: 'orientation="vertical"',
  },
  {
    name: 'showLines',
    description: 'Show the connecting rails between steps. Steps stay spaced either way.',
    type: 'boolean',
    default: 'true',
    example: 'showLines={false}',
  },
  {
    name: 'clickable',
    description: 'Allow the user to click a step to jump to it.',
    type: 'boolean',
    default: 'false',
    example: 'clickable',
  },
  {
    name: 'allowStepSkip',
    description:
      'When clickable, also allow selecting steps ahead of the active one (skip forward).',
    type: 'boolean',
    default: 'false',
    example: 'allowStepSkip',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onActiveChange',
    description: 'Fires with the new index when the active step changes (controlled-usage half of active).',
    type: 'number',
    example: 'onActiveChange={setCurrent}',
  },
  {
    name: 'onStepChange',
    description: 'Fires the target index when a step is selected (only fires when selectable).',
    type: 'number',
    example: 'onStepChange={(i) => onStep(i)}',
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StepperStories() {
  // ── Clickable ──────────────────────────────────────────────────
  const [current, setCurrent] = useState(1);

  // ── External button control ────────────────────────────────────
  const [wizardStep, setWizardStep] = useState(0);

  const next = () => setWizardStep((i) => Math.min(wizardSteps.length - 1, i + 1));
  const back = () => setWizardStep((i) => Math.max(0, i - 1));

  // ── Form validation ────────────────────────────────────────────
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [formStep, setFormStep] = useState(0);
  const [attempted, setAttempted] = useState<ReadonlySet<number>>(new Set());

  const emailValid = EMAIL_RE.test(email);

  const isStepValid = (index: number): boolean => {
    if (index === 0) return name.trim().length > 0 && emailValid;
    if (index === 1) return username.trim().length >= 3;
    return true;
  };

  const formSteps: Step[] = [
    {
      title: 'Account',
      description: 'Name & email',
      error: attempted.has(0) && !isStepValid(0),
    },
    {
      title: 'Profile',
      description: 'Pick a username',
      error: attempted.has(1) && !isStepValid(1),
    },
    { title: 'Done', description: 'All set 🎉' },
  ];

  const formNext = () => {
    if (!isStepValid(formStep)) {
      setAttempted((prev) => new Set(prev).add(formStep));
      return;
    }
    setFormStep((i) => Math.min(formSteps.length - 1, i + 1));
  };

  const formBack = () => setFormStep((i) => Math.max(0, i - 1));

  return (
    <div className="story-page stepper-stories">
      <header className="page-header">
        <h1 className="page-header__title">Stepper</h1>
        <p className="page-header__lead">
          A progress indicator for multi-step flows, styled after Mantine's stepper — the indicator
          sits inline with a title/description and connecting rails run between steps. Pass an
          array of <code>{'{ title, description, icon?, error?, completed? }'}</code> steps and the{' '}
          <code>active</code> index. Steps before the active one show a checkmark in the success
          color; steps flagged <code>error</code> turn red with an alert mark. Drive{' '}
          <code>active</code> from clickable steps or from external buttons via{' '}
          <code>active</code> + <code>onActiveChange</code>. Lay it out <code>horizontal</code>{' '}
          (default) or <code>vertical</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Steps before the active index are completed (checkmark + success color); the rest show their number, with rails connecting them."
          code={`const steps = [
  { title: 'First step', description: 'Create an account' },
  { title: 'Second step', description: 'Verify email' },
  { title: 'Final step', description: 'Get full access' },
];

<LUIStepper steps={steps} active={1} />`}
        >
          <LUIStepper steps={basicSteps} active={1} />
        </Story>

        <Story
          title="Error state"
          description="Flag a step with error: true to mark its section invalid — it turns red with an alert mark."
          code={`const steps = [
  { title: 'Shipping', description: 'Address confirmed' },
  { title: 'Payment', description: 'Card was declined', error: true },
  { title: 'Confirm', description: 'Place the order' },
];

<LUIStepper steps={steps} active={1} />`}
        >
          <LUIStepper steps={errorSteps} active={1} />
        </Story>

        <Story
          title="Custom icons"
          description="Provide an icon per step to replace the number. Completed steps still swap to a checkmark."
          code={`const steps = [
  { title: 'Cart', icon: '🛒' },
  { title: 'Address', icon: '📦' },
  { title: 'Payment', icon: '💳' },
  { title: 'Complete', icon: '🎉' },
];

<LUIStepper steps={steps} active={2} />`}
        >
          <LUIStepper steps={iconSteps} active={2} />
        </Story>

        <Story
          title="Vertical"
          description="orientation='vertical' stacks the steps with a connecting rail down the indicators."
          code={`<LUIStepper steps={steps} orientation="vertical" active={1} />`}
        >
          <LUIStepper steps={basicSteps} orientation="vertical" active={1} />
        </Story>

        <Story
          title="Without lines"
          description="showLines={false} hides the connecting rails while keeping the steps evenly spaced."
          code={`<LUIStepper steps={steps} showLines={false} active={1} />`}
        >
          <LUIStepper steps={basicSteps} showLines={false} active={1} />
        </Story>

        <Story
          title="Clickable"
          description="clickable lets the user click a step to jump to it. By default only reached steps are selectable — add allowStepSkip to allow skipping ahead."
          code={`<LUIStepper steps={steps} clickable allowStepSkip active={current} onActiveChange={setCurrent} />`}
        >
          <div className="demo-col">
            <LUIStepper
              steps={basicSteps}
              clickable
              allowStepSkip
              active={current}
              onActiveChange={setCurrent}
            />
            <p className="demo-readout">Active step: {current + 1}</p>
          </div>
        </Story>

        <Story
          title="External button control"
          description="active was a two-way model in Angular — drive it from Next / Back buttons instead of (or alongside) clicking steps."
          code={`const [wizardStep, setWizardStep] = useState(0);
const next = () => setWizardStep((i) => Math.min(3, i + 1));
const back = () => setWizardStep((i) => Math.max(0, i - 1));

<LUIStepper steps={steps} active={wizardStep} onActiveChange={setWizardStep} />`}
        >
          <div className="demo-col">
            <LUIStepper steps={wizardSteps} active={wizardStep} onActiveChange={setWizardStep} />
            <div className="demo-actions">
              <LUIButton variant="outlined" disabled={wizardStep === 0} onClick={back}>
                Back
              </LUIButton>
              <LUIButton disabled={wizardStep === wizardSteps.length - 1} onClick={next}>
                Next
              </LUIButton>
            </div>
          </div>
        </Story>

        <Story
          title="Form validation"
          description="Each step guards a form section. Clicking Next validates the current step; if it fails, the step is flagged error and navigation is blocked."
          code={`const isStepValid = (i) => { /* validate the section's fields */ };

const formNext = () => {
  if (!isStepValid(formStep)) {
    setAttempted((s) => new Set(s).add(formStep)); // drives error: true
    return;
  }
  setFormStep((n) => Math.min(2, n + 1));
};`}
        >
          <div className="demo-col">
            <LUIStepper steps={formSteps} active={formStep} onActiveChange={setFormStep} />

            <div className="form-panel">
              {formStep === 0 && (
                <>
                  <LUITextInput
                    label="Full name"
                    placeholder="Ada Lovelace"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <LUITextInput
                    label="Email"
                    placeholder="ada@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              )}
              {formStep === 1 && (
                <LUITextInput
                  label="Username"
                  placeholder="at least 3 characters"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              {formStep === 2 && <p className="demo-readout">All steps valid — ready to submit ✅</p>}
            </div>

            <div className="demo-actions">
              <LUIButton variant="outlined" disabled={formStep === 0} onClick={formBack}>
                Back
              </LUIButton>
              <LUIButton disabled={formStep === formSteps.length - 1} onClick={formNext}>
                Next
              </LUIButton>
            </div>
          </div>
        </Story>

        <ApiTable
          component="LUIStepper"
          note="Step = { title, description?, icon?, error?, completed?, disabled? }. Steps before the active index show a checkmark, error steps an alert mark; a step's icon replaces its number otherwise. active works uncontrolled (omit the prop) or controlled via active + onActiveChange."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
