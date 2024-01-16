import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPeopleComponent } from './horizontal-people.component';

describe('HorizontalPeopleComponent', () => {
  let component: HorizontalPeopleComponent;
  let fixture: ComponentFixture<HorizontalPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
