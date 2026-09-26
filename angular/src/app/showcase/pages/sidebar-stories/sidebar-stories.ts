import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-sidebar-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Story, RouterLink, ApiTable],
  templateUrl: './sidebar-stories.html',
  styleUrl: './sidebar-stories.scss',
})
export class SidebarStories {
  protected readonly sidebarApiInputs: ApiTableRow[] = [
    {
      name: 'collapsed',
      description: 'Desktop state: true shrinks the rail from 200px to 70px — two-way.',
      type: 'boolean',
      default: 'false',
      example: '[(collapsed)]="collapsed"',
    },
    {
      name: 'mobileOpen',
      description: 'Mobile state: true slides the drawer in over the content — two-way.',
      type: 'boolean',
      default: 'false',
      example: '[(mobileOpen)]="open"',
    },
  ];

  protected readonly headerApiOutputs: ApiTableRow[] = [
    {
      name: 'menuToggle',
      description: "Fired by the hamburger button; wire it to the sidebar's toggle().",
      type: 'void',
      example: '(menuToggle)="sidebar.toggle()"',
    },
  ];
}
