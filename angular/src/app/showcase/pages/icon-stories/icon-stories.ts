import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon, L_ICON_NAMES } from '../../../shared/components/ui/icon/icon';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-icon-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Story, ApiTable],
  templateUrl: './icon-stories.html',
  styleUrl: './icon-stories.scss',
})
export class IconStories {
  protected readonly iconNames = L_ICON_NAMES;

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'name',
      description:
        'Icon to draw — an svg file name from public/svg/ without the extension. Required.',
      type: 'IconName',
      default: '—',
      example: 'name="user"',
    },
    {
      name: 'size',
      description: 'Width/height. A number is pixels; any CSS size string works too.',
      type: 'number | string',
      default: '20',
      example: '[size]="16"',
    },
    {
      name: 'color',
      description:
        'Icon color — any CSS color, including var(--…) tokens. Pass "inherit" to follow the surrounding text color.',
      type: 'string',
      default: 'var(--text-tertiary) — #646663',
      example: 'color="var(--error)"',
    },
  ];
}
