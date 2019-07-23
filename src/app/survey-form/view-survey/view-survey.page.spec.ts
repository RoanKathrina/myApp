import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { ViewSurveyPage } from './view-survey.page';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'zone.js/dist/zone-testing';

class AppServiceStub {
  survey = new BehaviorSubject<any>(null);
  user = new BehaviorSubject<any>(null);
  userKey = new BehaviorSubject<any>(null);
  updateMode = new BehaviorSubject<any>(null);

  setSurveyValues() {
    this.survey.next({
      date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      email: "test@gmail.com",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide"
    })
  }

  setUserToLoggedIn() {
    this.user.next(true);
  }

  setUserKeyValue() {
    this.userKey.next('Liw4P86GqsTuClBvdfh');
  }

  setUpdateModeValue() {
    this.updateMode.next(true);
  }

  updateUserSurvey() {

  }
}

class RouterStub {

  navigate() {}
}

class ActivatedRouteStub {

}
describe('ViewSurveyPage', () => {
  let component;
  let fixture: ComponentFixture<ViewSurveyPage>;
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ ViewSurveyPage ],
      providers: [
        {provide: AppService, useClass: AppServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  })

  it('should set the isAdminLoggedIn to true on ngOnInit', async(
    () => {
      fixture = TestBed.createComponent(ViewSurveyPage);
      component = fixture.componentInstance;
      component.ngOnInit();
      
      let appService = TestBed.get(AppService);
      appService.setSurveyValues();
      expect(component.survey).toEqual({
        date_and_time: "Thu Jul 04 2019 4:24:09 PM",
        email: "test@gmail.com",
        id: 1,
        question_1: "Cheese Burger",
        question_2: "Moderate",
        question_3: "Pickles",
        question_4: "Very much",
        question_5: "More franchise stores of Roan's Burger nationwide"
      });
      
      appService.setUserToLoggedIn();
      expect(component.isAdminLoggedIn).toBeTruthy;
  
      // appService.setUserKeyValue();
      // expect(component.userKey).toEqual('Liw4P86GqsTuClBvdfh');
  
      // appService.setUpdateModeValue();
      // expect(component.updateMode).toBeTruthy;
  
      // component.survey = {
      //   date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      //   email: "test@gmail.com",
      //   id: 1,
      //   question_1: "Cheese Burger",
      //   question_2: "Moderate",
      //   question_3: "Pickles",
      //   question_4: "Very much",
      //   question_5: "More franchise stores of Roan's Burger nationwide"
      // }
      // fixture.detectChanges();
      // fixture.whenStable().then(() => {
      //   console.log(component.survey);
      //   expect('surveyForm').toBeTruthy;
      // })
    })
  )

  it('should set the userKey on ngOnInit', () => {
     fixture = TestBed.createComponent(ViewSurveyPage);
     component = fixture.componentInstance;
     const appService = TestBed.get(AppService);
     appService.setUserKeyValue();
     component.survey = {
       question_1: "Cheese Burger",
       question_2: "Moderate",
       question_3: "Pickles",
       question_4: "Very much",
       question_5: "More franchise stores of Roan's Burger nationwide"
     }
     fixture.detectChanges();
     component.ngOnInit();
     expect(component.userKey).toEqual('Liw4P86GqsTuClBvdfh');
     fixture.whenStable().then(() => {
       expect('surveyForm').toBeTruthy;
     })
  })

  it('should set the updateMode on ngOnInit', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    appService.setUpdateModeValue();
    component.ngOnInit();
    expect(component.updateMode).toBeTruthy;
  })

  it('should set the Subject "updateMode" to false on onViewDashboard', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;
    
    let appService = TestBed.get(AppService);
    component.onViewDashboard();
    appService.updateMode.subscribe(updateMode => {
      expect(updateMode).toBeFalsy;
    })
  })

  it('should navigate to the Dashboard Page on onViewDashboard', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;
    
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onViewDashboard();
    expect(spy).toHaveBeenCalledWith(['../dashboard'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "user" to true on onViewSurvey', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const appService = TestBed.get(AppService);
    component.onViewSurvey();
    appService.user.subscribe(user => {
      expect(user).toBeTruthy;
    })
  })

  it('should navigate to ../survey-form on onViewSurvey', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onViewSurvey();
    expect(spy).toHaveBeenCalledWith(['../survey-form'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "updateMode" to false on onSignOut', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const appService = TestBed.get(AppService);
    component.onSignOut();
    appService.updateMode.subscribe(updateMode => {
      expect(updateMode).toBeFalsy;
    })
  })

  it('should set the Subject "user" to be false on onSignOut', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const appService = TestBed.get(AppService);
    component.onSignOut();
    appService.user.subscribe(user => {
      expect(user).toBeFalsy;
    })
  })

  it('should navigate to the path: / on onSignOut', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onSignOut();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "user" to false on onLogIn', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;
    
    const appService = TestBed.get(AppService);
    component.onLogIn();
    appService.user.subscribe(user => {
      expect(user).toBeFalsy;
    })
  })

  it('should navigate to path : / on onLogIn', () => {
    fixture = TestBed.createComponent(ViewSurveyPage);
    component = fixture.componentInstance;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onLogIn();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  // it('should exit on Cancel on confirmation in onUpdateUserSurvey', () => {
  //   fixture = TestBed.createComponent(ViewSurveyPage);
  //   component = fixture.componentInstance;
    
  //   const appService = TestBed.get(AppService);
  //   const spy = spyOn(appService, 'updateUserSurvey');
  //   component.survey.id = 1;
  //   fixture.detectChanges();
  //   component.onUpdateUserSurvey();
  //   spyOn(window, 'confirm').and.returnValue(false);
  //   expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to update the survey of User: 1');
  // })

})
