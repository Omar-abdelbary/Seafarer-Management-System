import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewseafarerComponent } from './addnewseafarer.component';

describe('AddnewseafarerComponent', () => {
  let component: AddnewseafarerComponent;
  let fixture: ComponentFixture<AddnewseafarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnewseafarerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewseafarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
