import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinpercontractComponent } from './vinpercontract.component';

describe('VinpercontractComponent', () => {
  let component: VinpercontractComponent;
  let fixture: ComponentFixture<VinpercontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinpercontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinpercontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
