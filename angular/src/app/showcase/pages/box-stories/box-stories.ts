import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioOption, Radio, Box, BoxSpacing } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-box-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Box, Radio, Story, ApiTable, FormsModule],
  templateUrl: './box-stories.html',
  styleUrl: './box-stories.scss',
})
export class BoxStories {
  protected readonly padding = signal<BoxSpacing>('md');
  protected readonly paddingOptions: RadioOption[] = [
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
    { label: '48px', value: 48 },
  ];

  protected readonly buttonClicks = signal(0);

  protected readonly apiInputs: ApiTableRow[] = [
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
      example: '[maw]="480"',
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
}
