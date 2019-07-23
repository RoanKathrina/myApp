import { LoginPage } from "./login.page";
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';
// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoginPage ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//     .compileComponents();
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
var RouterStub = /** @class */ (function () {
    function RouterStub() {
    }
    RouterStub.prototype.navigate = function () { };
    return RouterStub;
}());
var ActivatedRouteStub = /** @class */ (function () {
    function ActivatedRouteStub() {
    }
    return ActivatedRouteStub;
}());
describe('LoginPage', function () {
    var component;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            providers: [
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }
            ]
        });
        // component = new LoginPage(new AppService(null, null), new Router(null, null, null, null, null, null, null, null), new ActivatedRoute());
    });
    it('should create a LogInForm with two (2) controls', function () {
        component = new LoginPage(null, null, null);
        component.ngOnInit();
        expect('loginForm').toBeTruthy;
        expect(component.loginForm.contains('username').toBeTruthy);
        expect(component.loginForm.contains('password').toBeTruthy);
    });
    it('should make the Username required', function () {
        component = new LoginPage(null, null, null);
        component.ngOnInit();
        var control = component.loginForm.get('username');
        control.setValue('');
        expect(control.valid).toBeFalsy;
    });
    it('should prompt a message when Username is blank', function () {
        component = new LoginPage(null, null, null);
        component.ngOnInit();
        var control = component.loginForm.get('username');
        control.setValue(null);
        spyOn(window, "alert");
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith("Kindly input Username.");
    });
    it('should prompt a message when password is null', function () {
        component = new LoginPage(null, null, null);
        component.ngOnInit();
        var control = component.loginForm.get('username');
        control.setValue('Roan');
        var passwordControl = component.loginForm.get('password');
        passwordControl.setValue(null);
        spyOn(window, 'alert');
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith('Kindly input Password.');
    });
    it('should prompt a message when username or password is invalid', function () {
        component = new LoginPage(null, null, null);
        component.ngOnInit();
        var control = component.loginForm.get('username');
        control.setValue('Test');
        var passwordControl = component.loginForm.get('password');
        passwordControl.setValue('This');
        spyOn(window, 'alert');
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith('Invalid Username or Password.');
    });
    it('should navigate to Survey Form Page on valid Username, and Password', function () {
        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        component.ngOnInit();
        var control = component.loginForm.get('username');
        control.setValue('Roan');
        var passwordControl = component.loginForm.get('password');
        passwordControl.setValue('Test1234');
        var router = TestBed.get(Router);
        var spy = spyOn(router, 'navigate');
    });
});
//# sourceMappingURL=login.page.spec.js.map