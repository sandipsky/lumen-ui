import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUISkeleton } from '../../../components/ui/skeleton/skeleton';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './skeleton-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'width',
    description: 'Width as any CSS length; ignored when circle is set (width follows height).',
    type: 'string',
    default: "'100%'",
    example: 'width="60%"',
  },
  {
    name: 'height',
    description: 'Height as any CSS length — required for standalone blocks and for circle.',
    type: 'string',
    example: 'height="1rem"',
  },
  {
    name: 'radius',
    description: 'Corner radius (any CSS length); overridden to 50% when circle is set.',
    type: 'string',
    default: "'8px'",
    example: 'radius="20px"',
  },
  {
    name: 'circle',
    description: 'Render a circle: the width follows height and the radius becomes 50%.',
    type: 'boolean',
    default: 'false',
    example: 'circle',
  },
  {
    name: 'animate',
    description: 'Play the pulsing animation.',
    type: 'boolean',
    default: 'true',
    example: 'animate={false}',
  },
  {
    name: 'visible',
    description: 'Show the skeleton overlay (true) or reveal the wrapped content (false).',
    type: 'boolean',
    default: 'true',
    example: 'visible={loading}',
  },
];

export default function SkeletonStories() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="story-page skeleton-stories">
      <header className="page-header">
        <h1 className="page-header__title">Skeleton</h1>
        <p className="page-header__lead">
          A loading placeholder inspired by Mantine. Use it standalone as a sized block via{' '}
          <code>height</code> / <code>width</code> / <code>radius</code> (or <code>circle</code>),
          or wrap real content and toggle <code>visible</code> — while visible, an opaque pulsing
          overlay covers the content and reveals it once loading finishes. Disable the pulse with{' '}
          <code>animate=&#123;false&#125;</code>; recolor it through the{' '}
          <code>--l-skeleton-base</code> / <code>--l-skeleton-overlay</code> CSS variables.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Text lines"
          description="Stack a few blocks with different widths to mimic a paragraph."
          code={`<LUISkeleton height="1rem" />
<LUISkeleton height="1rem" width="80%" />
<LUISkeleton height="1rem" width="60%" />`}
        >
          <div className="demo-lines">
            <LUISkeleton height="1rem" />
            <LUISkeleton height="1rem" width="80%" />
            <LUISkeleton height="1rem" width="60%" />
          </div>
        </Story>

        <Story
          title="Circle & shapes"
          description="circle makes a circle whose diameter is the height — great for avatars. Set radius for pills."
          code={`<LUISkeleton circle height="56px" />
<LUISkeleton height="40px" radius="20px" width="160px" />`}
        >
          <div className="demo-row">
            <LUISkeleton circle height="56px" />
            <LUISkeleton height="40px" radius="20px" width="160px" />
            <LUISkeleton height="80px" width="80px" radius="14px" />
          </div>
        </Story>

        <Story
          title="User card"
          description="Compose blocks to preview a whole component while its data loads."
          code={`<div className="row">
  <LUISkeleton circle height="48px" />
  <div className="col">
    <LUISkeleton height="0.9rem" width="40%" />
    <LUISkeleton height="0.8rem" width="70%" />
  </div>
</div>`}
        >
          <div className="demo-card">
            <LUISkeleton circle height="48px" />
            <div className="demo-card__body">
              <LUISkeleton height="0.9rem" width="40%" />
              <LUISkeleton height="0.8rem" width="70%" />
            </div>
          </div>
        </Story>

        <Story
          title="No animation"
          description="Set animate={false} for a static placeholder (also respects prefers-reduced-motion automatically)."
          code={`<LUISkeleton height="1rem" animate={false} />`}
        >
          <div className="demo-lines">
            <LUISkeleton height="1rem" animate={false} />
            <LUISkeleton height="1rem" width="70%" animate={false} />
          </div>
        </Story>

        <Story
          title="Wrapping content (visible)"
          description="Wrap real markup and bind visible to your loading flag. The overlay covers the content until loading is done."
          code={`<LUISkeleton visible={loading}>
  <p>Loaded content goes here.</p>
</LUISkeleton>`}
        >
          <div className="demo-col">
            <LUIButton variant="outlined" onClick={() => setLoading((v) => !v)}>
              {loading ? 'Finish loading' : 'Reload'}
            </LUIButton>

            <LUISkeleton visible={loading} radius="10px">
              <div className="demo-loaded">
                <h3>Aurora Borealis</h3>
                <p>
                  The northern lights are a natural display of shifting colour caused by charged
                  particles meeting the upper atmosphere. This content is hidden behind the skeleton
                  while loading.
                </p>
              </div>
            </LUISkeleton>
          </div>
        </Story>

        <ApiTable
          component="LUISkeleton"
          note="Style-only placeholder — no callbacks. Use it standalone as a sized block, or wrap real content and toggle visible. Recolor via the --l-skeleton-base and --l-skeleton-overlay CSS variables."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
