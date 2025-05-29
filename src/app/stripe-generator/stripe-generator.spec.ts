import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeGenerator } from './stripe-generator';

describe('StripeGenerator', () => {
  let component: StripeGenerator;
  let fixture: ComponentFixture<StripeGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StripeGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripeGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
