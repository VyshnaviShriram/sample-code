import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionportalComponent } from './pensionportal.component';

describe('PensionportalComponent', () => {
  let component: PensionportalComponent;
  let fixture: ComponentFixture<PensionportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
