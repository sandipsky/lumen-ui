import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-breadcrumb-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Breadcrumb, Story, ApiTable],
  templateUrl: './breadcrumb-stories.html',
  styleUrl: './breadcrumb-stories.scss',
})
export class BreadcrumbStories {
  protected readonly trail: BreadcrumbItem[] = [
    { label: 'Home', link: '/button' },
    { label: 'Components', link: '/menu' },
    { label: 'Breadcrumb' },
  ];

  protected readonly shortTrail: BreadcrumbItem[] = [
    { label: 'Docs', link: '/button' },
    { label: 'Getting started' },
  ];

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'title',
      description: 'Optional page title rendered above the trail.',
      type: 'string',
      default: "''",
      example: 'title="Order #1024"',
    },
    {
      name: 'items',
      description:
        'The crumb trail, in order; the last item is treated as the current page, earlier ones link via routerLink when they carry a link.',
      type: 'BreadcrumbItem[]',
      default: '[]',
      example: '[items]="trail"',
    },
  ];
}
