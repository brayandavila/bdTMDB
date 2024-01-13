import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOrNotDataComponent } from './loading-or-not-data.component';

describe('LoadingOrNotDataComponent', () => {
  let component: LoadingOrNotDataComponent;
  let fixture: ComponentFixture<LoadingOrNotDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingOrNotDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingOrNotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
