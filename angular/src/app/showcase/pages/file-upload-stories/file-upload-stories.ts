import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FileUpload, UploadFile } from '../../../shared/components/ui/file-upload/file-upload';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-file-upload-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileUpload, Story, ApiTable],
  templateUrl: './file-upload-stories.html',
  styleUrl: './file-upload-stories.scss',
})
export class FileUploadStories {
  private readonly _timers = new Set<ReturnType<typeof setInterval>>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this._timers.forEach((t) => clearInterval(t));
      this._timers.clear();
    });
  }

  /** Fake an upload so the progress bars animate to completion. */
  protected simulate(files: UploadFile[], uploader: FileUpload): void {
    for (const item of files) {
      uploader.patchFile(item.id, { status: 'uploading', progress: 0 });
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.round(8 + progress / 8);
        if (progress >= 100) {
          clearInterval(timer);
          this._timers.delete(timer);
          uploader.patchFile(item.id, { status: 'success', progress: 100 });
        } else {
          uploader.patchFile(item.id, { progress });
        }
      }, 220);
      this._timers.add(timer);
    }
  }

  protected readonly apiInputs: ApiTableRow[] = [
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
      example: '[multiple]="false"',
    },
    {
      name: 'maxSizeMb',
      description: 'Reject files larger than this many megabytes (0 = no limit).',
      type: 'number',
      default: '0',
      example: '[maxSizeMb]="5"',
    },
    {
      name: 'maxCount',
      description: 'Cap the number of files kept (0 = no limit).',
      type: 'number',
      default: '0',
      example: '[maxCount]="3"',
    },
    {
      name: 'disabled',
      description: 'Block browsing and drops.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
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
      description: 'The tracked files — two-way.',
      type: 'UploadFile[]',
      default: '[]',
      example: '[(files)]="files"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'added',
      description: 'Accepted files, as they are added. Kick off your upload here.',
      type: 'UploadFile[]',
      example: '(added)="upload($event)"',
    },
    {
      name: 'removed',
      description: 'Emits the file removed via its remove control.',
      type: 'UploadFile',
      example: '(removed)="onRemove($event)"',
    },
    {
      name: 'rejected',
      description: "Emits each rejected file with why: 'type', 'size' or 'count'.",
      type: '{ file: File; reason: RejectReason }',
      example: '(rejected)="onReject($event)"',
    },
  ];
}
