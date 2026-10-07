import { Avatar } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

/** Inline placeholder portrait, so the story works offline. */
const PORTRAIT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#00b8d9"/>' +
      '</linearGradient></defs>' +
      '<rect width="120" height="120" fill="url(#g)"/>' +
      '<circle cx="60" cy="48" r="22" fill="#fff" fill-opacity=".9"/>' +
      '<path d="M20 120c4-26 20-40 40-40s36 14 40 40z" fill="#fff" fill-opacity=".9"/>' +
      '</svg>',
  );

const meta: Meta<Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  args: {
    imageUrl: '',
    name: 'Ada Lovelace',
    size: '40px',
    color: 'var(--accent)',
    textColor: 'var(--accent-contrast)',
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description:
        'Image source; when empty, the initials fallback is shown. A `model()`, so it is two-way bindable.',
      table: { defaultValue: { summary: "''" } },
    },
    name: {
      control: 'text',
      description: 'Full name used to derive the fallback initials (first + last).',
      table: { defaultValue: { summary: "''" } },
    },
    size: {
      control: 'text',
      description: 'Any CSS length, applied to both width and height.',
      table: { defaultValue: { summary: "'32px'" } },
    },
    color: {
      control: 'text',
      description: 'Background color of the initials chip.',
      table: { defaultValue: { summary: "'var(--accent)'" } },
    },
    textColor: {
      control: 'text',
      description: 'Text color of the initials chip.',
      table: { defaultValue: { summary: "'var(--accent-contrast)'" } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-avatar ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Avatar>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** With no image, the first and last initials render on a colored chip. */
export const Initials: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center">
        <l-avatar name="Ada Lovelace" />
        <l-avatar name="Grace Hopper" />
        <l-avatar name="Linus" />
      </div>
    `,
  }),
};

/** When `imageUrl` is set it renders the image, cover-fit and circular. */
export const Image: Story = {
  args: { imageUrl: PORTRAIT, size: '48px' },
};

/** `size` accepts any CSS length and drives both width and height. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center">
        <l-avatar name="Ada Lovelace" size="24px" />
        <l-avatar name="Ada Lovelace" size="40px" />
        <l-avatar name="Ada Lovelace" size="56px" />
      </div>
    `,
  }),
};

/** Tune the chip background and text color per avatar. */
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center">
        <l-avatar name="Sofia Reyes" color="#AB20A9" textColor="#ffffff" size="40px" />
        <l-avatar name="Omar Diaz" color="#00B8D9" textColor="#ffffff" size="40px" />
        <l-avatar name="Mei Lin" color="#FFAB00" textColor="#07090F" size="40px" />
      </div>
    `,
  }),
};
