import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import {Class} from "../consts/class";
import {BaseComponent} from "./base-component";


@Directive()
export abstract class Window extends BaseComponent implements OnInit, OnDestroy {

  static readonly windowQueue: Window[] = [];

  @ViewChild('outerWindow') set outerWindow(outerWindow: ElementRef) {
    if (outerWindow) {
      outerWindow.nativeElement.style.marginTop = this.scrollTop + "px";
    }
  }

  @ViewChild('outerWindow')
  outerRef!: ElementRef;

  @ViewChild('innerWindow')
  innerWindow!: ElementRef;

  @Input()
  protected config!: WindowConfig;

  protected scrollTop: number = 0;

  protected readonly BASE_DELAY: number = 10;

  protected isEnterEnabled: boolean = false;

  protected constructor(protected renderer: Renderer2, protected isFixed: boolean = false, protected addToQueue: boolean = true) {
    super();
  }

  ngOnInit(): void {
    this.scrollTop = window.scrollY;
    if (this.addToQueue) {
      Window.windowQueue.push(this);
    }
    if (this.isFixed) {
      this.fixBody();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.scrollY < this.scrollTop && this.outerRef && this.outerRef.nativeElement) {
      window.scrollTo(0, this.scrollTop);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPressed(event: any) {
    if (this.isEnterEnabled && Window.windowQueue.length > 0 && Window.windowQueue[Window.windowQueue.length - 1] == this) {
      event.stopPropagation();
      event.preventDefault();
      this.config.onWindowClosed();
    }
  }

  ngOnDestroy(): void {
    if (Window.windowQueue.includes(this)) {
      Window.windowQueue.splice(Window.windowQueue.indexOf(this), 1);
    }
    if (this.isFixed) {
      this.unfixBody();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePressed() {
    if (Window.windowQueue.length > 0 && Window.windowQueue[Window.windowQueue.length - 1] == this) {
      this.config.onWindowClosed();
    }
  }

  protected fixBody(): void {
    this.renderer.addClass(document.body, Class.NO_SCROLL);
    document.body.scrollTo({left: 0, top: this.scrollTop});
  }

  protected unfixBody(): void {
    this.renderer.removeClass(document.body, Class.NO_SCROLL);
  }
}

export interface WindowConfig {
  onWindowClosed: Function,
  onSuccess?: Function
}
