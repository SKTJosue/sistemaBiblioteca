import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEditorialComponent } from './registro-editorial.component';

describe('RegistroEditorialComponent', () => {
  let component: RegistroEditorialComponent;
  let fixture: ComponentFixture<RegistroEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEditorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
