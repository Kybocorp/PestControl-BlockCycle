import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCycleComponent } from './block-cycle.component';

describe('BlockCycleComponent', () => {
  let component: BlockCycleComponent;
  let fixture: ComponentFixture<BlockCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
