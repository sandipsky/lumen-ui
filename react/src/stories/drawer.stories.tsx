import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  LUIButton,
  useLUIDrawer,
  type DrawerConfig,
  type DrawerPosition,
  type DrawerRef,
} from '@lumen-ui/react';

type DrawerStoryArgs = Omit<DrawerConfig, 'data'> & {
  title?: string;
  body?: string;
  afterClosed?: (result: unknown) => void;
};

const POSITIONS: DrawerPosition[] = ['left', 'right', 'bottom'];

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

/** Content for the demo drawers (the panel has no padding of its own). */
const demoContent = (ref: DrawerRef, title?: string, body?: string) => (
  <div style={{ padding: 24 }}>
    <h2 style={titleStyle}>{title}</h2>
    <p style={bodyStyle}>{body}</p>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <LUIButton variant="outlined" onClick={() => ref.close(false)}>
        Cancel
      </LUIButton>
      <LUIButton onClick={() => ref.close(true)}>Apply</LUIButton>
    </div>
  </div>
);

/** Returns an opener that shows the demo content with the given options and logs the result. */
function useDemoDrawer() {
  const drawer = useLUIDrawer();
  return ({ title, body, afterClosed, ...config }: DrawerStoryArgs) => {
    const ref = drawer.open((ref) => demoContent(ref, title, body), config);
    void ref.afterClosed().then(afterClosed);
  };
}

const meta: Meta<DrawerStoryArgs> = {
  title: 'Overlays & Feedback/Drawer',
  parameters: {
    docs: {
      description: {
        component:
          'Opened imperatively with the `useLUIDrawer()` hook (needs `<LUIProvider>` or ' +
          '`<LUIDrawerProvider>` above it): `open(content, config)` returns a `DrawerRef` ' +
          '(`close(result)`, `afterClosed()`). Content is JSX, or a render function that ' +
          'receives the `DrawerRef` so it can close itself. The controls are the ' +
          '`DrawerConfig` options — click the button to open a drawer with them.',
      },
    },
  },
  args: {
    title: 'Filters',
    body: 'The slide direction follows the position. Click the backdrop or press Esc to close.',
    position: 'right',
    backdrop: true,
    disableClose: false,
    animationDuration: 280,
    afterClosed: fn(),
  },
  argTypes: {
    title: { control: 'text', description: 'Demo content rendered inside the panel.' },
    body: { control: 'text', description: 'Demo content rendered inside the panel.' },
    position: {
      control: 'inline-radio',
      options: POSITIONS,
      description: 'Edge the panel docks to; the slide animation follows it.',
      table: { defaultValue: { summary: "'right'" } },
    },
    size: {
      control: 'text',
      description:
        'Panel size along its sliding axis — the width for left/right drawers, the height for ' +
        "bottom drawers. E.g. `'420px'`, `'30vw'`, `'50vh'`.",
      table: { defaultValue: { summary: '380px (left/right) · 40vh (bottom)' } },
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
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds.',
      table: { defaultValue: { summary: '280' } },
    },
    afterClosed: {
      description:
        'Logs the result `DrawerRef.afterClosed()` resolves with once the leave animation ' +
        'finishes (`undefined` for backdrop / Esc).',
    },
  },
  render: function Render(args) {
    const openDemo = useDemoDrawer();
    return <LUIButton onClick={() => openDemo(args)}>Open drawer</LUIButton>;
  },
};

export default meta;
type Story = StoryObj<DrawerStoryArgs>;

/** Every `DrawerConfig` option is wired to a control — set them, then open the drawer. */
export const Playground: Story = {};

/** `left`, `right` (default) and `bottom` — each enters from its edge and reverses on close. */
export const Positions: Story = {
  render: function Render() {
    const openDemo = useDemoDrawer();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {POSITIONS.map((position) => (
          <LUIButton
            key={position}
            variant="secondary"
            onClick={() =>
              openDemo({
                position,
                title: `${position} drawer`,
                body: 'The slide direction follows the position.',
              })
            }
          >
            {position}
          </LUIButton>
        ))}
      </div>
    );
  },
};

/** `size` sets the sliding-axis extent — the width for left/right, the height for bottom. */
export const Sizing: Story = {
  render: function Render() {
    const openDemo = useDemoDrawer();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['320px', '480px', '30vw'].map((size) => (
          <LUIButton
            key={size}
            variant="outlined"
            onClick={() =>
              openDemo({
                size,
                title: `Size: ${size}`,
                body: 'size sets the width for left/right drawers.',
              })
            }
          >
            {size}
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
    const openDemo = useDemoDrawer();
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
