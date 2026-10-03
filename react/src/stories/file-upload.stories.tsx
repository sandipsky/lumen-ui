import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIFileUpload, type LUIFileUploadRef, type UploadFile } from '@lumen-ui/react';

/** Build a tracked file for the pre-filled stories (no real upload behind it). */
function sampleFile(
  name: string,
  type: string,
  sizeKb: number,
  patch: Partial<UploadFile> = {},
): UploadFile {
  const file = new File([new Uint8Array(sizeKb * 1024)], name, { type });
  return {
    id: name,
    file,
    name,
    size: file.size,
    type,
    status: 'success',
    progress: 100,
    ...patch,
  };
}

/** A flat-colour SVG as a data URL, standing in for an image thumbnail. */
function swatch(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" fill="${color}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const meta = {
  title: 'Form Inputs/File Upload',
  component: LUIFileUpload,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    accept: '',
    multiple: true,
    maxSizeMb: 0,
    maxCount: 0,
    disabled: false,
    variant: 'dropzone',
    listType: 'list',
    label: 'Click or drag files here to upload',
    hint: '',
    onAdded: fn(),
    onRemoved: fn(),
    onRejected: fn(),
    onFilesChange: fn(),
  },
  argTypes: {
    accept: { control: 'text', table: { defaultValue: { summary: "''" } } },
    multiple: {
      control: 'boolean',
      description: 'Allow several files; when false a new selection replaces the current file.',
      table: { defaultValue: { summary: 'true' } },
    },
    maxSizeMb: { control: 'number', table: { defaultValue: { summary: '0' } } },
    maxCount: { control: 'number', table: { defaultValue: { summary: '0' } } },
    disabled: {
      control: 'boolean',
      description: 'Block browsing and drops.',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['dropzone', 'button'],
      description: 'Full drag-and-drop dropzone or a compact button trigger.',
      table: { defaultValue: { summary: "'dropzone'" } },
    },
    listType: {
      control: 'inline-radio',
      options: ['list', 'grid'],
      description: 'Render the selected files as rows or as thumbnail cards.',
      table: { defaultValue: { summary: "'list'" } },
    },
    label: {
      control: 'text',
      table: { defaultValue: { summary: "'Click or drag files here to upload'" } },
    },
    hint: { control: 'text', table: { defaultValue: { summary: "''" } } },
    // Holds `File` objects, which can't be edited from a control — see the WithFiles story.
    files: { control: false },
    ref: { control: false },
  },
} satisfies Meta<typeof LUIFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Rows with per-file status: done, uploading, failed and waiting. */
export const WithFiles: Story = {
  render: function Render() {
    const [files, setFiles] = useState(() => [
      sampleFile('quarterly-report.pdf', 'application/pdf', 820),
      sampleFile('team-photo.png', 'image/png', 1460, {
        status: 'uploading',
        progress: 45,
        url: swatch('#93c5fd'),
      }),
      sampleFile('budget.xlsx', 'application/vnd.ms-excel', 96, {
        status: 'error',
        progress: 0,
        error: 'Upload failed',
      }),
      sampleFile('notes.txt', 'text/plain', 2, { status: 'pending', progress: 0 }),
    ]);
    return <LUIFileUpload files={files} onFilesChange={setFiles} />;
  },
};

/** `accept="image/*"` with `listType="grid"`. New files run a fake upload so progress animates. */
export const ImageGrid: Story = {
  render: function Render() {
    const uploader = useRef<LUIFileUploadRef>(null);
    const [files, setFiles] = useState(() => [
      sampleFile('mountains.png', 'image/png', 640, { url: swatch('#86efac') }),
      sampleFile('lake.jpg', 'image/jpeg', 910, { url: swatch('#93c5fd') }),
    ]);

    // Fake an upload so the progress bars animate to completion.
    const simulate = (added: UploadFile[]) => {
      for (const item of added) {
        let progress = 0;
        uploader.current?.patchFile(item.id, { status: 'uploading', progress });
        const timer = setInterval(() => {
          progress = Math.min(100, progress + 12);
          uploader.current?.patchFile(
            item.id,
            progress < 100 ? { progress } : { status: 'success', progress },
          );
          if (progress === 100) clearInterval(timer);
        }, 200);
      }
    };

    return (
      <LUIFileUpload
        ref={uploader}
        accept="image/*"
        listType="grid"
        label="Drop images here or click to browse"
        maxSizeMb={5}
        files={files}
        onFilesChange={setFiles}
        onAdded={simulate}
      />
    );
  },
};

/** A compact button with the file list below. */
export const ButtonTrigger: Story = {
  args: { variant: 'button', accept: '.pdf,.doc,.docx', maxSizeMb: 10 },
};

/** A new selection replaces the current file. */
export const SingleFile: Story = {
  args: { multiple: false, accept: 'image/*' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
