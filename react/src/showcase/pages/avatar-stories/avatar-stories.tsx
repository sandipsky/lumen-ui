import { LUIAvatar } from '../../../components/ui/avatar/avatar';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './avatar-stories.css';

const avatarImg = 'https://i.pravatar.cc/120?img=5';

const apiInputs: ApiTableRow[] = [
  {
    name: 'imageUrl',
    description: 'Image source; when empty, the initials fallback is shown.',
    type: 'string | null',
    default: "''",
    example: 'imageUrl={url}',
  },
  {
    name: 'name',
    description: 'Full name used to derive the fallback initials (first + last).',
    type: 'string',
    default: "''",
    example: 'name="Ada Lovelace"',
  },
  {
    name: 'size',
    description: 'Any CSS length, applied to both width and height.',
    type: 'string',
    default: "'32px'",
    example: 'size="48px"',
  },
  {
    name: 'color',
    description: 'Background color of the initials chip.',
    type: 'string',
    default: "'var(--accent)'",
    example: 'color="#AB20A9"',
  },
  {
    name: 'textColor',
    description: 'Text color of the initials chip.',
    type: 'string',
    default: "'var(--text-white)'",
    example: 'textColor="#ffffff"',
  },
];

export default function AvatarStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Avatar</h1>
        <p className="page-header__lead">
          Compact user / entity avatar. Shows <code>imageUrl</code> when provided, otherwise
          derives initials from <code>name</code> on a solid color chip. <code>size</code> takes
          any CSS length, and the initials chip colors come from <code>color</code> /{' '}
          <code>textColor</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Initials"
          description="With no image, the first + last initial render on a colored chip."
          code={`<LUIAvatar name="Ada Lovelace" />
<LUIAvatar name="Grace Hopper" />
<LUIAvatar name="Linus" />`}
        >
          <LUIAvatar name="Ada Lovelace" />
          <LUIAvatar name="Grace Hopper" />
          <LUIAvatar name="Linus" />
        </Story>

        <Story
          title="Image"
          description="When imageUrl is set it renders the image, cover-fit and circular."
          code={`<LUIAvatar imageUrl={url} name="Ada Lovelace" size="48px" />`}
        >
          <LUIAvatar imageUrl={avatarImg} name="Ada Lovelace" size="48px" />
        </Story>

        <Story
          title="Sizes"
          description="size accepts any CSS length and drives both width and height."
          code={`<LUIAvatar name="Ada Lovelace" size="24px" />
<LUIAvatar name="Ada Lovelace" size="40px" />
<LUIAvatar name="Ada Lovelace" size="56px" />`}
        >
          <LUIAvatar name="Ada Lovelace" size="24px" />
          <LUIAvatar name="Ada Lovelace" size="40px" />
          <LUIAvatar name="Ada Lovelace" size="56px" />
        </Story>

        <Story
          title="Custom colors"
          description="Tune the chip background and text color per avatar."
          code={`<LUIAvatar name="Sofia Reyes" color="#AB20A9" textColor="#ffffff" />`}
        >
          <LUIAvatar name="Sofia Reyes" color="#AB20A9" textColor="#ffffff" size="40px" />
          <LUIAvatar name="Omar Diaz" color="#00B8D9" textColor="#ffffff" size="40px" />
          <LUIAvatar name="Mei Lin" color="#FFAB00" textColor="#07090F" size="40px" />
        </Story>

        <ApiTable
          component="LUIAvatar"
          note="Purely presentational — no callbacks. With no image, the first and last initials of name render on the color/textColor chip."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
