import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import {
  useLUIDrawer,
  type DrawerPosition,
  type DrawerRef,
} from '../../../components/ui/drawer';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './drawer-stories.css';

const POSITIONS: DrawerPosition[] = ['left', 'right', 'bottom'];

const apiConfig: ApiTableRow[] = [
  {
    name: 'data',
    description:
      'Arbitrary data for the content — render-function content reads it back via ref.config.data; plain JSX content can simply close over it.',
    type: 'D (any)',
    example: 'data: { userId: 42 }',
  },
  {
    name: 'position',
    description: 'Edge the panel docks to; the slide animation follows it.',
    type: "'left' | 'right' | 'bottom'",
    default: "'right'",
    example: "position: 'left'",
  },
  {
    name: 'size',
    description:
      'Panel size along its sliding axis — the width for left/right drawers, the height for bottom drawers.',
    type: 'string',
    example: "size: '420px'",
  },
  {
    name: 'panelClass',
    description: 'Extra class(es) applied to the panel element.',
    type: 'string | string[]',
    example: "panelClass: 'filters-drawer'",
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
    name: 'animationDuration',
    description: 'Animation duration in milliseconds.',
    type: 'number',
    default: '280',
    example: 'animationDuration: 400',
  },
];

const apiMethods: ApiTableRow[] = [
  {
    name: 'open',
    description:
      'Open plain JSX or a render function (which receives the DrawerRef) as the panel content; returns a DrawerRef handle.',
    type: 'open(content, config?): DrawerRef<R>',
    example: "drawer.open(<FiltersPanel />, { position: 'left' })",
  },
  {
    name: 'closeAll',
    description: 'Close every open drawer.',
    type: 'closeAll(): void',
    example: 'drawer.closeAll()',
  },
  {
    name: 'DrawerRef.close',
    description:
      'Begin closing the drawer; the result is delivered by afterClosed() once the leave animation finishes.',
    type: 'close(result?: R): void',
    example: 'ref.close(true)',
  },
  {
    name: 'DrawerRef.config',
    description:
      'Property — the configuration the drawer was opened with (defaults merged in), including config.data.',
    type: 'DrawerConfig',
    example: 'ref.config.data',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'DrawerRef.afterClosed()',
    description: 'Resolves with the close result once the drawer has fully closed.',
    type: 'Promise<R | undefined>',
    example: 'ref.afterClosed().then((result) => …)',
  },
];

/** Content rendered inside the demo drawers (the panel itself has no padding). */
function DrawerDemo({
  title,
  body,
  drawerRef,
}: {
  title?: string;
  body?: string;
  drawerRef: DrawerRef;
}) {
  return (
    <div className="drawer-demo">
      <h2 className="drawer-demo__title">{title || 'Hello from LumenUI'}</h2>
      <p className="drawer-demo__body">{body || 'A simple drawer panel.'}</p>
      <div className="drawer-demo__actions">
        <LUIButton variant="primary" onClick={() => drawerRef.close()}>
          Close
        </LUIButton>
      </div>
    </div>
  );
}

/** A drawer whose buttons each close with a distinct result, delivered via afterClosed(). */
function ChoiceDrawer({ drawerRef }: { drawerRef: DrawerRef<string> }) {
  return (
    <div className="drawer-demo">
      <h2 className="drawer-demo__title">Pick a plan</h2>
      <p className="drawer-demo__body">
        Each button closes the drawer with a different result. The value is delivered to{' '}
        <code>afterClosed()</code> once the leave animation finishes.
      </p>
      <div className="drawer-demo__actions">
        <LUIButton variant="outlined" onClick={() => drawerRef.close('Free')}>
          Free
        </LUIButton>
        <LUIButton variant="secondary" onClick={() => drawerRef.close('Pro')}>
          Pro
        </LUIButton>
        <LUIButton variant="primary" onClick={() => drawerRef.close('Enterprise')}>
          Enterprise
        </LUIButton>
      </div>
    </div>
  );
}

