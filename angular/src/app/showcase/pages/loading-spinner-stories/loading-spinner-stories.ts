import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { LoadingSpinner } from '../../../shared/components/ui/loading-spinner/loading-spinner';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-loading-spinner-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, LoadingSpinner, Story, ApiTable],
  templateUrl: './loading-spinner-stories.html',
  styleUrl: './loading-spinner-stories.scss',
})
export class LoadingSpinnerStories {
  private readonly _spinner = inject(SpinnerService);

  protected readonly apiService: ApiTableRow[] = [
    {
      name: 'show',
      description: 'Show the overlay (increments the pending count).',
      type: 'show(): void',
      example: 'spinner.show()',
    },
    {
      name: 'hide',
      description: 'Hide one pending request; the overlay stays up until all are cleared.',
      type: 'hide(): void',
      example: 'spinner.hide()',
    },
    {
      name: 'reset',
      description: 'Force the overlay off regardless of pending count.',
      type: 'reset(): void',
      example: 'spinner.reset()',
    },
    {
      name: 'visible',
      description: 'Read-only signal — true while at least one caller is showing the spinner.',
      type: 'Signal<boolean>',
      example: 'spinner.visible()',
    },
  ];

  protected demo(ms = 1500): void {
    this._spinner.show();
    setTimeout(() => this._spinner.hide(), ms);
  }
}
