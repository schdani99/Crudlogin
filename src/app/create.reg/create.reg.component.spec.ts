import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegComponent } from './create.reg.component';

describe('CreateRegComponent', () => {
  let component: CreateRegComponent;
  let fixture: ComponentFixture<CreateRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
