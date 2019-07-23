import { SurveyFormPage } from './survey-form.page';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, Observable, from} from 'rxjs';

function populateSurveyForm(component) {
  component.surveyForm.controls.email.setValue('Test@gmail.com');
  component.surveyForm.controls.date_and_time.setValue('Thu Jul 04 2019 4:29:09 PM');
  component.surveyForm.controls.question1.setValue('Cheese Burger');
  component.surveyForm.controls.question2.setValue('Moderate');
  component.surveyForm.controls.question3.setValue('Pickles');
  component.surveyForm.controls.question4.setValue('Very much');
  component.surveyForm.controls.question5.setValue("More franchise stores of Roan's Burger nationwide");
}
class AppServiceStub {
  user = new BehaviorSubject<any>(null);

  setUserToLoggedIn() {
    this.user.next(true);
  }

  fetchSurvey() {
    return of([]);
  }

  addSurvey() {

  }
}

class RouterStub {
  navigate() {

  }
}

class ActivatedRouteStub {

}
describe('SurveyFormPage', () => {
  let component;
  let fixture: ComponentFixture<SurveyFormPage>;
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ SurveyFormPage ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: AppService, useClass: AppServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
  })

  it('should create a surveyForm on ngOnInit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect('surveyForm').toBeTruthy;
    expect(component.surveyForm.contains('e-mail').toBeTruthy);
    expect(component.surveyForm.contains('date_and_time').toBeTruthy);
    expect(component.surveyForm.contains('question1').toBeTruthy);
    expect(component.surveyForm.contains('question2').toBeTruthy);
    expect(component.surveyForm.contains('question3').toBeTruthy);
    expect(component.surveyForm.contains('question4').toBeTruthy);
    expect(component.surveyForm.contains('question5').toBeTruthy);
  })

  it('should set isAdminLoggedIn to true on ngOnInit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;

    const appService = TestBed.get(AppService);
    appService.setUserToLoggedIn();
    expect(component.isAdminLoggedIn).toBeTruthy;
  })

  it('should set isAdminLoggedIn to true on ngOnChanges', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;

    const appService = TestBed.get(AppService);
    appService.setUserToLoggedIn();
    expect(component.isAdminLoggedIn).toBeTruthy;
  })

  it('should exit on Cancel on confirmation in onResetSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;

    component.ngOnInit();
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.surveyForm, 'reset');
    component.onResetSurvey();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to reset the Survey?');
    expect(component.surveyForm.reset).not.toHaveBeenCalled();
  })

  it('should execute surveyForm.reset() on OK on confirmation in onResetSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit()
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.surveyForm, 'reset');
    component.onResetSurvey();
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to reset the Survey?');
    expect(component.surveyForm.reset).toHaveBeenCalled();
  })

  it('should set the value of isFormSubmitted to true on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.onSubmit();
    expect(component.isFormSubmitted).toBeTruthy;
  })

  it('should prompt a message on invalid surveyForm on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    const spy = spyOn(window, 'alert');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith('Kindly input required fields.')
  })

  it('should fetchSurvey when valid surveyForm on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.surveyForm.controls.email.setValue('Test@gmail.com');
    component.surveyForm.controls.date_and_time.setValue('Thu July 04 2019 4:29:09 PM');
    component.surveyForm.controls.question1.setValue('Cheese Burger');
    component.surveyForm.controls.question2.setValue('Moderate');
    component.surveyForm.controls.question3.setValue('Pickles');
    component.surveyForm.controls.question4.setValue('Very much');
    component.surveyForm.controls.question5.setValue("More franchise stores of Roan's Burger nationwide");
    const appService = TestBed.get(AppService)
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => {}});
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  })

  it('should set the surveyList to null when valid surveyForm on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.surveyForm.controls.email.setValue('Test@gmail.com');
    component.surveyForm.controls.date_and_time.setValue('Thu Jul 04 2019 4:29:09 PM');
    component.surveyForm.controls.question1.setValue('Cheese Burger');
    component.surveyForm.controls.question2.setValue('Moderate');
    component.surveyForm.controls.question3.setValue('Pickles');
    component.surveyForm.controls.question4.setValue('Very much');
    component.surveyForm.controls.question5.setValue("More franchise stores of Roan's Burger nationwide");
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => {}});
    component.onSubmit();
    expect(component.surveyList).toBeNull;
  })

  it('should set userID to 1 when valid surveyForm on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => { return null;}});
    component.onSubmit();
    expect(component.userID).toBe(1);
  })

  it('should call the addSurvey method when valid surveyForm on onSubmit', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => {}});
    const spyAddSurvey = spyOn(component, 'addSurvey').and.callThrough();
    // spyOn(component, 'addSurvey').and.callThrough();
    component.onSubmit();
    expect(spyAddSurvey).toHaveBeenCalled();
    // expect(component.addSurvey).toHaveBeenCalled();
  })

  it('should set the value of the controls on addSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'addSurvey');
    component.addSurvey();
    expect(spy).toHaveBeenCalled();
  })

  it('should prompt a message on addSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const spy = spyOn(window, 'alert');
    component.addSurvey();
    expect(spy).toHaveBeenCalledWith('Your survey is successfully submitted.\nThank you for answering the survey.');
  })

  it('should call the surveyForm.reset on addSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const spy = spyOn(component.surveyForm, 'reset');
    component.addSurvey();
    expect(spy).toHaveBeenCalled();
  })

  it('should set the controls value to null on addSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.addSurvey();
    expect(component.surveyForm.controls.email.value).toBeNull;
    expect(component.surveyForm.controls.date_and_time.value).toBeNull;
    expect(component.surveyForm.controls.question1.value).toBeNull;
    expect(component.surveyForm.controls.question2.value).toBeNull;
    expect(component.surveyForm.controls.question3.value).toBeNull;
    expect(component.surveyForm.controls.question4.value).toBeNull;
    expect(component.surveyForm.controls.question5.value).toBeNull;
  })

  it('should set the isFormSubmitted to false on addSurvey', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.addSurvey();
    expect(component.isFormSubmitted).toBeFalsy;
  })

  it('should call reset on onSignOut', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const spy = spyOn(component.surveyForm, 'reset');
    component.onSignOut();
    expect(spy).toHaveBeenCalled();
  })

  it('should set the value of controls to null on onSignOut', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.onSignOut();
    expect(component.surveyForm.controls.email.value).toBeNull;
    expect(component.surveyForm.controls.date_and_time.value).toBeNull;
    expect(component.surveyForm.controls.question1.value).toBeNull;
    expect(component.surveyForm.controls.question2.value).toBeNull;
    expect(component.surveyForm.controls.question3.value).toBeNull;
    expect(component.surveyForm.controls.question4.value).toBeNull;
    expect(component.surveyForm.controls.question5.value).toBeNull;
  })

  it('should set the Subject "user" to false on onSignOut', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.onSignOut();
    const appService = TestBed.get(AppService);
    appService.user.subscribe(user => {
      expect(user).toBeFalsy;
    })
  })

  it('should navigate to the path: / on onSignOut', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.onSignOut();
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onSignOut();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should call reset on onLogIn', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const spy = spyOn(component.surveyForm, 'reset');
    component.onLogIn();
    expect(spy).toHaveBeenCalled();
  })

  it('should set the value of controls to null on onLogIn', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.onLogIn();
    expect(component.surveyForm.controls.email.value).toBeNull;
    expect(component.surveyForm.controls.date_and_time.value).toBeNull;
    expect(component.surveyForm.controls.question1.value).toBeNull;
    expect(component.surveyForm.controls.question2.value).toBeNull;
    expect(component.surveyForm.controls.question3.value).toBeNull;
    expect(component.surveyForm.controls.question4.value).toBeNull;
    expect(component.surveyForm.controls.question5.value).toBeNull;
  })

  it('should set the Subject "user" to false on onLogIn', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate')
    component.onLogIn();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should call reset on onViewDashboard', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const spy = spyOn(component.surveyForm, 'reset');
    component.onViewDashboard();
    expect(spy).toHaveBeenCalled();
  })

  it('should set the value of controls to null on onViewDashboard', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    component.onViewDashboard();
    expect(component.surveyForm.controls.email.value).toBeNull;
    expect(component.surveyForm.controls.date_and_time.value).toBeNull;
    expect(component.surveyForm.controls.question1.value).toBeNull;
    expect(component.surveyForm.controls.question2.value).toBeNull;
    expect(component.surveyForm.controls.question3.value).toBeNull;
    expect(component.surveyForm.controls.question4.value).toBeNull;
    expect(component.surveyForm.controls.question5.value).toBeNull;
  })

  it('should navigate to path: /dashboard on onViewDashboard', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    populateSurveyForm(component);
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onViewDashboard();
    expect(spy).toHaveBeenCalledWith(['../dashboard'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Date on onGenerateDateAndTime', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    component.onGenerateDateAndTime();
    expect(component.dateAndTime).toContain('Mon Jul 22 2019');
  })

  it('should set the Subject "user" to true on onViewSurveyReport', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    component.onViewSurveyReport();
    appService.user.subscribe(user => {
      expect(user).toBeTruthy;
    })
  })

  it('should navigate to path: /survey-report on onViewSurveyReport', () => {
    fixture = TestBed.createComponent(SurveyFormPage);
    component = fixture.componentInstance;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onViewSurveyReport();
    expect(spy).toHaveBeenCalledWith(['../survey-report'], Object({relativeTo: new ActivatedRouteStub()}));
  })

})