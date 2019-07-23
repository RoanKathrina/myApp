import { DashboardPage } from "./dashboard.page";
import { TestBed, ComponentFixture} from '@angular/core/testing';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { shouldCallLifecycleInitHook } from '@angular/core/src/view';

class RouterStub {
  navigate() {}

}
class ActivatedRouteStub {

}
class AppServiceStub {
  user = new BehaviorSubject<any>(null);
  survey = new BehaviorSubject<any>(null);

  setUserToLoggedIn() {
    this.user.next(true);
  }
  
  fetchSurvey() {
    return of([]);
  }
  
  deleteUserSurvey() {}
}

describe('DashboardPage', () => {
  let component;
  let fixture: ComponentFixture<DashboardPage>;
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [DashboardPage],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: AppService, useClass: AppServiceStub}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpModule ]
    })
  });

  it('should get the value of Subject "user" on ionViewWillEnter', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    component.ionViewWillEnter();
    appService.setUserToLoggedIn();
    expect(component.isAdminLoggedIn).toBe(true);
  })

  it('should set the surveys to [] on response.json equal to null on ionViewWillEnter', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => {}});
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
    expect(component.surveys).toEqual([]);
  })

  it('should set the surveys to response.json on response.json NOT equal to null on ionViewWillEnter', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => { return [{}]}})
    // spyOn(appService, 'fetchSurvey').and.callFake(() => {
    //   return ([{test: 'test'}]);
    // })
    component.ionViewWillEnter();
    expect(component.surveys).toBe([{test: 'test'}]);
  })

  it('should set the Subject "user" to true on onViewSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    
    component.onViewSurvey();
    const appService = TestBed.get(AppService);
    appService.setUserToLoggedIn();
    appService.user.subscribe(user => {
      expect(user).toBeTruthy;
    })
  })
  
  it('should navigate to survey-form on onViewSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.onViewSurvey();
    expect(spy).toHaveBeenCalledWith(['../survey-form'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "user" to false on onSignOut', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    component.onSignOut();

    const appService = TestBed.get(AppService);
    appService.user.subscribe(user => {
      expect(user).toBeFalsy;
    })
  })

  it('should navigate to path: / on onSignOut', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.onSignOut();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "survey" to the values of the selected survey on onViewUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    component.onViewUserSurvey({
      date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      email: "test@gmail.com",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide"
    })
    const appService = TestBed.get(AppService);
    appService.survey.subscribe(survey => {
      expect(survey).toEqual({
        date_and_time: "Thu Jul 04 2019 4:24:09 PM",
        email: "test@gmail.com",
        id: 1,
        question_1: "Cheese Burger",
        question_2: "Moderate",
        question_3: "Pickles",
        question_4: "Very much",
        question_5: "More franchise stores of Roan's Burger nationwide"
      });
    })
  })

  it('should set the Subject "user" to true on onViewUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    component.onViewUserSurvey({
      date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      email: "test@gmail.com",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide"
    })
    let appService = TestBed.get(AppService);
    appService.user.subscribe(user => {
      expect(user).toBeTruthy;
    })
  })

  it('should navigate to view-survey on onViewUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.onViewUserSurvey({
      date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      email: "test@gmail.com",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide"
    })
    expect(spy).toHaveBeenCalledWith(['../view-survey'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should navigate to survey-report on onViewSurveyReport', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.onViewSurveyReport();
    expect(spy).toHaveBeenCalledWith(['../survey-report'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "user" to false on onLogIn', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    component.onLogIn();

    const appService = TestBed.get(AppService);
    appService.user.subscribe(user => {
      expect(user).toBeFalsy;
    })
  })

  it('should navigate to path: / on onLogIn', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.onLogIn();
    expect(spy).toHaveBeenCalledWith(['../'], Object({relativeTo: new ActivatedRouteStub()}));
  })

  it('should exit on Cancel on confirmation in onDeleteUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    spyOn(window, 'confirm').and.returnValue(false);
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'deleteUserSurvey'); 
    component.onDeleteUserSurvey('Liw4P86GqsTuClBvdfh', 1);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete: User 1?');
    expect(spy).not.toHaveBeenCalled();
  })

  it('should delete the survey on Confirm on confirmation in onDeleteUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);

    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'deleteUserSurvey');
    component.onDeleteUserSurvey('Liw4P86GqsTuClBvdfh', 1);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete: User 1?');
    expect(spy).toHaveBeenCalled();
  })

  it('should set the isAdminLoggedIn to true on onDeleteUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(component, 'ionViewWillEnter').and.callFake(() => {});
    component.onDeleteUserSurvey('Liw4P86GqsTuClBvdfh', 1);
    expect(spy).toHaveBeenCalled();
    // const appService = TestBed.get(AppService);
    // appService.setUserToLoggedIn();
    // expect(component.isAdminLoggedIn).toBeTruthy;
    // expect(component.surveys).toEqual([]);
  })

  it('should prompt a message on onUpdateUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    const spy = spyOn(window, 'confirm').and.returnValue(false);
    component.onUpdateUserSurvey('Liw4P86GqsTuClBvdfh', {
      date_and_time: "Thu Jul 04 2019 4:24:09 PM",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide."
    });
    expect(spy).toHaveBeenCalledWith('Are you sure you want to update survey of User 1?');
  })

  it('should set the value of Subject "survey" on OK in confirmation in onUpdateUserSurvey', () => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    const spy = spyOn(window, 'confirm').and.callFake(() => {
      return true;
    })
    component.onUpdateUserSurvey('Liw4P86GqsTuClBvdfh', {
      date_and_time: "Thu Jul 04 2019 4:29:09 PM",
      id: 1,
      question_1: "Cheese Burger",
      question_2: "Moderate",
      question_3: "Pickles",
      question_4: "Very much",
      question_5: "More franchise stores of Roan's Burger nationwide."
    })
    const appService = TestBed.get(AppService);
    appService.survey.subscribe(survey => {
      expect(survey).toBe({})
    })


  })
});