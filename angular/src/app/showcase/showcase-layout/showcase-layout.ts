import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SHOWCASE_COMPONENTS } from '../showcase.data';

@Component({
  selector: 'app-showcase-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './showcase-layout.html',
  styleUrl: './showcase-layout.scss',
})
export class ShowcaseLayout {
  protected readonly components = SHOWCASE_COMPONENTS;
}
