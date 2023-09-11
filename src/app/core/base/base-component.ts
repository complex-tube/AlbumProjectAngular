import {Directive, HostListener} from "@angular/core";

@Directive()
export abstract class BaseComponent {

  @HostListener('window:resize')
  private onWindowResize() {
    this.isMobile = window.innerWidth <= 425;
  }

  isMobile: boolean = window.innerWidth <= 425;
}
