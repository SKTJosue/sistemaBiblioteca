import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLibroComponent } from './registrar-libro.component';

describe('RegistrarLibroComponent', () => {
  let component: RegistrarLibroComponent;
  let fixture: ComponentFixture<RegistrarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
