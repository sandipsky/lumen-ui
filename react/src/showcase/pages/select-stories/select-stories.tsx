import { useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { LUISelect } from '../../../components/ui/input/select/select';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './select-stories.css';

interface User {
  id: number;
  name: string;
  team: string;
  disabled?: boolean;
}

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

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];

/** Large list to demonstrate the virtual scroller. */
const CITIES = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  label: `City #${i + 1}`,
}));

const apiInputs: ApiTableRow[] = [
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
    name: 'value',
    description: 'Controlled selected value — an array of values when multiple.',
    type: 'unknown',
    default: 'undefined',
    example: 'value={fruit}',
  },
  {
    name: 'disabled',
    description: 'Disable the control — no dropdown, reduced opacity.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
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
    example: 'multiple',
  },
  {
    name: 'maxCount',
    description:
      'Cap the number of options that can be selected (multi-select only); unset means unlimited.',
    type: 'number',
    default: 'undefined',
    example: 'maxCount={3}',
  },
  {
    name: 'maxTagCount',
    description:
      "How many tags to show before collapsing the rest into a '+N' badge (multi-select only) — 'responsive' fits as many as the trigger width allows.",
    type: "number | 'responsive'",
    default: "'responsive'",
    example: 'maxTagCount={2}',
  },
  {
    name: 'clearable',
    description: 'Show a clear (×) affix that empties the selection.',
    type: 'boolean',
    default: 'false',
    example: 'clearable',
  },
  {
    name: 'items',
    description: 'Options to choose from — primitives (string[]/number[]) or objects.',
    type: 'readonly unknown[]',
    default: '[]',
    example: 'items={fruits}',
  },
  {
    name: 'bindValue',
    description:
      'For object items: the property to use as the emitted value; unset emits the whole item.',
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
    example: 'searchable',
  },
  {
    name: 'showArrow',
    description: 'Show the chevron affix on the right.',
    type: 'boolean',
    default: 'true',
    example: 'showArrow={false}',
  },
  {
    name: 'showLoading',
    description:
      'Replace the option list with a spinner — useful while an async search is in flight.',
    type: 'boolean',
    default: 'false',
    example: 'showLoading={loading}',
  },
  {
    name: 'virtualScroll',
    description: 'Render only the visible window of rows — best for large, ungrouped lists.',
    type: 'boolean',
    default: 'false',
    example: 'virtualScroll',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description:
      'Called with the selected value whenever it changes — an array in multiple mode.',
    type: 'unknown',
    example: 'onChange={(v) => setFruit(v)}',
  },
  {
    name: 'onSearch',
    description:
      'Called with the search text on every keystroke — wire this to an API call for server-side search.',
    type: 'string',
    example: 'onSearch={(text) => load(text)}',
  },
  {
    name: 'onScrollToEnd',
    description:
      'Called when the option list scrolls near the bottom — append the next page to items for paged loading.',
    type: 'void',
    example: 'onScrollToEnd={loadNextPage}',
  },
  {
    name: 'onBlur',
    description:
      "Called when focus leaves the component — wire to react-hook-form Controller's field.onBlur for touched state.",
    type: 'void',
    example: 'onBlur={field.onBlur}',
  },
  {
    name: 'viewMode',
    description:
      'Render the selected option label(s) as plain text instead of the select — comma-separated in multiple mode.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the selected option label(s) when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="Mango (out of season)"',
  },
];

