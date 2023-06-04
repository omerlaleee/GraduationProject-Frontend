import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsDetailComponent } from './maps-detail.component';

describe('MapsDetailComponent', () => {
  let component: MapsDetailComponent;
  let fixture: ComponentFixture<MapsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
