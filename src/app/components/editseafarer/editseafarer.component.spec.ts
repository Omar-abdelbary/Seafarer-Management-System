import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditseafarerComponent } from './editseafarer.component';

describe('EditseafarerComponent', () => {
  let component: EditseafarerComponent;
  let fixture: ComponentFixture<EditseafarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditseafarerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditseafarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
