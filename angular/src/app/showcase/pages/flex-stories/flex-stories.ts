import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Radio } from '../../../shared/components/ui/input/radio/radio';
import { RadioOption } from '../../../shared/components/ui/input/input';
import { Flex, FlexAlign, FlexGap, FlexJustify } from '../../../shared/components/ui/layout';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-flex-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Flex, Radio, Story, ApiTable, FormsModule],
  templateUrl: './flex-stories.html',
  styleUrl: './flex-stories.scss',
})
export class FlexStories {
  protected readonly vertical = signal(false);

  protected readonly justify = signal<FlexJustify>('space-between');
  protected readonly justifyOptions: RadioOption[] = [
    'start',
    'center',
    'end',
    'space-between',
    'space-around',
    'space-evenly',
  ].map((value) => ({ label: value, value }));

  protected readonly align = signal<FlexAlign>('center');
  protected readonly alignOptions: RadioOption[] = ['start', 'center', 'end', 'baseline'].map(
    (value) => ({ label: value, value }),
  );

  protected readonly gap = signal<FlexGap>('small');
  protected readonly gapOptions: RadioOption[] = [
    { label: 'small', value: 'small' },
    { label: 'middle', value: 'middle' },
    { label: 'large', value: 'large' },
    { label: '40px', value: 40 },
  ];

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'vertical',
      description: 'Lay children out as a column instead of a row.',
      type: 'boolean',
      default: 'false',
      example: '[vertical]="true"',
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
      example: '[wrap]="true"',
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
}
