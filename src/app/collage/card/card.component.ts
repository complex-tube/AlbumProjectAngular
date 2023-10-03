import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from '../../core/models/card.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditCardWindowSelectors } from '../../core/selectors/edit-card-window.selectors';
import { ViewCardWindowActions } from '../../core/actions/view-card-window.actions';

@Component({
  selector: 'album-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input()
  card!: Card;

  @ViewChild('cardElement')
  cardElement!: ElementRef;

  editWindowShown$!: Observable<boolean>;

  constructor(private store: Store) {
    this.editWindowShown$ = this.store.select(EditCardWindowSelectors.selectEditCardWindowShown);
  }

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

  onClick(): void {
    console.log('card item view card show window dispatch');
    this.store.dispatch(ViewCardWindowActions.showWindow({card: this.card}));
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
