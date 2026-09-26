import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import {
  LUIConfirmDialog,
  useLUIModal,
  type ModalAnimation,
  type ModalRef,
} from '../../../components/ui/modal';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './modal-stories.css';

const ANIMATIONS: ModalAnimation[] = [
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'fade',
  'zoom',
  'none',
];

const apiConfig: ApiTableRow[] = [
  {
    name: 'data',
    description:
      'Arbitrary data for the content — render-function content reads it back via ref.config.data; plain JSX content can simply close over it.',
    type: 'D (any)',
    example: "data: { title: 'Delete?' }",
  },
  {
    name: 'width',
    description: 'Panel width.',
    type: 'string',
    example: "width: '640px'",
  },
  {
    name: 'height',
    description: 'Panel height.',
    type: 'string',
    example: "height: '70vh'",
  },
  {
    name: 'maxWidth',
    description: 'Panel max width — an explicit width is still capped by it.',
    type: 'string',
    default: "'90vw'",
    example: "maxWidth: '600px'",
  },
  {
    name: 'panelClass',
    description: 'Extra class(es) applied to the panel element.',
    type: 'string | string[]',
    example: "panelClass: 'checkout-modal'",
  },
  {
    name: 'backdrop',
    description: 'Render the dimmed backdrop behind the panel.',
    type: 'boolean',
    default: 'true',
    example: 'backdrop: false',
  },
  {
    name: 'disableClose',
    description: 'Prevent closing on backdrop click / Escape key.',
    type: 'boolean',
    default: 'false',
    example: 'disableClose: true',
  },
  {
    name: 'animation',
    description: 'Entry/leave animation — applied to both transitions.',
    type: "'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'zoom' | 'none'",
    default: "'slideUp'",
    example: "animation: 'zoom'",
  },
  {
    name: 'animationDuration',
    description: 'Animation duration in milliseconds.',
    type: 'number',
    default: '250',
    example: 'animationDuration: 400',
  },
];

const apiMethods: ApiTableRow[] = [
  {
    name: 'open',
    description:
      'Open plain JSX or a render function (which receives the ModalRef) as the panel content; returns a ModalRef handle.',
    type: 'open(content, config?): ModalRef<R>',
    example: 'modal.open((ref) => <LUIConfirmDialog modalRef={ref} />, { data })',
  },
  {
    name: 'closeAll',
    description: 'Close every open modal.',
    type: 'closeAll(): void',
    example: 'modal.closeAll()',
  },
  {
    name: 'ModalRef.close',
    description:
      'Begin closing the modal; the result is delivered by afterClosed() once the leave animation finishes.',
    type: 'close(result?: R): void',
    example: 'ref.close(true)',
  },
  {
    name: 'ModalRef.config',
    description:
      'Property — the configuration the modal was opened with (defaults merged in), including config.data.',
    type: 'ModalConfig',
    example: 'ref.config.data',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'ModalRef.afterClosed()',
    description: 'Resolves with the close result once the modal has fully closed.',
    type: 'Promise<R | undefined>',
    example: 'ref.afterClosed().then((result) => …)',
  },
];

/** Content rendered inside the demo modals (the panel itself has no padding). */
function ModalDemo({
  title,
  body,
  modalRef,
}: {
  title?: string;
  body?: string;
  modalRef: ModalRef;
}) {
  return (
    <div className="modal-demo">
      <h2 className="modal-demo__title">{title || 'Hello from LumenUI'}</h2>
      <p className="modal-demo__body">{body || 'A simple modal panel.'}</p>
      <div className="modal-demo__actions">
        <LUIButton variant="primary" onClick={() => modalRef.close()}>
          Got it
        </LUIButton>
      </div>
    </div>
  );
}

/** A modal whose buttons each close with a distinct result, delivered via afterClosed(). */
function ChoiceModal({ modalRef }: { modalRef: ModalRef<string> }) {
  return (
    <div className="modal-demo">
      <h2 className="modal-demo__title">Pick a plan</h2>
      <p className="modal-demo__body">
        Each button closes the modal with a different result. The value is delivered to{' '}
        <code>afterClosed()</code> once the leave animation finishes.
      </p>
      <div className="modal-demo__actions">
        <LUIButton variant="outlined" onClick={() => modalRef.close('Free')}>
          Free
        </LUIButton>
        <LUIButton variant="secondary" onClick={() => modalRef.close('Pro')}>
          Pro
        </LUIButton>
        <LUIButton variant="primary" onClick={() => modalRef.close('Enterprise')}>
          Enterprise
        </LUIButton>
      </div>
    </div>
  );
}

