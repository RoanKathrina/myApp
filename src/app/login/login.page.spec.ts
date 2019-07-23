import { LoginPage } from "./login.page";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RouterStub {
  navigate() {}
}

class ActivatedRouteStub {
}

class AppServiceStub {
  // user = new BehaviorSubject<any>(null);
  user: any = new BehaviorSubject<any>(null);
}


describe('LoginPage', () => {
  let component;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: AppService, useClass: AppServiceStub}
      ],
      imports: [ ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    // component = new LoginPage(new AppService(null, null), new Router(null, null, null, null, null, null, null, null), new ActivatedRoute());
  });

  it('should create a LogInForm with two (2) controls', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    expect('loginForm').toBeTruthy;
    expect(component.loginForm.contains('username').toBeTruthy);
    expect(component.loginForm.contains('password').toBeTruthy);
  })

  it('should make the Username required', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('')
    expect(control.valid).toBeFalsy;
  })

  it('should prompt a message when Username is blank', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue(null)
    spyOn(window, "alert");
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith("Kindly input Username.");
  })

  it('should prompt a message when password is null', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Roan');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue(null)
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Kindly input Password.');
  })

  it('should prompt a message when username or password is invalid', () => {
    component = new LoginPage(null, null, null);
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Test');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('This');
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Invalid Username or Password.')
  })

  it('should navigate to Survey Form Page on valid Username, and Password', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Roan');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('Test1234');

    // Prepare the Router
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    
    component.onSubmit();
    // expect(spy).toHaveBeenCalledWith(['../survey-form'], Object({relativeTo: ActivatedRouteStub}));
    expect(spy).toHaveBeenCalledWith([ '../survey-form' ], Object({ relativeTo: new ActivatedRouteStub()}));
  })

  it('should set the Subject "user" to true on valid Username, and Password', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Roan');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('Test1234');
    component.onSubmit();

    let appService = TestBed.get(AppService);
    appService.user.subscribe((user) => {
      expect(user).toBe(true);
    })
  })

  it('should reset the values of Username, Password on valid Username, and Password', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    let control = component.loginForm.get('username');
    control.setValue('Roan');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue('Test1234');
    component.onSubmit();

    const username = component.loginForm.controls['username'];
    expect(username.value).toEqual(null);
    const password = component.loginForm.controls['password'];
    expect(password.value).toEqual(null);
  })

  it('should navigate to Survey Form on click of Go to Survey', () => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    component.ngOnInit();
    // Prepare the Router
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.goToSurvey();
    expect(spy).toHaveBeenCalledWith(['../survey-form'], Object({relativeTo: new ActivatedRouteStub()}));
    // expect(spy).toHaveBeenCalledWith([ '../survey-form' ], Object({ relativeTo: new ActivatedRouteStub()}));
  })
})