import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentPostComponent } from './create-rent-post.component';

describe('CreateRentPostComponent', () => {
  let component: CreateRentPostComponent;
  let fixture: ComponentFixture<CreateRentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRentPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
