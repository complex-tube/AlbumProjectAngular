import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from '../../../core/models/card.model';

@Component({
  selector: 'album-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input()
  card!: Card;

  @ViewChild('cardElement')
  cardElement!: ElementRef;

  onMouseMove(eventTarget: MouseEvent): void {
    const rotateValues = this.getRotateValues(eventTarget);
    this.cardElement.nativeElement.setAttribute(
      'style',
      `transform: rotateX(${rotateValues.x}deg) rotateY(${rotateValues.y}deg);`,
    );
  }

  onMouseOver(eventTarget: MouseEvent): void {
    const rotateValues = this.getRotateValues(eventTarget);
    this.cardElement.nativeElement.setAttribute(
      'style',
      `transform: rotateX(${rotateValues.x}deg) rotateY(${rotateValues.y}deg);`,
    );
  }

  onMouseLeave(): void {
    this.cardElement.nativeElement.removeAttribute('style');
  }

  private getRotateValues(eventTarget: MouseEvent): { x: number; y: number } {
    const maxAngle: number = 10;

    const boundingCardRect = this.cardElement.nativeElement.getBoundingClientRect();

    const cardParams = {
      x: boundingCardRect.x,
      y: boundingCardRect.y,
      width: boundingCardRect.width,
      height: boundingCardRect.height,
    };

    const offset: { x: number; y: number } = {
      x: eventTarget.pageX - cardParams.x - cardParams.width / 2,
      y: eventTarget.pageY - cardParams.y - cardParams.height / 2,
    };

    return {
      x: -((maxAngle / (cardParams.height / 2)) * offset.y),
      y: (maxAngle / (cardParams.width / 2)) * offset.x,
    };
  }
}
