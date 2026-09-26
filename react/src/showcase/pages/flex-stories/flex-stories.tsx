import { useState } from 'react';
import {
  LUIRadio,
  type RadioOption,
} from '../../../components/ui/input/radio/radio';
import {
  LUIFlex,
  type FlexAlign,
  type FlexGap,
  type FlexJustify,
} from '../../../components/ui/layout';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './flex-stories.css';

const justifyOptions: RadioOption[] = [
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
  'space-evenly',
].map((value) => ({ label: value, value }));

const alignOptions: RadioOption[] = ['start', 'center', 'end', 'baseline'].map((value) => ({
  label: value,
  value,
}));

const gapOptions: RadioOption[] = [
  { label: 'small', value: 'small' },
  { label: 'middle', value: 'middle' },
  { label: 'large', value: 'large' },
  { label: '40px', value: 40 },
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'vertical',
    description: 'Lay children out as a column instead of a row.',
    type: 'boolean',
    default: 'false',
    example: 'vertical',
  },
  {
    name: 'justify',
    description: 'Distribution along the main axis (justify-content).',
    type: "'normal' | 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
    default: "'normal'",
    example: 'justify="space-between"',
  },
  {
    name: 'align',
    description: 'Alignment on the cross axis (align-items).',
    type: "'normal' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'",
    default: "'normal'",
    example: 'align="center"',
  },
  {
    name: 'wrap',
    description: 'Let children flow onto new lines — a boolean or any CSS flex-wrap keyword.',
    type: "boolean | 'nowrap' | 'wrap' | 'wrap-reverse'",
    default: 'false',
    example: 'wrap',
  },
  {
    name: 'gap',
    description:
      'Space between children — preset small (8px) / middle (16px) / large (24px), a pixel number, or any CSS gap value.',
    type: "'small' | 'middle' | 'large' | number | string",
    default: '0',
    example: 'gap="middle"',
  },
];

export default function FlexStories() {
  const [direction, setDirection] = useState('horizontal');
  const [justify, setJustify] = useState<FlexJustify>('space-between');
  const [align, setAlign] = useState<FlexAlign>('center');
  const [gap, setGap] = useState<FlexGap>('small');

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Flex</h1>
        <p className="page-header__lead">
          A flexbox container inspired by Ant Design's <code>Flex</code>. A thin, style-only
          wrapper: set <code>vertical</code>, <code>justify</code>, <code>align</code>,{' '}
          <code>wrap</code> and <code>gap</code> (presets <code>small</code>/<code>middle</code>/
          <code>large</code>, a pixel number, or any CSS gap value) and children flow exactly as
          written.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Horizontal by default; flip vertical to stack children as a column."
          code={`<LUIFlex gap="small" vertical={vertical}>
  <div className="box">1</div>
  ...
</LUIFlex>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIRadio
              label="Direction"
              name="flex-direction"
              options={[
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
              ]}
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            />
            <LUIFlex gap="small" vertical={direction === 'vertical'}>
              <div className="flex-box">1</div>
              <div className="flex-box flex-box--alt">2</div>
              <div className="flex-box">3</div>
              <div className="flex-box flex-box--alt">4</div>
            </LUIFlex>
          </div>
        </Story>

        <Story
          title="Justify"
          description="Distribute children along the main axis."
          code={`<LUIFlex justify={justify} gap="small">…</LUIFlex>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIRadio
              label="justify"
              name="flex-justify"
              options={justifyOptions}
              value={justify}
              onChange={(e) => setJustify(e.target.value as FlexJustify)}
            />
            <LUIFlex className="flex-canvas" justify={justify} gap="small">
              <div className="flex-box">1</div>
              <div className="flex-box flex-box--alt">2</div>
              <div className="flex-box">3</div>
            </LUIFlex>
          </div>
        </Story>

        <Story
          title="Align"
          description="Align children on the cross axis — the boxes have different heights to show the effect."
          code={`<LUIFlex align={align} gap="small">…</LUIFlex>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIRadio
              label="align"
              name="flex-align"
              options={alignOptions}
              value={align}
              onChange={(e) => setAlign(e.target.value as FlexAlign)}
            />
            <LUIFlex className="flex-canvas flex-canvas--tall" align={align} gap="small">
              <div className="flex-box" style={{ height: 40 }}>
                1
              </div>
              <div className="flex-box flex-box--alt" style={{ height: 80 }}>
                2
              </div>
              <div className="flex-box" style={{ height: 56 }}>
                3
              </div>
            </LUIFlex>
          </div>
        </Story>

        <Story
          title="Gap"
          description="Presets map to the spacing scale (small 8px, middle 16px, large 24px); numbers are pixels."
          code={`<LUIFlex gap={gap}>…</LUIFlex>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIRadio
              label="gap"
              name="flex-gap"
              options={gapOptions}
              value={gap as string | number}
              onChange={(e) =>
                setGap(/^\d+$/.test(e.target.value) ? Number(e.target.value) : e.target.value)
              }
            />
            <LUIFlex gap={gap}>
              <div className="flex-box">1</div>
              <div className="flex-box flex-box--alt">2</div>
              <div className="flex-box">3</div>
              <div className="flex-box flex-box--alt">4</div>
            </LUIFlex>
          </div>
        </Story>

        <Story
          title="Wrap"
          description="wrap lets children flow onto new lines; gap applies both ways."
          code={`<LUIFlex wrap gap="small">…</LUIFlex>`}
        >
          <div className="demo-col demo-col--wide">
            <LUIFlex wrap gap="small">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
                <div key={i} className={i % 2 === 0 ? 'flex-box flex-box--alt' : 'flex-box'}>
                  {i}
                </div>
              ))}
            </LUIFlex>
          </div>
        </Story>

        <ApiTable
          component="LUIFlex"
          note="Style-only container — no callbacks of its own. All layout is applied to the root element (a div — native div props pass through), so children flow exactly as written."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
