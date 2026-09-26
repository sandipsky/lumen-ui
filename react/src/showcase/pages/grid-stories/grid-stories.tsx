import { useState } from 'react';
import {
  LUIRadio,
  type RadioOption,
} from '../../../components/ui/input/radio/radio';
import {
  LUICol,
  LUIRow,
  type RowAlign,
  type RowJustify,
} from '../../../components/ui/layout';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './grid-stories.css';

const justifyOptions: RadioOption[] = [
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
  'space-evenly',
].map((value) => ({ label: value, value }));

const alignOptions: RadioOption[] = ['top', 'middle', 'bottom', 'stretch'].map((value) => ({
  label: value,
  value,
}));

const rowApiInputs: ApiTableRow[] = [
  {
    name: 'gutter',
    description:
      'Spacing between columns in px — cols pad themselves and the row cancels the outer padding. An [horizontal, vertical] pair also spaces wrapped lines (row-gap).',
    type: 'number | [number, number]',
    default: '0',
    example: 'gutter={[16, 16]}',
  },
  {
    name: 'justify',
    description: 'Horizontal distribution of columns that don’t fill all 12 tracks.',
    type: "'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
    default: "'start'",
    example: 'justify="center"',
  },
  {
    name: 'align',
    description: 'Vertical alignment of columns within the row.',
    type: "'top' | 'middle' | 'bottom' | 'stretch'",
    default: "'top'",
    example: 'align="middle"',
  },
  {
    name: 'wrap',
    description: 'Let columns wrap onto new lines when they exceed 12 tracks.',
    type: 'boolean',
    default: 'true',
    example: 'wrap={false}',
  },
];

const colApiInputs: ApiTableRow[] = [
  {
    name: 'span',
    description:
      'Columns to span out of 12. 0 hides the column; unset → sized by content (or by flex).',
    type: 'number | null',
    default: 'null',
    example: 'span={6}',
  },
  {
    name: 'offset',
    description: 'Columns to skip on the left, out of 12.',
    type: 'number',
    default: '0',
    example: 'offset={4}',
  },
  {
    name: 'order',
    description: 'Visual order among siblings, without touching the markup.',
    type: 'number | null',
    default: 'null',
    example: 'order={2}',
  },
  {
    name: 'flex',
    description:
      "CSS flex shorthand — 'auto' fills the remaining space, a bare length ('120px') is a fixed width, a number is a grow factor. Takes precedence over span.",
    type: 'string | number | null',
    default: 'null',
    example: 'flex="auto"',
  },
  {
    name: 'xs',
    description: 'Responsive override below 576px — a span number or { span, offset, order }.',
    type: 'number | ColSize',
    default: 'null',
    example: 'xs={12}',
  },
  {
    name: 'sm',
    description: 'Responsive override from 576px up (mobile-first: larger breakpoints win).',
    type: 'number | ColSize',
    default: 'null',
    example: 'sm={6}',
  },
  {
    name: 'md',
    description: 'Responsive override from 768px up.',
    type: 'number | ColSize',
    default: 'null',
    example: 'md={4}',
  },
  {
    name: 'lg',
    description: 'Responsive override from 992px up.',
    type: 'number | ColSize',
    default: 'null',
    example: 'lg={{ span: 3, offset: 1 }}',
  },
  {
    name: 'xl',
    description: 'Responsive override from 1200px up.',
    type: 'number | ColSize',
    default: 'null',
    example: 'xl={2}',
  },
  {
    name: 'xxl',
    description: 'Responsive override from 1400px up.',
    type: 'number | ColSize',
    default: 'null',
    example: 'xxl={{ span: 2, order: 1 }}',
  },
];