export default function SelectStories() {
  const [fruit, setFruit] = useState<string | null>('Banana');
  const [userId, setUserId] = useState<number | null>(2);
  const [searchableUserId, setSearchableUserId] = useState<number | null>(null);
  const [groupedUserId, setGroupedUserId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  // --- Multi-select ---
  const [multiFruits, setMultiFruits] = useState<string[]>(['Banana', 'Cherry']);
  const [multiUserIds, setMultiUserIds] = useState<number[]>([1, 2, 3, 4, 5]);
  const [cappedFruits, setCappedFruits] = useState<string[]>([]);
  const [clearableFruits, setClearableFruits] = useState<string[]>(['Apple', 'Mango']);

  // --- Async search simulation ---
  const [remoteUsers, setRemoteUsers] = useState<User[]>([]);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState<number | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onRemoteSearch = (term: string): void => {
    clearTimeout(searchTimer.current);
    const query = term.trim().toLowerCase();
    if (!query) {
      setRemoteUsers([]);
      setLoadingRemote(false);
      return;
    }

    setLoadingRemote(true);
    // Stand-in for an HTTP call — debounced, then resolves with matches.
    searchTimer.current = setTimeout(() => {
      setRemoteUsers(ALL_USERS.filter((u) => u.name.toLowerCase().includes(query)));
      setLoadingRemote(false);
    }, 600);
  };

  // --- Paged loading (onScrollToEnd) ---
  const PAGE_SIZE = 25;
  const [pagedCities, setPagedCities] = useState(() => CITIES.slice(0, PAGE_SIZE));
  const [pagedCityId, setPagedCityId] = useState<number | null>(null);
  const pageTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const loadNextPage = (): void => {
    if (pageTimer.current || pagedCities.length >= CITIES.length) return;
    // Stand-in for fetching the next page from an API.
    pageTimer.current = setTimeout(() => {
      setPagedCities((current) => CITIES.slice(0, current.length + PAGE_SIZE));
      pageTimer.current = undefined;
    }, 400);
  };

  /** react-hook-form + Controller demo with a required validator. */
  const {
    control,
    formState: { isValid },
  } = useForm<{ country: string | null }>({
    mode: 'onChange',
    defaultValues: { country: null },
  });
  const country = useWatch({ control, name: 'country' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Select</h1>
        <p className="page-header__lead">
          A single-select dropdown inspired by Ant Design. Accepts a plain array of values or an
          array of objects mapped via <code>bindValue</code>/<code>bindLabel</code>, with optional
          in-place <code>searchable</code> filtering, <code>groupBy</code> headers, an
          async-friendly loading state, and a <code>virtualScroll</code> mode for large datasets.
          Per-option disabling is driven by <code>bindDisabled</code>. Turn on{' '}
          <code>multiple</code> for tag-based multi-select with <code>maxCount</code>,{' '}
          <code>maxTagCount</code> and <code>clearable</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic (primitive array)"
          description="Pass a plain string/number array — no binding props needed."
          code={`const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];
const [fruit, setFruit] = useState<string | null>('Banana');

<LUISelect label="Fruit" items={fruits} value={fruit} onChange={(v) => setFruit(v as string)} />`}
        >
          <div className="demo-col">
            <LUISelect
              label="Fruit"
              items={FRUITS}
              value={fruit}
              onChange={(v) => setFruit(v as string | null)}
            />
            <p className="demo-readout">Value: {fruit ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Object array"
          description="Map objects with bindValue (the emitted value) and bindLabel (the shown text). Options flagged disabled are skipped by keyboard and click."
          code={`<LUISelect
  label="Assignee"
  items={users}
  bindValue="id"
  bindLabel="name"
  value={userId}
  onChange={(v) => setUserId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Assignee"
              items={ALL_USERS}
              bindValue="id"
              bindLabel="name"
              value={userId}
              onChange={(v) => setUserId(v as number | null)}
            />
            <p className="demo-readout">Selected id: {userId ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Searchable"
          description="Set searchable to filter options by label from an in-dropdown search box."
          code={`<LUISelect
  label="Assignee"
  items={users}
  bindValue="id"
  bindLabel="name"
  searchable
  value={userId}
  onChange={(v) => setUserId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Assignee"
              items={ALL_USERS}
              bindValue="id"
              bindLabel="name"
              searchable
              value={searchableUserId}
              onChange={(v) => setSearchableUserId(v as number | null)}
            />
            <p className="demo-readout">Selected id: {searchableUserId ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Grouped + per-option disabled"
          description="groupBy renders options under group headers derived from that property. bindDisabled flags individual options (greyed out, skipped by click and keyboard)."
          code={`<LUISelect
  label="Teammate"
  items={users}
  bindValue="id"
  bindLabel="name"
  groupBy="team"
  bindDisabled="disabled"
  searchable
  value={userId}
  onChange={(v) => setUserId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Teammate"
              items={ALL_USERS}
              bindValue="id"
              bindLabel="name"
              groupBy="team"
              bindDisabled="disabled"
              searchable
              value={groupedUserId}
              onChange={(v) => setGroupedUserId(v as number | null)}
            />
            <p className="demo-readout">Selected id: {groupedUserId ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Multiple"
          description="Set multiple to select several options. The value becomes an array and picks render as removable tags; the dropdown stays open and shows a check on selected rows."
          code={`const [fruits, setFruits] = useState<string[]>(['Banana', 'Cherry']);

<LUISelect
  label="Fruits"
  items={FRUITS}
  multiple
  value={fruits}
  onChange={(v) => setFruits(v as string[])}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Fruits"
              items={FRUITS}
              multiple
              value={multiFruits}
              onChange={(v) => setMultiFruits(v as string[])}
            />
            <p className="demo-readout">Value: {multiFruits.join(', ') || '—'}</p>
          </div>
        </Story>

        <Story
          title="Tag overflow (maxTagCount)"
          description="maxTagCount defaults to 'responsive' — tags fill the trigger width, then collapse into a +N badge. Pass a number to cap the visible tags instead."
          code={`{/* responsive (default): fit, then +N */}
<LUISelect items={users} bindValue="id" bindLabel="name"
  multiple value={ids} onChange={(v) => setIds(v as number[])} />

{/* fixed: at most 2 tags, then +N */}
<LUISelect items={users} bindValue="id" bindLabel="name"
  multiple maxTagCount={2} value={ids} onChange={(v) => setIds(v as number[])} />`}
        >
          <div className="demo-col">
            <LUISelect
              label="Responsive"
              items={ALL_USERS}
              bindValue="id"
              bindLabel="name"
              multiple
              value={multiUserIds}
              onChange={(v) => setMultiUserIds(v as number[])}
            />
            <LUISelect
              label="maxTagCount = 2"
              items={ALL_USERS}
              bindValue="id"
              bindLabel="name"
              multiple
              maxTagCount={2}
              value={multiUserIds}
              onChange={(v) => setMultiUserIds(v as number[])}
            />
          </div>
        </Story>

        <Story
          title="Max selections (maxCount)"
          description="maxCount caps how many options can be picked. Once reached, the remaining unselected options are disabled until you remove one."
          code={`<LUISelect
  label="Pick up to 3"
  items={FRUITS}
  multiple
  maxCount={3}
  value={fruits}
  onChange={(v) => setFruits(v as string[])}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Pick up to 3"
              items={FRUITS}
              multiple
              maxCount={3}
              value={cappedFruits}
              onChange={(v) => setCappedFruits(v as string[])}
            />
            <p className="demo-readout">{cappedFruits.length}/3 selected</p>
          </div>
        </Story>

        <Story
          title="Clearable"
          description="clearable adds an × affix that empties the selection in one click. Works for single and multi-select."
          code={`<LUISelect
  label="Fruits"
  items={FRUITS}
  multiple
  clearable
  value={fruits}
  onChange={(v) => setFruits(v as string[])}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Fruits"
              items={FRUITS}
              multiple
              clearable
              value={clearableFruits}
              onChange={(v) => setClearableFruits(v as string[])}
            />
            <LUISelect
              label="Single fruit"
              items={FRUITS}
              clearable
              value={fruit}
              onChange={(v) => setFruit(v as string | null)}
            />
          </div>
        </Story>

        <Story
          title="Async search + loading"
          description="Wire onSearch to an API call and toggle showLoading while it's in flight. This demo debounces 600ms against an in-memory list."
          code={`const onSearch = (term: string) => {
  setLoading(true);
  // …debounce + call API, then set items + loading=false
};

<LUISelect
  label="Search users"
  items={remoteUsers}
  bindValue="id"
  bindLabel="name"
  searchable
  showLoading={loading}
  onSearch={onSearch}
  value={remoteUserId}
  onChange={(v) => setRemoteUserId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="Search users"
              placeholder="Type a name…"
              items={remoteUsers}
              bindValue="id"
              bindLabel="name"
              searchable
              showLoading={loadingRemote}
              onSearch={onRemoteSearch}
              value={remoteUserId}
              onChange={(v) => setRemoteUserId(v as number | null)}
            />
            <p className="demo-readout">Selected id: {remoteUserId ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Paged loading (onScrollToEnd)"
          description="onScrollToEnd fires when the list scrolls near the bottom — append the next page to items for infinite scroll. This demo loads 25 cities at a time with a simulated 400ms fetch."
          code={`const PAGE_SIZE = 25;
const [cities, setCities] = useState(() => ALL_CITIES.slice(0, PAGE_SIZE));

const loadNextPage = () => {
  // …fetch the next page, then append it to items
  setCities((current) => ALL_CITIES.slice(0, current.length + PAGE_SIZE));
};

<LUISelect
  label="City"
  items={cities}
  bindValue="id"
  bindLabel="label"
  onScrollToEnd={loadNextPage}
  value={cityId}
  onChange={(v) => setCityId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="City (paged)"
              items={pagedCities}
              bindValue="id"
              bindLabel="label"
              onScrollToEnd={loadNextPage}
              value={pagedCityId}
              onChange={(v) => setPagedCityId(v as number | null)}
            />
            <p className="demo-readout">
              Loaded {pagedCities.length}/{CITIES.length} · selected id: {pagedCityId ?? '—'}
            </p>
          </div>
        </Story>

        <Story
          title="Virtual scroll"
          description="With virtualScroll only the visible rows render, so a 5,000-item list stays smooth. Best for large, ungrouped lists."
          code={`<LUISelect
  label="City"
  items={cities}
  bindValue="id"
  bindLabel="label"
  searchable
  virtualScroll
  value={cityId}
  onChange={(v) => setCityId(v as number)}
/>`}
        >
          <div className="demo-col">
            <LUISelect
              label="City (5,000 options)"
              items={CITIES}
              bindValue="id"
              bindLabel="label"
              searchable
              virtualScroll
              value={cityId}
              onChange={(v) => setCityId(v as number | null)}
            />
            <p className="demo-readout">Selected id: {cityId ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="No arrow"
          description="Hide the chevron affix with showArrow={false}."
          code={`<LUISelect items={FRUITS} showArrow={false} value={fruit} onChange={(v) => setFruit(v as string)} />`}
        >
          <LUISelect
            label="Fruit"
            items={FRUITS}
            showArrow={false}
            value={fruit}
            onChange={(v) => setFruit(v as string | null)}
          />
        </Story>

        <Story
          title="react-hook-form — Controller"
          description="LUISelect is a controlled component, so RHF users wrap it in a Controller; the required rule keeps the form invalid until a pick is made."
          code={`const { control, formState: { isValid } } = useForm({
  mode: 'onChange',
  defaultValues: { country: null },
});

<Controller
  name="country"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <LUISelect
      label="Country"
      items={['Nepal', 'India', 'Japan', 'Bhutan']}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  )}
/>`}
        >
          <div className="demo-col">
            <Controller
              name="country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LUISelect
                  label="Country"
                  items={['Nepal', 'India', 'Japan', 'Bhutan']}
                  value={field.value}
                  onChange={(v) => field.onChange(v as string | null)}
                  onBlur={field.onBlur}
                />
              )}
            />
            <p className="demo-readout">
              valid: {String(isValid)} · value: {country ?? '—'}
            </p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={`<LUISelect label="Fruit" items={FRUITS} value={fruit} disabled />`}
        >
          <LUISelect
            label="Fruit"
            items={FRUITS}
            value={fruit}
            onChange={(v) => setFruit(v as string | null)}
            disabled
          />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the selected option label(s) as plain text — comma-separated in multiple mode."
          code={`<LUISelect label="Fruit" items={FRUITS} value="Mango" viewMode />
<LUISelect label="Fruits" items={FRUITS} multiple value={['Apple', 'Cherry']} viewMode />`}
        >
          <div className="demo-col">
            <LUISelect label="Fruit" items={FRUITS} value="Mango" viewMode />
            <LUISelect label="Fruits" items={FRUITS} multiple value={['Apple', 'Cherry']} viewMode />
          </div>
        </Story>

        <ApiTable
          component="LUISelect"
          note="A controlled component — pass value and onChange(value); the value is the selected option's value (the whole item when bindValue is unset), or an array of values when multiple. With react-hook-form, wrap it in a <Controller> and wire field.value/field.onChange/field.onBlur."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
