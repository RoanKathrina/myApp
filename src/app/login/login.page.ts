import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
  // Refresh Page
  // this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
  //   this.router.navigate(['/login'])
  // })
   this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if(this.loginForm.value['username'] === null) {
      window.alert('Kindly input Username.');
      return;
    }
    if(this.loginForm.value['password'] === null) {
      window.alert('Kindly input Password.');
      return;
    }
    if(this.loginForm.value['username'] != 'Roan' || this.loginForm.value['password'] != 'Test1234') {
      window.alert('Invalid Username or Password.');
      return;
    }
    const adminIsLoggedIn = true;
    this.appService.user.next(adminIsLoggedIn);
    this.loginForm.reset();
    this.router.navigate(['../survey-form'], {relativeTo: this.route});
    // window.location.reload();
  }

  goToSurvey() {
    this.router.navigate(['../survey-form'], {relativeTo: this.route});
    // window.location.reload();
  }
}
