import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIAvatar } from '@lumen-ui/react';

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

const row = { display: 'flex', gap: 12, alignItems: 'center' };

const meta = {
  title: 'Data Display/Avatar',
  component: LUIAvatar,
  args: {
    imageUrl: '',
    name: 'Ada Lovelace',
    size: '40px',
    color: 'var(--accent)',
    textColor: 'var(--text-white)',
  },
  argTypes: {
    imageUrl: { control: 'text', table: { defaultValue: { summary: "''" } } },
    name: { control: 'text', table: { defaultValue: { summary: "''" } } },
    size: { control: 'text', table: { defaultValue: { summary: "'32px'" } } },
    color: { control: 'text', table: { defaultValue: { summary: "'var(--accent)'" } } },
    textColor: { control: 'text', table: { defaultValue: { summary: "'var(--text-white)'" } } },
  },
} satisfies Meta<typeof LUIAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** With no image, the first and last initials render on a colored chip. */
export const Initials: Story = {
  render: () => (
    <div style={row}>
      <LUIAvatar name="Ada Lovelace" />
      <LUIAvatar name="Grace Hopper" />
      <LUIAvatar name="Linus" />
    </div>
  ),
};

/** When `imageUrl` is set it renders the image, cover-fit and circular. */
export const Image: Story = {
  args: { imageUrl: PORTRAIT, size: '48px' },
};

/** `size` accepts any CSS length and drives both width and height. */
export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <LUIAvatar name="Ada Lovelace" size="24px" />
      <LUIAvatar name="Ada Lovelace" size="40px" />
      <LUIAvatar name="Ada Lovelace" size="56px" />
    </div>
  ),
};

/** Tune the chip background and text color per avatar. */
export const CustomColors: Story = {
  render: () => (
    <div style={row}>
      <LUIAvatar name="Sofia Reyes" color="#AB20A9" textColor="#ffffff" size="40px" />
      <LUIAvatar name="Omar Diaz" color="#00B8D9" textColor="#ffffff" size="40px" />
      <LUIAvatar name="Mei Lin" color="#FFAB00" textColor="#07090F" size="40px" />
    </div>
  ),
};
