import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** One documented input or output row for {@link ApiTable}. */
export interface ApiTableRow {
  name: string;
  description: string;
  /** Type as shown to the consumer, e.g. `'ad' | 'bs'`. */
  type: string;
  /** Default value — omit for outputs. */
  default?: string;
  /** Short usage snippet, e.g. `[span]="12"`. */
  example?: string;
}

/**
 * API reference card for a showcase page: renders a component's inputs and
 * outputs as Ant Design-style docs tables (Property | Description | Type |
 * Default | Example).
 */
@Component({
  selector: 'app-api-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './api-table.html',
  styleUrl: './api-table.scss',
})
export class ApiTable {
  /** Selector being documented, e.g. `l-date-input`. */
  readonly component = input.required<string>();
  /** Optional note under the heading — value semantics, ngModel support, etc. */
  readonly note = input<string>('');
  /** Heading for the first table — override for config-object docs (e.g. "ModalConfig"). */
  readonly inputsTitle = input<string>('Inputs');
  readonly inputs = input<ApiTableRow[]>([]);
  readonly outputs = input<ApiTableRow[]>([]);

  /** Element selectors render as `<l-...>`; directive/service names are shown as passed. */
  protected readonly _displayName = computed(() => {
    const name = this.component();
    return /^l-[\w-]+$/.test(name) ? `<${name}>` : name;
  });
}
