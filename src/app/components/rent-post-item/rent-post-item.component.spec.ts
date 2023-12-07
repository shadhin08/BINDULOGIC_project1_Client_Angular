import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPostItemComponent } from './rent-post-item.component';

describe('RentPostItemComponent', () => {
  let component: RentPostItemComponent;
  let fixture: ComponentFixture<RentPostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentPostItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
