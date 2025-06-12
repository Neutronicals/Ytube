import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTools } from './pdf-tools';

describe('PdfTools', () => {
  let component: PdfTools;
  let fixture: ComponentFixture<PdfTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
