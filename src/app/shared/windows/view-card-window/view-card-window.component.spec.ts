import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardWindowComponent } from './view-card-window.component';

describe('ViewCardWindowComponent', () => {
  let component: ViewCardWindowComponent;
  let fixture: ComponentFixture<ViewCardWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCardWindowComponent]
    });
    fixture = TestBed.createComponent(ViewCardWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
