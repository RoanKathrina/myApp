import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReportPage } from './survey-report.page';

describe('SurveyReportPage', () => {
  let component: SurveyReportPage;
  let fixture: ComponentFixture<SurveyReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
