import { SurveyReportPage } from './survey-report.page';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BehaviorSubject, of, Subscription} from 'rxjs';
import { AppService } from 'src/app/app.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'; 
import { Router, ActivatedRoute } from '@angular/router';


class AppServiceStub {
  user = new BehaviorSubject<any>(null);

  fetchSurvey() {
    return of([]);
  }

  setUserToLoggedIn() {
    this.user.next(true);
  }
}

class RouterStub {

}

class ActivatedRouteStub {

}

describe('SurveyReportPage', () => {
  let component;
  let fixture: ComponentFixture<SurveyReportPage>;
  beforeEach(() =>  {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    TestBed.configureTestingModule({
      declarations: [ SurveyReportPage ],
      providers: [
        {provide: AppService, useClass: AppServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
  })

  it('should set the Subject "user" on onIonViewWillEnter', () => {
    fixture = TestBed.createComponent(SurveyReportPage);
    component = fixture.componentInstance;
    component.ionViewWillEnter();

    const appService = TestBed.get(AppService)
    appService.setUserToLoggedIn();
    expect(component.isAdminLoggedIn).toBeTruthy;
    // expect(component.surveyList).toEqual([]);
  })

  it('should set survey to [] when response.json is equal to null on ionViewWillEnter', () => {
    fixture = TestBed.createComponent(SurveyReportPage);
    component = fixture.componentInstance;
    const appService = TestBed.get(AppService);
    const spy = spyOn(appService, 'fetchSurvey').and.returnValue({subscribe: () => {}});
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalled();
  })

  it('should unsubscribe on ngOnDestroy', () => {
    fixture = TestBed.createComponent(SurveyReportPage);
    component = fixture.componentInstance;
    component.ionViewWillEnter();
    spyOn(component['userSubscription'], 'unsubscribe');
    spyOn(component['surveySubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['userSubscription'].unsubscribe).toHaveBeenCalledTimes(1);
    expect(component['surveySubscription'].unsubscribe).toHaveBeenCalledTimes(1);
  })
})