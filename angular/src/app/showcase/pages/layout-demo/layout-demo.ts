import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../../shared/components/ui/header/header';
import { Sidebar } from '../../../shared/components/ui/sidebar/sidebar';

@Component({
  selector: 'app-layout-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sidebar, Header, RouterLink],
  templateUrl: './layout-demo.html',
  styleUrl: './layout-demo.scss',
})
export class LayoutDemo {}
