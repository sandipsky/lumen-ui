import { useEffect, useRef } from 'react';
import {
  LUIFileUpload,
  type LUIFileUploadRef,
  type UploadFile,
} from '../../../components/ui/file-upload/file-upload';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './file-upload-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'accept',
    description: "Native accept filter, e.g. 'image/*' or '.pdf,.docx'.",
    type: 'string',
    default: "''",
    example: 'accept="image/*"',
  },
  {
    name: 'multiple',
    description: 'Allow several files; when false a new selection replaces the current file.',
    type: 'boolean',
    default: 'true',
    example: 'multiple={false}',
  },
  {
    name: 'maxSizeMb',
    description: 'Reject files larger than this many megabytes (0 = no limit).',
    type: 'number',
    default: '0',
    example: 'maxSizeMb={5}',
  },
  {
    name: 'maxCount',
    description: 'Cap the number of files kept (0 = no limit).',
    type: 'number',
    default: '0',
    example: 'maxCount={3}',
  },
  {
    name: 'disabled',
    description: 'Block browsing and drops.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'variant',
    description: 'Full drag-and-drop dropzone or a compact button trigger.',
    type: "'dropzone' | 'button'",
    default: "'dropzone'",
    example: 'variant="button"',
  },
  {
    name: 'listType',
    description: 'Render the selected files as rows or as thumbnail cards.',
    type: "'list' | 'grid'",
    default: "'list'",
    example: 'listType="grid"',
  },
  {
    name: 'label',
    description: 'Primary line inside the dropzone.',
    type: 'string',
    default: "'Click or drag files here to upload'",
    example: 'label="Drop images here"',
  },
  {
    name: 'hint',
    description: 'Secondary hint (defaults to a summary of the accept/size limits).',
    type: 'string',
    default: "''",
    example: 'hint="PNG or JPG only"',
  },
  {
    name: 'files',
    description: 'The tracked files — controlled when provided (pair with onFilesChange).',
    type: 'UploadFile[]',
    default: '[]',
    example: 'files={files}',
  },
  {
    name: 'ref',
    description: 'Imperative handle exposing patchFile(id, patch) and clear().',
    type: 'Ref<LUIFileUploadRef>',
    default: '—',
    example: 'ref={uploaderRef}',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onFilesChange',
    description:
      'Fires with the full list whenever it changes (the Angular two-way files model).',
    type: 'UploadFile[]',
    example: 'onFilesChange={setFiles}',
  },
  {
    name: 'onAdded',
    description: 'Accepted files, as they are added. Kick off your upload here.',
    type: 'UploadFile[]',
    example: 'onAdded={(files) => upload(files)}',
  },
  {
    name: 'onRemoved',
    description: 'Called with the file removed via its remove control.',
    type: 'UploadFile',
    example: 'onRemoved={(file) => onRemove(file)}',
  },
  {
    name: 'onRejected',
    description: "Called for each rejected file with why: 'type', 'size' or 'count'.",
    type: '{ file: File; reason: RejectReason }',
    example: 'onRejected={(rejection) => onReject(rejection)}',
  },
];

export default function FileUploadStories() {
  const uploaderRef = useRef<LUIFileUploadRef>(null);
  const timersRef = useRef<Set<ReturnType<typeof setInterval>>>(new Set());

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearInterval(timer));
      timers.clear();
    };
  }, []);

  /** Fake an upload so the progress bars animate to completion. */
  const simulate = (files: UploadFile[]): void => {
    for (const item of files) {
      uploaderRef.current?.patchFile(item.id, { status: 'uploading', progress: 0 });
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.round(8 + progress / 8);
        if (progress >= 100) {
          clearInterval(timer);
          timersRef.current.delete(timer);
          uploaderRef.current?.patchFile(item.id, { status: 'success', progress: 100 });
        } else {
          uploaderRef.current?.patchFile(item.id, { progress });
        }
      }, 220);
      timersRef.current.add(timer);
    }
  };

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">File Upload</h1>
        <p className="page-header__lead">
          Image / file upload with a drag-and-drop dropzone (or a compact button trigger), inspired
          by Ant Design's <code>Upload</code>. Validates by <code>accept</code>,{' '}
          <code>maxSizeMb</code> and <code>maxCount</code>, previews images, and renders a{' '}
          <code>list</code> or <code>grid</code> with per-file progress and a remove control. It's
          presentational — handle <code>onAdded</code> to run your real upload and report back
          through the ref's <code>patchFile()</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Dropzone"
          description="Click or drag files in. Multiple files, 5 MB each."
          code={'<LUIFileUpload multiple maxSizeMb={5} />'}
        >
          <LUIFileUpload multiple maxSizeMb={5} />
        </Story>

        <Story
          title="Images with grid preview + simulated upload"
          description="accept='image/*' with listType='grid'. onAdded kicks off a fake upload so progress animates to done."
          code={`const uploaderRef = useRef<LUIFileUploadRef>(null);

<LUIFileUpload
  ref={uploaderRef}
  accept="image/*"
  listType="grid"
  maxSizeMb={5}
  onAdded={(files) => simulate(files)}
/>`}
        >
          <LUIFileUpload
            ref={uploaderRef}
            accept="image/*"
            listType="grid"
            label="Drop images here or click to browse"
            maxSizeMb={5}
            onAdded={simulate}
          />
        </Story>

        <Story
          title="Button trigger"
          description="variant='button' shows a compact button with the file list below."
          code={'<LUIFileUpload variant="button" accept=".pdf,.doc,.docx" />'}
        >
          <LUIFileUpload variant="button" accept=".pdf,.doc,.docx" maxSizeMb={10} />
        </Story>

        <Story
          title="Single file"
          description="multiple={false} — a new selection replaces the current file."
          code={'<LUIFileUpload multiple={false} accept="image/*" />'}
        >
          <LUIFileUpload multiple={false} accept="image/*" />
        </Story>

        <Story
          title="Disabled"
          description="disabled blocks browsing and drops."
          code={'<LUIFileUpload disabled />'}
        >
          <LUIFileUpload disabled />
        </Story>

        <ApiTable
          component="LUIFileUpload"
          note="UploadFile = { id, file, name, size, type, status, progress, url?, error? }. Presentational — handle onAdded to run your real upload, report back through the ref's patchFile(id, patch), and remove everything with clear()."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
