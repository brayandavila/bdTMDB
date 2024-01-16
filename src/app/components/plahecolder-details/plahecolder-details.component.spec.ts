import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlahecolderDetailsComponent } from './plahecolder-details.component';

describe('PlahecolderDetailsComponent', () => {
  let component: PlahecolderDetailsComponent;
  let fixture: ComponentFixture<PlahecolderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlahecolderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlahecolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
