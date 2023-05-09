import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTVComponent } from './smart-t-v.component';

describe('SmartTVComponent', () => {
  let component: SmartTVComponent;
  let fixture: ComponentFixture<SmartTVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartTVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
