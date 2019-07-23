import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Location } from '@angular/common';
var DashboardPage = /** @class */ (function () {
    function DashboardPage(appService, router, route, location) {
        this.appService = appService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.surveys = [];
        this.isAdminLoggedIn = false;
    }
    DashboardPage.prototype.ngOnInit = function () {
        console.log('ngOnInit Dashboard');
        // this.userSubscription = this.appService.user.subscribe((user: any) => {
        //   this.isAdminLoggedIn = user;
        // })
        // Get Surveys from Firebase
        // this.surveySubscription = this.appService.fetchSurvey().subscribe((response: any) => {
        //   this.surveys = Object.values(response.json());
        //   console.log(this.surveys);
        // })
        // Temporary Source Code
        // this.surveys = this.appService.getSurveyList();
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter: Dashboard');
        this.userSubscription = this.appService.user.subscribe(function (user) {
            _this.isAdminLoggedIn = user;
        });
        // Get Surveys from Firebase
        this.surveySubscription = this.appService.fetchSurvey().subscribe(function (response) {
            if (response.json() === null) {
                _this.surveys = [];
                // return;
            }
            else {
                _this.surveys = Object.entries(response.json());
                console.log(Object.entries(response.json()));
            }
        });
        // this.surveys$ = this.appService.fetchSurvey();
        // console.log(this.surveys$);
    };
    DashboardPage.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
        this.surveySubscription.unsubscribe();
    };
    DashboardPage.prototype.onViewSurvey = function () {
        // const isAdminLoggedIn = true;
        // this.appService.user.next(true);
        this.appService.user.next(this.isAdminLoggedIn);
        this.router.navigate(['../survey-form'], { relativeTo: this.route });
    };
    DashboardPage.prototype.onSignOut = function () {
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    DashboardPage.prototype.onViewUserSurvey = function (survey) {
        // const survey = this.appService.getSurvey(userID);
        // console.log('survey: ' + survey);
        console.log(survey);
        this.appService.survey.next(survey);
        this.appService.user.next(true);
        this.router.navigate(['../view-survey'], { relativeTo: this.route });
    };
    DashboardPage.prototype.onViewSurveyReport = function () {
        this.router.navigate(['../survey-report'], { relativeTo: this.route });
    };
    DashboardPage.prototype.onLogIn = function () {
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    DashboardPage.prototype.onDeleteUserSurvey = function (key, id) {
        var confirmDeleteSurvey = confirm("Are you sure you want to delete: User " + id + "?");
        if (confirmDeleteSurvey === false) {
            return;
        }
        else {
            this.appService.deleteUserSurvey(key);
        }
        this.ionViewWillEnter();
        // this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
        //   this.appService.user.next(true);
        //   this.router.navigate([decodeURI(this.location.path())]);
        // })
    };
    DashboardPage.prototype.onUpdateUserSurvey = function (key, survey) {
        var confirmUpdateSurvey = confirm("Are you sure you want to update survey of User " + survey['id'] + "?");
        if (confirmUpdateSurvey === false) {
            return;
        }
        else {
            this.appService.survey.next(survey);
            this.appService.user.next(true);
            this.appService.userKey.next(key);
            this.appService.updateMode.next(true);
            this.router.navigate(['../view-survey'], { relativeTo: this.route });
        }
    };
    DashboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            Router,
            ActivatedRoute,
            Location])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map