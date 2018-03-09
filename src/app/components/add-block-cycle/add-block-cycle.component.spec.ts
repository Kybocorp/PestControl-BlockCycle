import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockCycleComponent } from './add-block-cycle.component';

describe('AddBlockCycleComponent', () => {
  let component: AddBlockCycleComponent;
  let fixture: ComponentFixture<AddBlockCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlockCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlockCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
