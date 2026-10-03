import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  LUIButton,
  LUIConfirmDialog,
  useLUIModal,
  type ConfirmDialogData,
  type ModalAnimation,
  type ModalConfig,
  type ModalRef,
} from '@lumen-ui/react';

type ModalStoryArgs = Omit<ModalConfig, 'data'> &
  Omit<ConfirmDialogData, 'onConfirm'> & {
    body?: string;
    simulateAsync?: boolean;
    afterClosed?: (result: unknown) => void;
  };

const ANIMATIONS: ModalAnimation[] = [
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'fade',
  'zoom',
  'none',
];

const CONFIRM_ARGS: (keyof ModalStoryArgs)[] = [
  'title',
  'message',
  'confirmText',
  'cancelText',
  'confirmVariant',
  'simulateAsync',
  'afterClosed',
];

const titleStyle = {
  margin: '0 0 8px',
  fontSize: 18,
  fontWeight: 700,
  color: 'var(--text-primary)',
};
const bodyStyle = {
  margin: '0 0 20px',
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--text-secondary)',
};

/** Content for the demo modals (the panel has no padding of its own). */
const demoContent = (ref: ModalRef, title?: string, body?: string) => (
  <div style={{ width: 420, maxWidth: '100%', padding: 24 }}>
    <h2 style={titleStyle}>{title}</h2>
    <p style={bodyStyle}>{body}</p>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <LUIButton variant="outlined" onClick={() => ref.close(false)}>
        Cancel
      </LUIButton>
      <LUIButton onClick={() => ref.close(true)}>Got it</LUIButton>
    </div>
  </div>
);

/** Returns an opener that shows the demo content with the given options and logs the result. */
function useDemoModal() {
  const modal = useLUIModal();
  return ({ title, body, afterClosed, ...config }: ModalStoryArgs) => {
    const ref = modal.open((ref) => demoContent(ref, title, body), config);
    void ref.afterClosed().then(afterClosed);
  };
}

const meta: Meta<ModalStoryArgs> = {
  title: 'Overlays & Feedback/Modal',
  parameters: {
    docs: {
      description: {
        component:
          'Opened imperatively with the `useLUIModal()` hook (needs `<LUIProvider>` or ' +
          '`<LUIModalProvider>` above it): `open(content, config)` returns a `ModalRef` ' +
          '(`close(result)`, `afterClosed()`). Content is JSX, or a render function that ' +
          'receives the `ModalRef` so it can close itself. The controls are the `ModalConfig` ' +
          'options — click the button to open a modal with them.',
      },
    },
  },
  args: {
    title: 'Welcome to LumenUI',
    body: 'Click the backdrop, press Esc, or use the buttons below to close it.',
    maxWidth: '90vw',
    backdrop: true,
    disableClose: false,
    animation: 'slideUp',
    animationDuration: 250,
    afterClosed: fn(),
  },
  argTypes: {
    title: { control: 'text', description: 'Demo content rendered inside the panel.' },
    body: { control: 'text', description: 'Demo content rendered inside the panel.' },
    width: {
      control: 'text',
      description: "Panel width, e.g. `'40vw'`, `'500px'`. Still capped by `maxWidth`.",
      table: { defaultValue: { summary: 'auto (fits content)' } },
    },
    height: {
      control: 'text',
      description: 'Panel height.',
      table: { defaultValue: { summary: 'auto (fits content)' } },
    },
    maxWidth: {
      control: 'text',
      description: 'Panel max width — an explicit width is still capped by it.',
      table: { defaultValue: { summary: "'90vw'" } },
    },
    panelClass: {
      control: 'text',
      description: 'Extra class(es) applied to the panel element.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    backdrop: {
      control: 'boolean',
      description: 'Render the dimmed backdrop behind the panel.',
      table: { defaultValue: { summary: 'true' } },
    },
    disableClose: {
      control: 'boolean',
      description: 'Prevent closing on backdrop click / Escape key.',
      table: { defaultValue: { summary: 'false' } },
    },
    animation: {
      control: 'select',
      options: ANIMATIONS,
      description: 'Entry/leave animation — applied to both transitions.',
      table: { defaultValue: { summary: "'slideUp'" } },
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds.',
      table: { defaultValue: { summary: '250' } },
    },
    afterClosed: {
      description:
        'Logs the result `ModalRef.afterClosed()` resolves with once the leave animation ' +
        'finishes (`undefined` for backdrop / Esc).',
    },
  },
  render: function Render(args) {
    const openDemo = useDemoModal();
    return <LUIButton onClick={() => openDemo(args)}>Open modal</LUIButton>;
  },
};

export default meta;
type Story = StoryObj<ModalStoryArgs>;

/** Every `ModalConfig` option is wired to a control — set them, then open the modal. */
export const Playground: Story = {};

