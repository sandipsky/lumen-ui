import { LUIIcon, LUI_ICON_NAMES } from '../../../components/ui/icon/icon';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './icon-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'name',
    description: 'Icon to draw — an svg file name from src/assets/svg/ without the extension. Required.',
    type: 'LUIIconName',
    default: '—',
    example: 'name="user"',
  },
  {
    name: 'size',
    description: 'Width/height. A number is pixels; any CSS size string works too.',
    type: 'number | string',
    default: '20',
    example: 'size={16}',
  },
  {
    name: 'color',
    description:
      'Icon color — any CSS color, including var(--…) tokens. Pass "inherit" to follow the surrounding text color.',
    type: 'string',
    default: 'var(--text-tertiary) — #646663',
    example: 'color="var(--error)"',
  },
];

export default function IconStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Icon</h1>
        <p className="page-header__lead">
          Inline SVG icon fed by the files in src/assets/svg/. Hardcoded fills and strokes are
          rebound to currentColor, so icons tint via the color prop — defaulting to
          var(--text-tertiary) (#646663), the gray they were drawn with.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Default 20px in the default gray (var(--text-tertiary))."
          code={'<LUIIcon name="user" />'}
        >
          <LUIIcon name="user" />
        </Story>

        <Story
          title="Size"
          description="A number is pixels; any CSS size string also works."
          code={`<LUIIcon name="settings" size={16} />
<LUIIcon name="settings" />
<LUIIcon name="settings" size={32} />
<LUIIcon name="settings" size="3rem" />`}
        >
          <div className="icon-row">
            <LUIIcon name="settings" size={16} />
            <LUIIcon name="settings" />
            <LUIIcon name="settings" size={32} />
            <LUIIcon name="settings" size="3rem" />
          </div>
        </Story>

        <Story
          title="Color"
          description={'Any CSS color or design token; color="inherit" follows the surrounding text color.'}
          code={`<LUIIcon name="notification" color="var(--accent)" />
<LUIIcon name="trash" color="var(--error)" />
<LUIIcon name="lock" color="var(--warn)" />
<span style={{ color: 'var(--info)' }}>
  <LUIIcon name="download" color="inherit" /> inherits
</span>`}
        >
          <div className="icon-row">
            <LUIIcon name="notification" color="var(--accent)" />
            <LUIIcon name="trash" color="var(--error)" />
            <LUIIcon name="lock" color="var(--warn)" />
            <span className="icon-inherit-demo" style={{ color: 'var(--info)' }}>
              <LUIIcon name="download" color="inherit" /> inherits
            </span>
          </div>
        </Story>

        <Story
          title="All icons"
          description={`Every file in src/assets/svg/ (${LUI_ICON_NAMES.length}) — the name prop is the file name.`}
          code={'<LUIIcon name="dashboard" />'}
        >
          <div className="icon-gallery">
            {LUI_ICON_NAMES.map((name) => (
              <div key={name} className="icon-gallery__cell" title={name}>
                <LUIIcon name={name} size={24} />
                <span className="icon-gallery__name">{name}</span>
              </div>
            ))}
          </div>
        </Story>

        <ApiTable
          component="LUIIcon"
          note="Renders the svg inline inside a span (aria-hidden by default) — all native span props (className, style, onClick, …) pass through. Dropping a new .svg file into src/assets/svg/ makes it available immediately; LUI_ICON_NAMES exports the full sorted list."
          inputs={apiInputs}
          outputs={[]}
        />
      </div>
    </div>
  );
}
