import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Radio, RadioOption, Col, Row, RowAlign, RowJustify } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-grid-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Row, Col, Radio, Story, ApiTable, FormsModule],
  templateUrl: './grid-stories.html',
  styleUrl: './grid-stories.scss',
})
export class GridStories {
  protected readonly justify = signal<RowJustify>('center');
  protected readonly justifyOptions: RadioOption[] = [
    'start',
    'center',
    'end',
    'space-between',
    'space-around',
    'space-evenly',
  ].map((value) => ({ label: value, value }));

  protected readonly align = signal<RowAlign>('middle');
  protected readonly alignOptions: RadioOption[] = ['top', 'middle', 'bottom', 'stretch'].map(
    (value) => ({ label: value, value }),
  );

  protected readonly rowApiInputs: ApiTableRow[] = [
    {
      name: 'gutter',
      description:
        'Spacing between columns in px — cols pad themselves and the row cancels the outer padding. An [horizontal, vertical] pair also spaces wrapped lines (row-gap).',
      type: 'number | [number, number]',
      default: '0',
      example: '[gutter]="[16, 16]"',
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
      example: '[wrap]="false"',
    },
  ];

  protected readonly colApiInputs: ApiTableRow[] = [
    {
      name: 'span',
      description:
        'Columns to span out of 12. 0 hides the column; unset → sized by content (or by flex).',
      type: 'number | null',
      default: 'null',
      example: '[span]="6"',
    },
    {
      name: 'offset',
      description: 'Columns to skip on the left, out of 12.',
      type: 'number',
      default: '0',
      example: '[offset]="4"',
    },
    {
      name: 'order',
      description: 'Visual order among siblings, without touching the markup.',
      type: 'number | null',
      default: 'null',
      example: '[order]="2"',
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
      example: '[xs]="12"',
    },
    {
      name: 'sm',
      description: 'Responsive override from 576px up (mobile-first: larger breakpoints win).',
      type: 'number | ColSize',
      default: 'null',
      example: '[sm]="6"',
    },
    {
      name: 'md',
      description: 'Responsive override from 768px up.',
      type: 'number | ColSize',
      default: 'null',
      example: '[md]="4"',
    },
    {
      name: 'lg',
      description: 'Responsive override from 992px up.',
      type: 'number | ColSize',
      default: 'null',
      example: '[lg]="{ span: 3, offset: 1 }"',
    },
    {
      name: 'xl',
      description: 'Responsive override from 1200px up.',
      type: 'number | ColSize',
      default: 'null',
      example: '[xl]="2"',
    },
    {
      name: 'xxl',
      description: 'Responsive override from 1400px up.',
      type: 'number | ColSize',
      default: 'null',
      example: '[xxl]="{ span: 2, order: 1 }"',
    },
  ];
}
