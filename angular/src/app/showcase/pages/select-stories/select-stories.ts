import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from '../../../shared/components/ui/input/select/select';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

interface User {
  id: number;
  name: string;
  team: string;
  disabled?: boolean;
}

const PAGE_SIZE = 25;

const ALL_USERS: User[] = [
  { id: 1, name: 'Jack', team: 'Design' },
  { id: 2, name: 'Lucy', team: 'Design' },
  { id: 3, name: 'Yiminghe', team: 'Engineering' },
  { id: 4, name: 'Aarav', team: 'Engineering' },
  { id: 5, name: 'Mei', team: 'Engineering' },
  { id: 6, name: 'Diego', team: 'Product' },
  { id: 7, name: 'Sofia', team: 'Product' },
  { id: 8, name: 'Omar', team: 'Product', disabled: true },
];

@Component({
  selector: 'app-select-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './select-stories.html',
  styleUrl: './select-stories.scss',
})
export class SelectStories {
  protected readonly fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];
  protected readonly viewFruits = ['Apple', 'Cherry'];
  protected readonly users = ALL_USERS;

  protected readonly fruit = signal<string | null>('Banana');
  protected readonly userId = signal<number | null>(2);
  protected readonly searchableUserId = signal<number | null>(null);
  protected readonly groupedUserId = signal<number | null>(null);
  protected readonly cityId = signal<number | null>(null);

  // --- Multi-select ---
  protected readonly multiFruits = signal<string[]>(['Banana', 'Cherry']);
  protected readonly multiUserIds = signal<number[]>([1, 2, 3, 4, 5]);
  protected readonly cappedFruits = signal<string[]>([]);
  protected readonly clearableFruits = signal<string[]>(['Apple', 'Mango']);

  /** Reactive form control with a required validator for the validation demo. */
  protected readonly countryControl = new FormControl<string | null>(null, [Validators.required]);

  /** Large list to demonstrate the virtual scroller. */
  protected readonly cities = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    label: `City #${i + 1}`,
  }));

  // --- Paged loading (scrollToEnd) ---

  protected readonly pagedCities = signal(this.cities.slice(0, PAGE_SIZE));
  protected readonly pagedCityId = signal<number | null>(null);
  private _pageTimer: ReturnType<typeof setTimeout> | undefined;

  protected loadNextPage(): void {
    if (this._pageTimer || this.pagedCities().length >= this.cities.length) return;
    // Stand-in for fetching the next page from an API.
    this._pageTimer = setTimeout(() => {
      this.pagedCities.set(this.cities.slice(0, this.pagedCities().length + PAGE_SIZE));
      this._pageTimer = undefined;
    }, 400);
  }

  // --- Async search simulation ---

  protected readonly remoteUsers = signal<User[]>([]);
  protected readonly loadingRemote = signal(false);
  protected readonly remoteUserId = signal<number | null>(null);
  private _searchTimer: ReturnType<typeof setTimeout> | undefined;

  protected onRemoteSearch(term: string): void {
    clearTimeout(this._searchTimer);
    const query = term.trim().toLowerCase();
    if (!query) {
      this.remoteUsers.set([]);
      this.loadingRemote.set(false);
      return;
    }

    this.loadingRemote.set(true);
    // Stand-in for an HTTP call — debounced, then resolves with matches.
    this._searchTimer = setTimeout(() => {
      this.remoteUsers.set(ALL_USERS.filter((u) => u.name.toLowerCase().includes(query)));
      this.loadingRemote.set(false);
    }, 600);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the trigger.',
      type: 'string',
      default: "''",
      example: 'label="Fruit"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while nothing is selected.',
      type: 'string',
      default: "'Select…'",
      example: 'placeholder="Pick one"',
    },
    {
      name: 'disabled',
      description: 'Disable the control — no dropdown, reduced opacity.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the trigger element; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="country"',
    },
    {
      name: 'multiple',
      description:
        'Allow selecting more than one option — the value becomes an array and the trigger shows tags.',
      type: 'boolean',
      default: 'false',
      example: '[multiple]="true"',
    },
    {
      name: 'maxCount',
      description:
        'Cap the number of options that can be selected (multi-select only); unset means unlimited.',
      type: 'number',
      default: 'undefined',
      example: '[maxCount]="3"',
    },
    {
      name: 'maxTagCount',
      description:
        "How many tags to show before collapsing the rest into a '+N' badge (multi-select only) — 'responsive' fits as many as the trigger width allows.",
      type: "number | 'responsive'",
      default: "'responsive'",
      example: '[maxTagCount]="2"',
    },
    {
      name: 'clearable',
      description: 'Show a clear (×) affix that empties the selection.',
      type: 'boolean',
      default: 'false',
      example: '[clearable]="true"',
    },
    {
      name: 'items',
      description: 'Options to choose from — primitives (string[]/number[]) or objects.',
      type: 'readonly unknown[]',
      default: '[]',
      example: '[items]="fruits"',
    },
    {
      name: 'bindValue',
      description:
        'For object items: the property to use as the patched value; unset patches the whole item.',
      type: 'string',
      default: 'undefined',
      example: 'bindValue="id"',
    },
    {
      name: 'bindLabel',
      description:
        'For object items: the property to display; unset falls back to the value, then String(item).',
      type: 'string',
      default: 'undefined',
      example: 'bindLabel="name"',
    },
    {
      name: 'bindDisabled',
      description: 'For object items: a truthy property that disables that single option.',
      type: 'string',
      default: 'undefined',
      example: 'bindDisabled="disabled"',
    },
    {
      name: 'groupBy',
      description:
        'For object items: the property to group options by, rendered under sticky headers.',
      type: 'string',
      default: 'undefined',
      example: 'groupBy="team"',
    },
    {
      name: 'searchable',
      description: 'Show an in-dropdown search box that filters options by label.',
      type: 'boolean',
      default: 'false',
      example: '[searchable]="true"',
    },
    {
      name: 'showArrow',
      description: 'Show the chevron affix on the right.',
      type: 'boolean',
      default: 'true',
      example: '[showArrow]="false"',
    },
    {
      name: 'showLoading',
      description:
        'Replace the option list with a spinner — useful while an async search is in flight.',
      type: 'boolean',
      default: 'false',
      example: '[showLoading]="loading()"',
    },
    {
      name: 'virtualScroll',
      description: 'Render only the visible window of rows — best for large, ungrouped lists.',
      type: 'boolean',
      default: 'false',
      example: '[virtualScroll]="true"',
    },
    {
      name: 'viewMode',
      description:
        'Render the selected option label(s) as plain text instead of the select — comma-separated in multiple mode.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description:
        'Custom text shown in view mode; falls back to the selected option label(s) when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="Mango (out of season)"',
    },
    {
      name: 'useValidation',
      description:
        'Opt the field out of the shared inline validation UI (FormValidation host directive).',
      type: 'boolean',
      default: 'true',
      example: 'useValidation="false"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'change',
      description: 'Emits the selected value whenever it changes — an array in multiple mode.',
      type: 'unknown',
      example: '(change)="onSelect($event)"',
    },
    {
      name: 'search',
      description:
        'Emits the search text on every keystroke — wire this to an API call for server-side search.',
      type: 'string',
      example: '(search)="onSearch($event)"',
    },
    {
      name: 'scrollToEnd',
      description:
        'Emits when the option list scrolls near the bottom — append the next page to items for paged loading.',
      type: 'void',
      example: '(scrollToEnd)="loadNextPage()"',
    },
  ];
}