/** Applied to both the enter and leave transitions. */
export const Animations: Story = {
  render: function Render() {
    const openDemo = useDemoModal();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ANIMATIONS.map((animation) => (
          <LUIButton
            key={animation}
            variant="secondary"
            onClick={() =>
              openDemo({
                animation,
                title: `Animation: ${animation}`,
                body: 'Both the enter and leave transitions use this animation.',
              })
            }
          >
            {animation}
          </LUIButton>
        ))}
      </div>
    );
  },
};

/** An explicit `width` is still capped by `maxWidth` (90vw by default). */
export const Sizing: Story = {
  render: function Render() {
    const openDemo = useDemoModal();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['360px', '640px', '80vw'].map((width) => (
          <LUIButton
            key={width}
            variant="outlined"
            onClick={() =>
              openDemo({
                width,
                title: `Width: ${width}`,
                body: 'The panel still caps at maxWidth (90vw by default).',
              })
            }
          >
            {width}
          </LUIButton>
        ))}
      </div>
    );
  },
};

/** Hide the backdrop, or ignore backdrop clicks and Esc so the user has to pick a button. */
export const BackdropAndClose: Story = {
  name: 'Backdrop & close behavior',
  render: function Render() {
    const openDemo = useDemoModal();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <LUIButton
          variant="outlined"
          onClick={() =>
            openDemo({
              backdrop: false,
              title: 'No backdrop',
              body: 'The page behind stays visible — only the panel floats above it.',
            })
          }
        >
          No backdrop
        </LUIButton>
        <LUIButton
          variant="outlined"
          onClick={() =>
            openDemo({
              disableClose: true,
              title: 'Disabled close',
              body: 'Backdrop clicks and Esc are ignored — you must use a button below.',
            })
          }
        >
          Disable close
        </LUIButton>
      </div>
    );
  },
};

/**
 * The bundled `LUIConfirmDialog` is opened as content:
 * `modal.open((ref) => <LUIConfirmDialog modalRef={ref} data={…} />)`.
 * `afterClosed()` resolves to `true` or `false`.
 */
export const ConfirmDialog: Story = {
  args: {
    title: 'Delete project?',
    message: 'This permanently removes the project and all of its data. This cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmVariant: 'danger',
    simulateAsync: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog heading.',
      table: { defaultValue: { summary: "'Confirm'" } },
    },
    message: {
      control: 'text',
      description: 'Body text.',
      table: { defaultValue: { summary: "'Are you sure?'" } },
    },
    confirmText: {
      control: 'text',
      description: 'Confirm button label.',
      table: { defaultValue: { summary: "'Delete'" } },
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button label.',
      table: { defaultValue: { summary: "'Cancel'" } },
    },
    confirmVariant: {
      control: 'inline-radio',
      options: ['primary', 'danger'],
      description: 'Variant of the confirm button — `danger` for destructive actions.',
      table: { defaultValue: { summary: "'danger'" } },
    },
    simulateAsync: {
      control: 'boolean',
      description:
        'Story only — pass an `onConfirm` Promise (a fake 1.2s request). The dialog shows a ' +
        'loading state and only closes once it resolves; on rejection it stays open.',
    },
    afterClosed: {
      description: 'Logs `true` (confirmed), `false` (cancelled) or `undefined` (backdrop / Esc).',
    },
  },
  parameters: { controls: { include: CONFIRM_ARGS } },
  render: function Render({ simulateAsync, afterClosed, ...data }) {
    const modal = useLUIModal();
    const [result, setResult] = useState('—');

    const open = () => {
      const ref = modal.open<boolean>((ref) => (
        <LUIConfirmDialog
          modalRef={ref}
          data={{
            title: data.title,
            message: data.message,
            confirmText: data.confirmText,
            cancelText: data.cancelText,
            confirmVariant: data.confirmVariant,
            onConfirm: simulateAsync
              ? () => new Promise((resolve) => setTimeout(resolve, 1200))
              : undefined,
          }}
        />
      ));
      void ref.afterClosed().then((ok) => {
        setResult(ok ? 'Confirmed' : 'Cancelled');
        afterClosed?.(ok);
      });
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LUIButton variant={data.confirmVariant ?? 'danger'} onClick={open}>
          Open confirm dialog
        </LUIButton>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Last result: {result}</span>
      </div>
    );
  },
};

/** With `onConfirm`, the dialog shows a loading state and closes only when the action succeeds. */
export const AsyncConfirm: Story = {
  ...ConfirmDialog,
  args: {
    title: 'Save changes?',
    message: 'The dialog stays open and shows a loading state until the async action resolves.',
    confirmText: 'Save',
    cancelText: 'Cancel',
    confirmVariant: 'primary',
    simulateAsync: true,
  },
};
