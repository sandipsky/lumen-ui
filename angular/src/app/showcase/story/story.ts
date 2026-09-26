import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A single showcase example: a titled card with a live demo canvas
 * (projected content) and an optional code snippet.
 */
@Component({
  selector: 'app-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './story.html',
  styleUrl: './story.scss',
})
export class Story {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly code = input<string>('');
}
