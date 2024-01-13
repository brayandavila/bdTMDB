import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbButtonComponent } from './imdb-button.component';

describe('ImdbButtonComponent', () => {
  let component: ImdbButtonComponent;
  let fixture: ComponentFixture<ImdbButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImdbButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImdbButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
