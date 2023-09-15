import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import {BaseComponent} from "./base-component";


@Directive()
export abstract class Window extends BaseComponent implements OnInit, OnDestroy{

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

  protected constructor(protected renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    console.log();
  }

  ngOnDestroy() {
    console.log();
  }
}

export interface WindowConfig {
  onWindowClosed: Function,
  onSuccess?: Function
}
