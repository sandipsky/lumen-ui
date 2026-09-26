import { useState } from 'react';
import {
  LUIRadio,
  type RadioOption,
} from '../../../components/ui/input/radio/radio';
import { LUIBox, type BoxSpacing } from '../../../components/ui/layout';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './box-stories.css';

const paddingOptions: RadioOption[] = [
  { label: 'xs', value: 'xs' },
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
  { label: 'xl', value: 'xl' },
  { label: '48px', value: 48 },
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'component',
    description: 'Element or component to render as the root.',
    type: 'ElementType',
    default: "'div'",
    example: 'component="a"',
  },
  {
    name: 'm, mx, my, mt, mb, ml, mr',
    description:
      'Margin — all sides, horizontal/vertical pairs, or a single side. Explicit sides win over mx/my, which win over m.',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
    default: '—',
    example: 'mt="md"',
  },
  {
    name: 'p, px, py, pt, pb, pl, pr',
    description:
      'Padding — same shorthand system as margin. Presets map to the spacing scale (xs 4px, sm 8px, md 16px, lg 24px, xl 32px); numbers are pixels.',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
    default: '—',
    example: 'p="lg"',
  },
  {
    name: 'w, miw, maw',
    description: 'Width, min-width and max-width — a pixel number or any CSS size value.',
    type: 'number | string',
    default: '—',
    example: 'maw={480}',
  },
  {
    name: 'h, mih, mah',
    description: 'Height, min-height and max-height — a pixel number or any CSS size value.',
    type: 'number | string',
    default: '—',
    example: 'h="100%"',
  },
  {
    name: 'bg',
    description: 'Background — any CSS color, including design tokens.',
    type: 'string',
    default: '—',
    example: 'bg="var(--accent-bg)"',
  },
  {
    name: 'c',
    description: 'Text color — any CSS color, including design tokens.',
    type: 'string',
    default: '—',
    example: 'c="var(--accent-dark)"',
  },
];

export default function BoxStories() {
  const [padding, setPadding] = useState<BoxSpacing>('md');

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Box</h1>
        <p className="page-header__lead">
          The base building block, inspired by Mantine's <code>Box</code>. Renders a{' '}
          <code>div</code> (or any element via <code>component</code>) with style props for
          spacing (<code>m</code>/<code>p</code> shorthands on the <code>xs</code>–<code>xl</code>{' '}
          scale), size (<code>w</code>/<code>h</code>/<code>maw</code>…) and color (
          <code>bg</code>/<code>c</code>) — one-off layout tweaks without a CSS file.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Style props replace inline style objects for the common cases — padding, background and text color here."
          code={`<LUIBox p="md" bg="var(--accent-bg)" c="var(--accent-dark)">
  Style props: p="md" bg="var(--accent-bg)" c="var(--accent-dark)"
</LUIBox>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIBox className="box-demo" p="md" bg="var(--accent-bg)" c="var(--accent-dark)">
              Style props: p="md" bg="var(--accent-bg)" c="var(--accent-dark)"
            </LUIBox>
          </div>
        </Story>

        <Story
          title="Spacing scale"
          description="Spacing props accept the preset scale (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS value."
          code={`<LUIBox p={padding} bg="var(--bg-light)">…</LUIBox>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIRadio
              label="padding"
              name="box-padding"
              options={paddingOptions}
              value={padding as string | number}
              onChange={(e) =>
                setPadding(/^\d+$/.test(e.target.value) ? Number(e.target.value) : e.target.value)
              }
            />
            <LUIBox className="box-canvas" p={padding} bg="var(--bg-light)">
              <LUIBox className="box-demo" p="sm" bg="var(--accent)" c="var(--text-white)">
                p={typeof padding === 'number' ? `{${padding}}` : `"${padding}"`}
              </LUIBox>
            </LUIBox>
          </div>
        </Story>

        <Story
          title="Margin & sides"
          description="mx/my set a pair of sides, mt/mb/ml/mr a single one; explicit sides win over the pairs, which win over m."
          code={`<LUIBox bg="var(--bg-light)">
  <LUIBox mx="xl" my="sm" p="sm" bg="var(--accent)">mx="xl" my="sm"</LUIBox>
  <LUIBox ml="xl" mb="sm" p="sm" bg="var(--accent-dark)">ml="xl" mb="sm"</LUIBox>
</LUIBox>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIBox className="box-canvas" bg="var(--bg-light)">
              <LUIBox className="box-demo" mx="xl" my="sm" p="sm" bg="var(--accent)" c="var(--text-white)">
                mx="xl" my="sm"
              </LUIBox>
              <LUIBox className="box-demo" ml="xl" mb="sm" p="sm" bg="var(--accent-dark)" c="var(--text-white)">
                ml="xl" mb="sm"
              </LUIBox>
            </LUIBox>
          </div>
        </Story>

        <Story
          title="Size"
          description="w/h and the min/max variants (miw/maw, mih/mah) take pixel numbers or any CSS size."
          code={`<LUIBox w="100%" maw={320} h={56} bg="var(--accent-bg)">
  w="100%" maw={320} h={56}
</LUIBox>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIBox
              className="box-demo"
              w="100%"
              maw={320}
              h={56}
              p="sm"
              bg="var(--accent-bg)"
              c="var(--accent-dark)"
            >
              w="100%" maw={'{320}'} h={'{56}'}
            </LUIBox>
          </div>
        </Story>

        <Story
          title="Polymorphic"
          description="component swaps the rendered element — the element's own props (href, type, …) type-check and pass through."
          code={`<LUIBox component="a" href="https://mantine.dev" target="_blank" p="sm">
  Renders an <a>
</LUIBox>
<LUIBox component="button" type="button" p="sm" onClick={...}>
  Renders a <button>
</LUIBox>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIBox
              className="box-demo"
              component="a"
              href="https://mantine.dev"
              target="_blank"
              rel="noreferrer"
              p="sm"
              bg="var(--info-bg)"
              c="var(--info)"
            >
              Renders an &lt;a&gt; — click to open mantine.dev
            </LUIBox>
            <LUIBox
              className="box-demo box-demo--button"
              component="button"
              type="button"
              p="sm"
              bg="var(--accent)"
              c="var(--text-white)"
              onClick={() => alert('Box as <button>')}
            >
              Renders a &lt;button&gt;
            </LUIBox>
          </div>
        </Story>

        <ApiTable
          component="LUIBox"
          note="Style-only building block — no callbacks of its own. Everything is applied to the root element, and the rendered element's native props (className, style, events, href, …) pass through."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
