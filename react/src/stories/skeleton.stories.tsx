import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUISkeleton } from '@lumen-ui/react';

const meta = {
  title: 'Overlays & Feedback/Skeleton',
  component: LUISkeleton,
  args: {
    width: '100%',
    height: '48px',
    radius: '8px',
    circle: false,
    animate: true,
    visible: true,
  },
  argTypes: {
    width: { control: 'text', table: { defaultValue: { summary: "'100%'" } } },
    height: { control: 'text', table: { defaultValue: { summary: 'undefined' } } },
    radius: { control: 'text', table: { defaultValue: { summary: "'8px'" } } },
    circle: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    animate: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    visible: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    children: { control: false },
  },
} satisfies Meta<typeof LUISkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Stack a few blocks with different widths to mimic a paragraph. */
export const TextLines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
      <LUISkeleton height="1rem" />
      <LUISkeleton height="1rem" width="80%" />
      <LUISkeleton height="1rem" width="60%" />
    </div>
  ),
};

/** `circle` makes a circle whose diameter is the height — set `radius` for pills. */
export const CircleAndShapes: Story = {
  name: 'Circle & shapes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <LUISkeleton circle height="56px" />
      <LUISkeleton height="40px" radius="20px" width="160px" />
      <LUISkeleton height="80px" width="80px" radius="14px" />
    </div>
  ),
};

/** Compose blocks to preview a whole component while its data loads. */
export const UserCard: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, maxWidth: 360 }}>
      <LUISkeleton circle height="48px" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <LUISkeleton height="0.9rem" width="40%" />
        <LUISkeleton height="0.8rem" width="70%" />
      </div>
    </div>
  ),
};

/** A static placeholder. */
export const NoAnimation: Story = {
  args: { animate: false },
};

/** Wrap real markup and bind `visible` to a loading flag; the overlay covers it until done. */
export const WrappingContent: Story = {
  render: function Render() {
    const [loading, setLoading] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
        <LUIButton variant="outlined" onClick={() => setLoading(!loading)}>
          {loading ? 'Finish loading' : 'Reload'}
        </LUIButton>
        <LUISkeleton visible={loading} radius="10px">
          <div
            style={{
              padding: 16,
              border: '1px solid var(--separator)',
              borderRadius: 10,
              background: 'var(--bg-lightest)',
            }}
          >
            <h3 style={{ margin: '0 0 6px', fontSize: 16, color: 'var(--text-primary)' }}>
              Aurora Borealis
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: '20px',
                color: 'var(--text-secondary)',
              }}
            >
              The northern lights are a natural display of shifting colour caused by charged
              particles meeting the upper atmosphere. This content is hidden behind the skeleton
              while loading.
            </p>
          </div>
        </LUISkeleton>
      </div>
    );
  },
};
