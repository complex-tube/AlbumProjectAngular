import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCardWindowComponent } from './add-new-card-window.component';

describe('AddNewCardWindowComponent', () => {
  let component: AddNewCardWindowComponent;
  let fixture: ComponentFixture<AddNewCardWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCardWindowComponent]
    });
    fixture = TestBed.createComponent(AddNewCardWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
