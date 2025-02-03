import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationsComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationsComponent;
  let fixture: ComponentFixture<PaginationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
