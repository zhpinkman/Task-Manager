import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedTaskComponent } from './opened-task.component';

describe('OpenedTaskComponent', () => {
  let component: OpenedTaskComponent;
  let fixture: ComponentFixture<OpenedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