export default function DrawerStories() {
  const drawer = useLUIDrawer();

  const [lastResult, setLastResult] = useState('—');

  const openPosition = (position: DrawerPosition): void => {
    drawer.open(
      (ref) => (
        <DrawerDemo
          drawerRef={ref}
          title={`${position[0].toUpperCase()}${position.slice(1)} drawer`}
          body="The slide direction follows the position. Click the backdrop or press Esc to dismiss it."
        />
      ),
      { position },
    );
  };

  const openSized = (size: string): void => {
    drawer.open(
      (ref) => (
        <DrawerDemo
          drawerRef={ref}
          title={`Size: ${size}`}
          body="size sets the width for left/right drawers."
        />
      ),
      { position: 'right', size },
    );
  };

  const openNoBackdrop = (): void => {
    drawer.open(
      (ref) => (
        <DrawerDemo
          drawerRef={ref}
          title="No backdrop"
          body="The page behind stays visible — only the panel floats above it."
        />
      ),
      { position: 'right', backdrop: false },
    );
  };

  const openDisableClose = (): void => {
    drawer.open(
      (ref) => (
        <DrawerDemo
          drawerRef={ref}
          title="Disabled close"
          body="Backdrop clicks and Esc are ignored — you must use the button below."
        />
      ),
      { position: 'right', disableClose: true },
    );
  };

  const openResult = (): void => {
    const ref = drawer.open<string>((ref) => <ChoiceDrawer drawerRef={ref} />, {
      position: 'right',
    });
    void ref.afterClosed().then((result) => setLastResult(result ?? 'Dismissed'));
  };

  return (
    <div className="story-page drawer-stories">
      <header className="page-header">
        <h1 className="page-header__title">Drawer</h1>
        <p className="page-header__lead">
          An imperative, edge-anchored overlay opened through the <code>useLUIDrawer()</code> hook.
          Dock it to the <code>left</code>, <code>right</code>, or <code>bottom</code>; the slide
          animation follows the position (left slides in to the right and out to the left, and so
          on). Open plain JSX or a render function as the content, get a <code>DrawerRef</code>{' '}
          back (<code>close()</code> / <code>afterClosed()</code> / <code>config</code>). Backdrop
          click and <code>Esc</code> close by default and body scroll is locked while open.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Positions"
          description="left, right (default) and bottom. Each enters from its edge and reverses on close."
          code={`const drawer = useLUIDrawer();

drawer.open(
  (ref) => (
    <div className="drawer-demo">
      <h2>Left drawer</h2>
      <LUIButton onClick={() => ref.close()}>Close</LUIButton>
    </div>
  ),
  { position: 'left' },
);`}
        >
          <div className="demo-row">
            {POSITIONS.map((pos) => (
              <LUIButton key={pos} variant="secondary" onClick={() => openPosition(pos)}>
                {pos}
              </LUIButton>
            ))}
          </div>
        </Story>

        <Story
          title="Sizing"
          description="size sets the panel's sliding-axis extent — width for left/right, height for bottom."
          code={`drawer.open(content, { position: 'right', size: '480px' });`}
        >
          <div className="demo-row">
            <LUIButton variant="outlined" onClick={() => openSized('320px')}>
              320px
            </LUIButton>
            <LUIButton variant="outlined" onClick={() => openSized('480px')}>
              480px
            </LUIButton>
            <LUIButton variant="outlined" onClick={() => openSized('30vw')}>
              30vw
            </LUIButton>
          </div>
        </Story>

        <Story
          title="Backdrop & close behavior"
          description="Hide the dimmed backdrop, or disable closing on backdrop click / Esc so the user must act."
          code={`drawer.open(content, { backdrop: false });
drawer.open(content, { disableClose: true });`}
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
          description="Close the drawer with a value; afterClosed() resolves with it once the leave animation finishes (or undefined when dismissed via backdrop / Esc)."
          code={`const ref = drawer.open<string>(
  (ref) => (
    <div className="drawer-demo">
      <h2>Pick a plan</h2>
      <LUIButton onClick={() => ref.close('Pro')}>Pro</LUIButton>
      <LUIButton onClick={() => ref.close('Enterprise')}>Enterprise</LUIButton>
    </div>
  ),
  { position: 'right' },
);

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

        <ApiTable
          component="useLUIDrawer() (DrawerConfig)"
          note="Hook-based — call useLUIDrawer() (requires LUIDrawerProvider near the app root) and call open(content, config); it returns a DrawerRef. Content is plain JSX or a render function that receives the DrawerRef; render-function content reads the data back via ref.config.data."
          inputsTitle="DrawerConfig options"
          inputs={apiConfig}
        />

        <ApiTable
          component="useLUIDrawer() / DrawerRef"
          note="Public methods on the hook's API and on the DrawerRef handle returned by open()."
          inputsTitle="Methods"
          inputs={apiMethods}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
