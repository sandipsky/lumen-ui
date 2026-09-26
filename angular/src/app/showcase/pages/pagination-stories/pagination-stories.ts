import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PageEvent, Pagination } from '../../../shared/components/ui/pagination/pagination';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-pagination-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Pagination, Story, ApiTable],
  templateUrl: './pagination-stories.html',
  styleUrl: './pagination-stories.scss',
})
export class PaginationStories {
  protected readonly lastEvent = signal<PageEvent | null>(null);

  protected onPage(event: PageEvent): void {
    this.lastEvent.set(event);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'length',
      description: 'Total number of items being paginated; drives the page count.',
      type: 'number',
      default: '0',
      example: '[length]="234"',
    },
    {
      name: 'pageSizeOptions',
      description: 'Choices offered by the page-size dropdown.',
      type: 'number[]',
      default: '[10, 25, 50, 100]',
      example: '[pageSizeOptions]="[5, 10, 20]"',
    },
    {
      name: 'pageSize',
      description:
        'Items per page. Two-way bindable (model()); changing it resets to the first page.',
      type: 'number',
      default: '10',
      example: '[(pageSize)]="size"',
    },
    {
      name: 'pageIndex',
      description: 'Zero-based index of the current page. Two-way bindable (model()).',
      type: 'number',
      default: '0',
      example: '[(pageIndex)]="page"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'pageChange',
      description: 'Emits whenever the page index or page size changes.',
      type: 'PageEvent',
      example: '(pageChange)="load($event)"',
    },
  ];
}
