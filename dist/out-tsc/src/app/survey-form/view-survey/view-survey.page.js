import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
var ViewSurveyPage = /** @class */ (function () {
    function ViewSurveyPage(appService, router, route) {
        this.appService = appService;
        this.router = router;
        this.route = route;
        this.survey = null;
        this.isAdminLoggedIn = false;
        this.userKey = '';
        this.updateMode = false;
    }
    ViewSurveyPage.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.survey.subscribe(function (survey) {
            _this.survey = survey;
            console.log(survey);
        });
        this.appService.user.subscribe(function (isAdminLoggedIn) {
            _this.isAdminLoggedIn = isAdminLoggedIn;
        });
        this.appService.userKey.subscribe(function (userKey) {
            _this.userKey = userKey;
        });
        this.appService.updateMode.subscribe(function (updateMode) {
            _this.updateMode = updateMode;
        });
        this.initForm();
    };
    ViewSurveyPage.prototype.initForm = function () {
        this.surveyForm = new FormGroup({
            'question1': new FormControl({ value: this.survey.question_1, disabled: !this.updateMode }),
            'question2': new FormControl({ value: this.survey.question_2, disabled: !this.updateMode }),
            'question3': new FormControl({ value: this.survey.question_3, disabled: !this.updateMode }),
            'question4': new FormControl({ value: this.survey.question_4, disabled: !this.updateMode }),
            'question5': new FormControl({ value: this.survey.question_5, disabled: !this.updateMode })
        });
    };
    ViewSurveyPage.prototype.onViewDashboard = function () {
        this.appService.updateMode.next(false);
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
    };
    ViewSurveyPage.prototype.onViewSurvey = function () {
        this.appService.user.next(true);
        this.router.navigate(['../survey-form'], { relativeTo: this.route });
    };
    ViewSurveyPage.prototype.onSignOut = function () {
        this.appService.updateMode.next(false);
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    ViewSurveyPage.prototype.onLogIn = function () {
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    ViewSurveyPage.prototype.onUpdateUserSurvey = function () {
        var confirmSurveyUpdate = confirm("Are you sure you want to update the survey of User: " + this.survey.id + "?");
        if (confirmSurveyUpdate === false) {
            return;
        }
        else {
            var survey = {
                id: this.survey.id,
                email: this.survey.email,
                date_and_time: this.survey.date_and_time,
                question_1: this.surveyForm.value['question1'],
                question_2: this.surveyForm.value['question2'],
                question_3: this.surveyForm.value['question3'],
                question_4: this.surveyForm.value['question4'],
                question_5: this.surveyForm.value['question5']
            };
            this.appService.updateUserSurvey(this.userKey, survey);
        }
    };
    ViewSurveyPage = tslib_1.__decorate([
        Component({
            selector: 'app-view-survey',
            templateUrl: './view-survey.page.html',
            styleUrls: ['./view-survey.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            Router,
            ActivatedRoute])
    ], ViewSurveyPage);
    return ViewSurveyPage;
}());
export { ViewSurveyPage };
//# sourceMappingURL=view-survey.page.js.map