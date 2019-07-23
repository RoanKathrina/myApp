import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(appService, router, route) {
        this.appService = appService;
        this.router = router;
        this.route = route;
    }
    LoginPage.prototype.ngOnInit = function () {
        // Refresh Page
        // this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
        //   this.router.navigate(['/login'])
        // })
        this.initForm();
    };
    LoginPage.prototype.initForm = function () {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required)
        });
    };
    LoginPage.prototype.onSubmit = function () {
        if (this.loginForm.value['username'] === null) {
            window.alert('Kindly input Username.');
            return;
        }
        if (this.loginForm.value['password'] === null) {
            window.alert('Kindly input Password.');
            return;
        }
        if (this.loginForm.value['username'] != 'Roan' || this.loginForm.value['password'] != 'Test1234') {
            window.alert('Invalid Username or Password.');
            return;
        }
        var adminIsLoggedIn = true;
        this.appService.user.next(adminIsLoggedIn);
        this.loginForm.reset();
        this.router.navigate(['../survey-form'], { relativeTo: this.route });
        // window.location.reload();
    };
    LoginPage.prototype.goToSurvey = function () {
        this.router.navigate(['../survey-form'], { relativeTo: this.route });
        // window.location.reload();
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            Router,
            ActivatedRoute])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map