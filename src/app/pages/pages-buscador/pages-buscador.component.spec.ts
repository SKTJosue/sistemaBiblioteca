import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBuscadorComponent } from './pages-buscador.component';

describe('PagesBuscadorComponent', () => {
  let component: PagesBuscadorComponent;
  let fixture: ComponentFixture<PagesBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesBuscadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
