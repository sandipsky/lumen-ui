import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Chip, ChipVariant } from '../../../shared/components/ui/chip/chip';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

const DEFAULT_TAGS = ['Angular', 'Signals', 'SCSS', 'Vitest'];

@Component({
  selector: 'app-chip-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip, Button, Story, ApiTable],
  templateUrl: './chip-stories.html',
  styleUrl: './chip-stories.scss',
})
export class ChipStories {
  protected readonly variants: ChipVariant[] = [
    'default',
    'primary',
    'success',
    'error',
    'warn',
    'info',
    'premium',
  ];

  protected readonly tags = signal([...DEFAULT_TAGS]);

  // Kept in TS: `{{ tag }}` inside a template attribute would be parsed as interpolation.
  protected readonly removableCode = `@for (tag of tags(); track tag) {
  <l-chip [removable]="true" (removed)="remove(tag)">{{ tag }}</l-chip>
}`;

  protected remove(tag: string): void {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }

  protected reset(): void {
    this.tags.set([...DEFAULT_TAGS]);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'variant',
      description: 'Color tint of the chip.',
      type: "'default' | 'primary' | 'success' | 'error' | 'warn' | 'info' | 'premium'",
      default: "'default'",
      example: 'variant="success"',
    },
    {
      name: 'size',
      description: 'Padding and font size of the pill.',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'size="sm"',
    },
    {
      name: 'dot',
      description: 'Show a leading dot in the variant color.',
      type: 'boolean',
      default: 'false',
      example: '[dot]="true"',
    },
    {
      name: 'removable',
      description: 'Show a remove button; pressing it emits (removed).',
      type: 'boolean',
      default: 'false',
      example: '[removable]="true"',
    },
    {
      name: 'removeLabel',
      description: 'Accessible label for the remove button.',
      type: 'string',
      default: "'Remove'",
      example: 'removeLabel="Remove tag Angular"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'removed',
      description: 'Fires when the remove button is pressed. The consumer removes the chip.',
      type: 'void',
      example: '(removed)="remove(tag)"',
    },
  ];
}
