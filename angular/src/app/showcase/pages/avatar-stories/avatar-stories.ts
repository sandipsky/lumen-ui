import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Avatar } from '../../../shared/components/ui/avatar/avatar';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-avatar-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, Story, ApiTable],
  templateUrl: './avatar-stories.html',
  styleUrl: './avatar-stories.scss',
})
export class AvatarStories {
  protected readonly avatarImg = 'https://i.pravatar.cc/120?img=5';

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'imageUrl',
      description:
        'Image source; when empty, the initials fallback is shown. Declared as a model(), so it also supports two-way binding.',
      type: 'string | null',
      default: "''",
      example: '[(imageUrl)]="url"',
    },
    {
      name: 'name',
      description: 'Full name used to derive the fallback initials (first + last).',
      type: 'string',
      default: "''",
      example: 'name="Ada Lovelace"',
    },
    {
      name: 'size',
      description: 'Any CSS length, applied to both width and height.',
      type: 'string',
      default: "'32px'",
      example: 'size="48px"',
    },
    {
      name: 'color',
      description: 'Background color of the initials chip.',
      type: 'string',
      default: "'var(--accent)'",
      example: 'color="#AB20A9"',
    },
    {
      name: 'textColor',
      description: 'Text color of the initials chip.',
      type: 'string',
      default: "'var(--text-white)'",
      example: 'textColor="#ffffff"',
    },
  ];
}
