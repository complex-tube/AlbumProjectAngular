import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardWindowComponent } from './edit-card-window.component';

describe('EditCardWindowComponent', () => {
  let component: EditCardWindowComponent;
  let fixture: ComponentFixture<EditCardWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCardWindowComponent]
    });
    fixture = TestBed.createComponent(EditCardWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
