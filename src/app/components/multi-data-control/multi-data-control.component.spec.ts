import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDataControlComponent } from './multi-data-control.component';

describe('MultiDataInputComponent', () => {
  let component: MultiDataControlComponent;
  let fixture: ComponentFixture<MultiDataControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDataControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDataControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