export default function ModalStories() {
  const modal = useLUIModal();

  const [lastResult, setLastResult] = useState('—');

  const openBasic = (): void => {
    modal.open((ref) => (
      <ModalDemo
        modalRef={ref}
        title="Welcome to LumenUI"
        body="This panel is rendered from plain JSX. Click the backdrop or press Esc to dismiss it."
      />
    ));
  };

  const openAnimation = (animation: ModalAnimation): void => {
    modal.open(
      (ref) => (
        <ModalDemo
          modalRef={ref}
          title={`Animation: ${animation}`}
          body="Both the enter and leave transitions use this animation."
        />
      ),
      { animation },
    );
  };

  const openSized = (width: string): void => {
    modal.open(
      (ref) => (
        <ModalDemo
          modalRef={ref}
          title={`Width: ${width}`}
          body="The panel still caps at maxWidth (90vw by default)."
        />
      ),
      { width },
    );
  };

  const openNoBackdrop = (): void => {
    modal.open(
      (ref) => (
        <ModalDemo
          modalRef={ref}
          title="No backdrop"
          body="The page behind stays visible — only the panel floats above it."
        />
      ),
      { backdrop: false },
    );
  };

  const openDisableClose = (): void => {
    modal.open(
      (ref) => (
        <ModalDemo
          modalRef={ref}
          title="Disabled close"
          body="Backdrop clicks and Esc are ignored — you must use the button below."
        />
      ),
      { disableClose: true },
    );
  };

  const openResult = (): void => {
    const ref = modal.open<string>((ref) => <ChoiceModal modalRef={ref} />);
    void ref.afterClosed().then((result) => setLastResult(result ?? 'Dismissed'));
  };

  const openConfirm = (): void => {
    const ref = modal.open<boolean>((ref) => (
      <LUIConfirmDialog
        modalRef={ref}
        data={{
          title: 'Delete project?',
          message:
            'This permanently removes the project and all of its data. This cannot be undone.',
        }}
      />
    ));
    void ref.afterClosed().then((result) => setLastResult(result ? 'Confirmed' : 'Cancelled'));
  };

  const openAsyncConfirm = (): void => {
    const ref = modal.open<boolean>((ref) => (
      <LUIConfirmDialog
        modalRef={ref}
        data={{
          title: 'Save changes?',
          message:
            'The dialog stays open and shows a loading state until the async action resolves.',
          confirmText: 'Save',
          confirmVariant: 'primary',
          onConfirm: () => new Promise((resolve) => setTimeout(() => resolve(true), 1200)),
        }}
      />
    ));
    void ref.afterClosed().then((result) => setLastResult(result ? 'Saved' : 'Cancelled'));
  };

  return (
    <div className="story-page modal-stories">
      <header className="page-header">
        <h1 className="page-header__title">Modal</h1>
        <p className="page-header__lead">
          An imperative, <code>MatDialog</code>-style overlay opened through the{' '}
          <code>useLUIModal()</code> hook. Open plain JSX or a render function as the content, get
          a <code>ModalRef</code> back (<code>close()</code> / <code>afterClosed()</code> /{' '}
          <code>config</code>), and play pure-CSS enter/leave animations. The backdrop click and{' '}
          <code>Esc</code> close by default and body scroll is locked while open.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Open JSX as the panel content. A render function receives the ModalRef so the content can close itself."
          code={`const modal = useLUIModal();

modal.open((ref) => (
  <div className="modal-demo">
    <h2>Welcome to LumenUI</h2>
    <LUIButton onClick={() => ref.close()}>Got it</LUIButton>
  </div>
));`}
        >
          <LUIButton onClick={openBasic}>Open modal</LUIButton>
        </Story>

        <Story
          title="Animations"
          description="slideUp (default), slideDown, slideLeft, slideRight, fade, zoom and none — applied to both enter and leave."
          code={`modal.open(content, { animation: 'zoom' });`}
        >
          <div className="demo-row">
            {ANIMATIONS.map((anim) => (
              <LUIButton key={anim} variant="secondary" onClick={() => openAnimation(anim)}>
                {anim}
              </LUIButton>
            ))}
          </div>
        </Story>

        <Story
          title="Sizing"
          description="Set an explicit width; the panel still caps at maxWidth (90vw by default)."
          code={`modal.open(content, { width: '640px' });`}
        >
          <div className="demo-row">
            <LUIButton variant="outlined" onClick={() => openSized('360px')}>
              360px
            </LUIButton>
            <LUIButton variant="outlined" onClick={() => openSized('640px')}>
              640px
            </LUIButton>
            <LUIButton variant="outlined" onClick={() => openSized('80vw')}>
              80vw
            </LUIButton>
          </div>
        </Story>

        <Story
          title="Backdrop & close behavior"
          description="Hide the dimmed backdrop, or disable closing on backdrop click / Esc so the user must act."
          code={`modal.open(content, { backdrop: false });
modal.open(content, { disableClose: true });`}
        >
          <div className="demo-row">
            <LUIButton variant="outlined" onClick={openNoBackdrop}>
              No backdrop
            </LUIButton>
            <LUIButton variant="outlined" onClick={openDisableClose}>
              Disable close
            </LUIButton>
          </div>
        </Story>

        <Story
          title="Result & afterClosed()"
          description="Close the modal with a value; afterClosed() resolves with it once the leave animation finishes (or undefined when dismissed via backdrop / Esc)."
          code={`const ref = modal.open<string>((ref) => (
  <div className="modal-demo">
    <h2>Pick a plan</h2>
    <LUIButton onClick={() => ref.close('Pro')}>Pro</LUIButton>
    <LUIButton onClick={() => ref.close('Enterprise')}>Enterprise</LUIButton>
  </div>
));

ref.afterClosed().then((result) => {
  // result is 'Pro' | 'Enterprise' | undefined (dismissed)
  setLastResult(result ?? 'Dismissed');
});`}
        >
          <div className="demo-col">
            <LUIButton variant="primary" onClick={openResult}>
              Choose a plan…
            </LUIButton>
            <p className="demo-readout">Last result: {lastResult}</p>
          </div>
        </Story>

        <Story
          title="Confirm dialog (component content)"
          description="Open the LUIConfirmDialog component; afterClosed() resolves to true (confirmed) or false (cancelled)."
          code={`const ref = modal.open<boolean>((ref) => (
  <LUIConfirmDialog
    modalRef={ref}
    data={{ title: 'Delete project?', message: '…' }}
  />
));
ref.afterClosed().then((ok) => …);`}
        >
          <div className="demo-col">
            <LUIButton variant="danger" onClick={openConfirm}>
              Delete project…
            </LUIButton>
            <p className="demo-readout">Last result: {lastResult}</p>
          </div>
        </Story>

        <Story
          title="Async confirm"
          description="Pass onConfirm returning a Promise — the dialog shows a loading state and only closes once it resolves."
          code={`modal.open<boolean>((ref) => (
  <LUIConfirmDialog
    modalRef={ref}
    data={{
      title: 'Save changes?',
      confirmText: 'Save',
      confirmVariant: 'primary',
      onConfirm: () => api.save(),
    }}
  />
));`}
        >
          <div className="demo-col">
            <LUIButton variant="primary" onClick={openAsyncConfirm}>
              Save changes…
            </LUIButton>
            <p className="demo-readout">Last result: {lastResult}</p>
          </div>
        </Story>

        <ApiTable
          component="useLUIModal() (ModalConfig)"
          note="Hook-based — call useLUIModal() (requires LUIModalProvider near the app root) and call open(content, config); it returns a ModalRef. Content is plain JSX or a render function that receives the ModalRef; render-function content reads the data back via ref.config.data."
          inputsTitle="ModalConfig options"
          inputs={apiConfig}
        />

        <ApiTable
          component="useLUIModal() / ModalRef"
          note="Public methods on the hook's API and on the ModalRef handle returned by open()."
          inputsTitle="Methods"
          inputs={apiMethods}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
