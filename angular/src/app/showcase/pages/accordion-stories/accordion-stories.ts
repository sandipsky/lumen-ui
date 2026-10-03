import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Accordion, AccordionItem } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-accordion-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Accordion, AccordionItem, Story, ApiTable],
  templateUrl: './accordion-stories.html',
  styleUrl: './accordion-stories.scss',
})
export class AccordionStories {
  protected readonly accordionApiInputs: ApiTableRow[] = [
    {
      name: 'multiple',
      description: 'Allow more than one panel to be open simultaneously. Default: single-open.',
      type: 'boolean',
      default: 'false',
      example: '[multiple]="true"',
    },
    {
      name: 'variant',
      description: "'contained' (one bordered list with dividers) or 'separated' (spaced cards).",
      type: "'contained' | 'separated'",
      default: "'contained'",
      example: 'variant="separated"',
    },
    {
      name: 'iconPosition',
      description: 'Which side the chevron sits on.',
      type: "'left' | 'right'",
      default: "'right'",
      example: 'iconPosition="left"',
    },
  ];

  protected readonly itemApiInputs: ApiTableRow[] = [
    {
      name: 'title',
      description: 'Header text. For richer headers, project content into the title slot instead.',
      type: 'string',
      default: "''",
      example: 'title="Shipping"',
    },
    {
      name: 'disabled',
      description: 'Disable toggling; the header is skipped by keyboard navigation.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'expanded',
      description:
        'Whether this item starts open (applied once, when it registers with the accordion).',
      type: 'boolean',
      default: 'false',
      example: '[expanded]="true"',
    },
    {
      name: 'id',
      description: 'Id for the header/panel pair; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="faq-shipping"',
    },
  ];

  protected readonly itemApiOutputs: ApiTableRow[] = [
    {
      name: 'openedChange',
      description: 'Emits the new open state whenever this item expands or collapses.',
      type: 'boolean',
      example: '(openedChange)="onOpen($event)"',
    },
  ];
}
