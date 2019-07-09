import { LoginPage } from "./login.page";
import { fakeAsync, tick} from '@angular/core/testing';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

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


describe('LoginPage', () => {
  let component;
  beforeEach(() => {
    component = new LoginPage(null, null, null)
    // component = new LoginPage(new AppService(null, null), new Router(null, null, null, null, null, null, null, null), new ActivatedRoute());
    component.ngOnInit();
  });

  it('should create a LogInForm with two (2) controls', () => {
    // expect(component.loginForm.tobeTruthy);
    expect('loginForm').toBeTruthy;
    expect(component.loginForm.contains('username').toBeTruthy);
    expect(component.loginForm.contains('password').toBeTruthy);
  })

  it('should make the Username required', () => {
    let control = component.loginForm.get('username');
    control.setValue('')
    expect(control.valid).toBeFalsy;
  })

  // fit('should prompt a message when Username is blank', fakeAsync(() => {
  //   let control = component.loginForm.get('username');
  //   control.setValue(null)
  //   component.onSubmit();
  //   spyOn(window, "alert");
  //   tick();
  //   expect(window.alert).toHaveBeenCalledWith("Kindly input Username.");
  // }))

  // it('should prompt a message when Username is blank', () => {
  //   let control = component.loginForm.get('username');
  //   control.setValue(null)
  //   component.onSubmit();
  //   spyOn(window, "alert");
  //   expect(window.alert).toHaveBeenCalledWith("Kindly input Username.");
  // })

  it('should prompt a message when password is null', () => {
    let control = component.loginForm.get('username');
    control.setValue('Roan');
    let passwordControl = component.loginForm.get('password');
    passwordControl.setValue(null)
    spyOn(window, 'alert');
    expect(window.alert).toHaveBeenCalledWith('Kindly input Password.');
  })
})