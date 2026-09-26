import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { TooltipDirective } from '../../../shared/components/ui/tooltip/tooltip.directive';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tooltip-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, Story, Button, ApiTable],
  templateUrl: './tooltip-stories.html',
  styleUrl: './tooltip-stories.scss',
})
export class TooltipStories {
  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'lTooltip',
      description: 'The tooltip text; an empty string disables the tooltip.',
      type: 'string',
      default: "''",
      example: 'lTooltip="Delete item"',
    },
    {
      name: 'lTooltipPlacement',
      description:
        'Preferred placement — a side plus optional start/end alignment; flips to the opposite side when it would overflow the viewport.',
      type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
      default: "'top'",
      example: 'lTooltipPlacement="bottomLeft"',
    },
    {
      name: 'lTooltipTrigger',
      description:
        'What reveals the tooltip — hover and focus triggers both also open on keyboard focus.',
      type: "'hover' | 'focus' | 'click'",
      default: "'hover'",
      example: 'lTooltipTrigger="click"',
    },
    {
      name: 'lTooltipDisabled',
      description: 'Suppress the tooltip without removing the directive.',
      type: 'boolean',
      default: 'false',
      example: '[lTooltipDisabled]="true"',
    },
    {
      name: 'lTooltipArrow',
      description: 'Render the arrow pointing at the trigger.',
      type: 'boolean',
      default: 'true',
      example: '[lTooltipArrow]="false"',
    },
    {
      name: 'lTooltipColor',
      description: 'Any CSS color/token for the bubble background.',
      type: 'string',
      default: "''",
      example: 'lTooltipColor="var(--error)"',
    },
    {
      name: 'lTooltipMaxWidth',
      description:
        'Max bubble width in px before the text wraps; when unset, the style default (240px) applies.',
      type: 'number | null',
      default: 'null',
      example: '[lTooltipMaxWidth]="320"',
    },
    {
      name: 'lTooltipOpenDelay',
      description: 'Delay before showing, in ms.',
      type: 'number',
      default: '120',
      example: '[lTooltipOpenDelay]="300"',
    },
    {
      name: 'lTooltipCloseDelay',
      description: 'Delay before hiding, in ms.',
      type: 'number',
      default: '80',
      example: '[lTooltipCloseDelay]="0"',
    },
  ];
}
