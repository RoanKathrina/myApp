import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormPage } from './survey-form.page';

describe('SurveyFormPage', () => {
  let component: SurveyFormPage;
  let fixture: ComponentFixture<SurveyFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
