import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWindowsComponent } from './card-windows.component';

describe('CardWindowsComponent', () => {
  let component: CardWindowsComponent;
  let fixture: ComponentFixture<CardWindowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardWindowsComponent]
    });
    fixture = TestBed.createComponent(CardWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