export default function GridStories() {
  const [justify, setJustify] = useState<RowJustify>('center');
  const [align, setAlign] = useState<RowAlign>('middle');

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Grid</h1>
        <p className="page-header__lead">
          A 12-column grid, Bootstrap-style, built from <code>Row</code>/<code>Col</code>. Rows are
          flex containers that hand their <code>gutter</code> to child columns; columns take{' '}
          <code>span</code>/<code>offset</code>/<code>order</code> plus mobile-first responsive
          overrides (<code>xs</code> <code>sm</code> <code>md</code> <code>lg</code>{' '}
          <code>xl</code> <code>xxl</code> — a number or <code>{'{ span, offset, order }'}</code>).{' '}
          <code>span=0</code> hides a column and <code>flex</code> makes fill or fixed-width
          columns.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Spans are fractions of 12: 12 is full width, 6 a half, 4 a third, 3 a quarter."
          code={`<LUIRow><LUICol span={12}>12</LUICol></LUIRow>
<LUIRow><LUICol span={6}>6</LUICol><LUICol span={6}>6</LUICol></LUIRow>
<LUIRow><LUICol span={4}>4</LUICol> ×3</LUIRow>
<LUIRow><LUICol span={3}>3</LUICol> ×4</LUIRow>`}
        >
          <div className="demo-rows">
            <LUIRow>
              <LUICol span={12}>
                <div className="grid-box">12</div>
              </LUICol>
            </LUIRow>
            <LUIRow>
              <LUICol span={6}>
                <div className="grid-box">6</div>
              </LUICol>
              <LUICol span={6}>
                <div className="grid-box grid-box--alt">6</div>
              </LUICol>
            </LUIRow>
            <LUIRow>
              <LUICol span={4}>
                <div className="grid-box">4</div>
              </LUICol>
              <LUICol span={4}>
                <div className="grid-box grid-box--alt">4</div>
              </LUICol>
              <LUICol span={4}>
                <div className="grid-box">4</div>
              </LUICol>
            </LUIRow>
            <LUIRow>
              <LUICol span={3}>
                <div className="grid-box">3</div>
              </LUICol>
              <LUICol span={3}>
                <div className="grid-box grid-box--alt">3</div>
              </LUICol>
              <LUICol span={3}>
                <div className="grid-box">3</div>
              </LUICol>
              <LUICol span={3}>
                <div className="grid-box grid-box--alt">3</div>
              </LUICol>
            </LUIRow>
          </div>
        </Story>

        <Story
          title="Gutter"
          description="A number spaces columns horizontally; an [h, v] pair also spaces wrapped lines."
          code={`<LUIRow gutter={[16, 16]}>
  <LUICol span={6} md={3}>…</LUICol>
  ×4
</LUIRow>`}
        >
          <LUIRow gutter={[16, 16]}>
            {[1, 2, 3, 4].map((i) => (
              <LUICol key={i} span={6} md={3}>
                <div className={i % 2 === 0 ? 'grid-box grid-box--alt' : 'grid-box'}>col</div>
              </LUICol>
            ))}
          </LUIRow>
        </Story>

        <Story
          title="Responsive"
          description="Resize the window: full width below sm (576px), halves up to lg (992px), quarters beyond. Overrides cascade up from the smallest breakpoint."
          code={`<LUICol xs={12} sm={6} lg={3}>…</LUICol>`}
        >
          <LUIRow gutter={[12, 12]}>
            {[1, 2, 3, 4].map((i) => (
              <LUICol key={i} xs={12} sm={6} lg={3}>
                <div className={i % 2 === 0 ? 'grid-box grid-box--alt' : 'grid-box'}>
                  xs 12 · sm 6 · lg 3
                </div>
              </LUICol>
            ))}
          </LUIRow>
        </Story>

        <Story
          title="Offset & order"
          description="offset skips columns on the left; order rearranges without touching the markup."
          code={`<LUICol span={4} offset={4}>4, offset 4</LUICol>

<LUICol span={3} order={4}>1st in markup</LUICol> …`}
        >
          <div className="demo-rows">
            <LUIRow>
              <LUICol span={4}>
                <div className="grid-box">4</div>
              </LUICol>
              <LUICol span={4} offset={4}>
                <div className="grid-box grid-box--alt">4, offset 4</div>
              </LUICol>
            </LUIRow>
            <LUIRow>
              <LUICol span={3} order={4}>
                <div className="grid-box">1 → order 4</div>
              </LUICol>
              <LUICol span={3} order={3}>
                <div className="grid-box grid-box--alt">2 → order 3</div>
              </LUICol>
              <LUICol span={3} order={2}>
                <div className="grid-box">3 → order 2</div>
              </LUICol>
              <LUICol span={3} order={1}>
                <div className="grid-box grid-box--alt">4 → order 1</div>
              </LUICol>
            </LUIRow>
          </div>
        </Story>

        <Story
          title="Row justify & align"
          description="Distribute and align columns that don't fill the full 12 tracks."
          code={`<LUIRow justify={justify} align={align}>…</LUIRow>`}
        >
          <div className="demo-col">
            <LUIRadio
              label="justify"
              name="row-justify"
              options={justifyOptions}
              value={justify}
              onChange={(e) => setJustify(e.target.value as RowJustify)}
            />
            <LUIRadio
              label="align"
              name="row-align"
              options={alignOptions}
              value={align}
              onChange={(e) => setAlign(e.target.value as RowAlign)}
            />
            <LUIRow className="grid-canvas" justify={justify} align={align}>
              <LUICol span={2}>
                <div className="grid-box" style={{ height: 32 }}>
                  2
                </div>
              </LUICol>
              <LUICol span={2}>
                <div className="grid-box grid-box--alt" style={{ height: 64 }}>
                  2
                </div>
              </LUICol>
              <LUICol span={2}>
                <div className="grid-box" style={{ height: 48 }}>
                  2
                </div>
              </LUICol>
              <LUICol span={2}>
                <div className="grid-box grid-box--alt" style={{ height: 80 }}>
                  2
                </div>
              </LUICol>
            </LUIRow>
          </div>
        </Story>

        <Story
          title="Fill & fixed columns (flex)"
          description='flex="auto" fills the remaining space; a bare length ("120px") makes a fixed-width column.'
          code={`<LUIRow gutter={12}>
  <LUICol flex="120px">fixed</LUICol>
  <LUICol flex="auto">fill</LUICol>
</LUIRow>`}
        >
          <LUIRow gutter={12}>
            <LUICol flex="120px">
              <div className="grid-box">120px</div>
            </LUICol>
            <LUICol flex="auto">
              <div className="grid-box grid-box--alt">auto — fills the rest</div>
            </LUICol>
          </LUIRow>
        </Story>

        <ApiTable
          component="LUIRow"
          note="Flex container for LUICol children — no callbacks of its own. Hands its horizontal gutter to the columns via React context."
          inputs={rowApiInputs}
        />

        <ApiTable
          component="LUICol"
          note="Column on a 12-track grid — no callbacks of its own. Base span/offset/order are overridden per breakpoint by xs…xxl, mobile-first (the largest matching breakpoint wins). ColSize = { span?, offset?, order? }."
          inputs={colApiInputs}
        />
      </div>
    </div>
  );
}
