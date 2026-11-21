import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Voyages } from './voyages';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Voyages', () => {
  let component: Voyages;
  let fixture: ComponentFixture<Voyages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Voyages], // Importe le composant standalone 'Voyages'
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Voyages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});