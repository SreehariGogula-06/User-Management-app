import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input('appHighlight') color = '#f3f4f6'; // light gray
  @HostBinding('style.backgroundColor') bg?: string;

  @HostListener('mouseenter') onEnter() {
    this.bg = this.color;
  }

  @HostListener('mouseleave') onLeave() {
    this.bg = undefined;
  }
}
