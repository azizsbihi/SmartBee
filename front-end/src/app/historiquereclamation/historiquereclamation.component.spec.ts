import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquereclamationComponent } from './historiquereclamation.component';

describe('HistoriquereclamationComponent', () => {
  let component: HistoriquereclamationComponent;
  let fixture: ComponentFixture<HistoriquereclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquereclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquereclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
