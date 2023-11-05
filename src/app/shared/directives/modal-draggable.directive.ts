import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ModalDraggable]',
})
export class ModalDraggableDirective {
  private isDragging = false;
  private startX = 50;
  private startY = 20;
  private windowWidth = 0;
  private windowHeight = 0;
  left = 50;
  top = 20;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.position = 'absolute';
    this.elementRef.nativeElement.style.cursor = 'move';
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.elementRef.nativeElement.style.left = `${this.left}%`;
    this.elementRef.nativeElement.style.top = `100px`;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const isCloseButtonClicked = this.isCloseButtonClicked(
      event.target as HTMLElement
    );
    if (!isCloseButtonClicked) {
      this.isDragging = true;
      this.startX = (event.clientX / this.windowWidth) * 100 - this.left;
      this.startY = (event.clientY / this.windowHeight) * 100 - this.top;
      event.stopPropagation();
    } else {
      console.log('cleared');

      this.resetModalPosition();
    }
  }
  private isCloseButtonClicked(target: HTMLElement): boolean {
    return target.classList.contains('btn-toggle-modal');
  }

  resetModalPosition() {
    setTimeout(() => {
      this.left = 50;
      this.top = 20;
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.elementRef.nativeElement.style.left = `${50}%`;
      this.elementRef.nativeElement.style.top = `100px`;
      this.startX = 0;
      this.startY = 0;
    }, 500);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.left = (event.clientX / this.windowWidth) * 100 - this.startX;
      this.top = (event.clientY / this.windowHeight) * 100 - this.startY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDomMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.left = (event.clientX / this.windowWidth) * 100 - this.startX;
      this.top = (event.clientY / this.windowHeight) * 100 - this.startY;
      this.elementRef.nativeElement.style.left = `${this.left}%`;
      this.elementRef.nativeElement.style.top = `${this.top}%`;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.startX = (event.clientX / this.windowWidth) * 100 - this.left;
    this.startY = (event.clientY / this.windowHeight) * 100 - this.top;
    this.elementRef.nativeElement.style.top = `${this.top}%`;
    // console.log('Top: ', this.top);
    // console.log('Left: ', this.left);
    // console.log('windowHeight: ', this.windowHeight);
    // console.log('windowWidth: ', this.windowWidth);
    // if (this.left < 0) {
    //   this.left+=10;
    //   this.elementRef.nativeElement.style.left = `${this.left}%`;
    //   console.warn('left');
    // }
    // if (this.left > 99) {
    //   this.left-=10;
    //   this.elementRef.nativeElement.style.left = `${this.left}%`;
    //   console.warn('right');
    // }
    // if (this.top > 90) {
    //   this.top-=10;
    //   this.elementRef.nativeElement.style.top = `${this.top}%`;
    //   console.warn('top');
    // }
    // if (this.top < 0) {
    //   this.top+=10;
    //   this.elementRef.nativeElement.style.top = `${this.top}%`;
    //   console.warn('down');
    // }
  }
}
