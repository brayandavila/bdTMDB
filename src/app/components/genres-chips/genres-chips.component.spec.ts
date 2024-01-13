import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresChipsComponent } from './genres-chips.component';

describe('GenresChipsComponent', () => {
  let component: GenresChipsComponent;
  let fixture: ComponentFixture<GenresChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenresChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
