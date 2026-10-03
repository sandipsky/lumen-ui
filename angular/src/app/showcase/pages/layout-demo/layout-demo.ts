import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header, Sidebar } from '@lumen-ui/angular';

@Component({
  selector: 'app-layout-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sidebar, Header, RouterLink],
  templateUrl: './layout-demo.html',
  styleUrl: './layout-demo.scss',
})
export class LayoutDemo {}
