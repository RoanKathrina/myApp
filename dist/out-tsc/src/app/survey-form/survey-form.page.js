import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
// import 'rxjs/add/operator/finally';
var SurveyFormPage = /** @class */ (function () {
    function SurveyFormPage(appService, router, route) {
        this.appService = appService;
        this.router = router;
        this.route = route;
        // isValidSurveyForm: boolean = null;
        this.isSurveyFormSubmitted = false;
        this.isAdminLoggedIn = false;
        this.dateAndTime = '';
    }
    SurveyFormPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.appService.user.subscribe(function (adminLoggedIn) {
            console.log(adminLoggedIn);
            _this.isAdminLoggedIn = adminLoggedIn;
        });
        // this.sendMail();
        // console.log(this.isAdminLoggedIn);
    };
    SurveyFormPage.prototype.ngOnChanges = function () {
        var _this = this;
        this.appService.user.subscribe(function (adminLoggedIn) {
            _this.isAdminLoggedIn = adminLoggedIn;
            console.log('ngOnChanges: ' + _this.isAdminLoggedIn);
        });
    };
    SurveyFormPage.prototype.initForm = function () {
        this.surveyForm = new FormGroup({
            'e-mail': new FormControl(null, [Validators.required, Validators.email]),
            'date_and_time': new FormControl({ value: null, disabled: true }),
            'question1': new FormControl('', Validators.required),
            'question2': new FormControl('', Validators.required),
            'question3': new FormControl('', Validators.required),
            'question4': new FormControl('', Validators.required),
            'question5': new FormControl('', Validators.required)
        });
    };
    SurveyFormPage.prototype.onResetSurvey = function () {
        var resetSurvey = confirm('Are you sure you want to reset the Survey?');
        if (resetSurvey === false) {
            return;
        }
        else {
            this.surveyForm.reset();
        }
    };
    SurveyFormPage.prototype.onSubmit = function () {
        var _this = this;
        this.isSurveyFormSubmitted = true;
        if (this.surveyForm.invalid === true) {
            window.alert('Kindly input required fields.');
            return;
        }
        // Save the Survey in firebase
        // Send e-mail to the Respondent
        // const surveyList = this.appService.getSurveyList();
        // const userID = surveyList.length + 1;
        // let surveyList: {};
        // let userID: number;
        this.appService.fetchSurvey().subscribe(function (response) {
            // surveyList = response.json();
            // userID = Object.keys(surveyList).length + 1;
            _this.surveyList = response.json();
            if (_this.surveyList === null) {
                _this.userID = 1;
            }
            else {
                _this.userID = Object.keys(_this.surveyList).length + 1;
            }
            _this.addSurvey();
            // this.appService.userID.next(userID);
        });
        // let id: number;
        // this.appService.userID.subscribe((id: number) => {
        //   id = id;
        // })
        // const survey = {
        //   id: 1,
        //   email: this.surveyForm.value['e-mail'],
        //   date_and_time: this.dateAndTime,
        //   question_1: this.surveyForm.value['question1'],
        //   question_2: this.surveyForm.value['question2'],
        //   question_3: this.surveyForm.value['question3'],
        //   question_4: this.surveyForm.value['question4'],
        //   question_5: this.surveyForm.value['question5']
        // }
        // //Add to Firebase
        // this.appService.addSurveyToList(survey);
        // this.appService.addSurvey(survey).subscribe((response: any) => {
        //   console.log(response);
        // });
        // window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
        // this.surveyForm.reset();
        // this.isSurveyFormSubmitted = false;
    };
    SurveyFormPage.prototype.addSurvey = function () {
        var survey = {
            id: this.userID,
            email: this.surveyForm.value['e-mail'],
            date_and_time: this.dateAndTime,
            question_1: this.surveyForm.value['question1'],
            question_2: this.surveyForm.value['question2'],
            question_3: this.surveyForm.value['question3'],
            question_4: this.surveyForm.value['question4'],
            question_5: this.surveyForm.value['question5']
        };
        //Add to Firebase
        // this.appService.addSurveyToList(survey);
        this.appService.addSurvey(survey);
        // this.appService.addSurvey(survey).subscribe((response: any) => {
        //   console.log(response);
        // });
        window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
        this.surveyForm.reset();
        this.isSurveyFormSubmitted = false;
    };
    SurveyFormPage.prototype.onSignOut = function () {
        this.surveyForm.reset();
        // const isAdminLoggedIn = false;
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    SurveyFormPage.prototype.onLogIn = function () {
        this.surveyForm.reset();
        // const isAdminLoggedIn = false;
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    SurveyFormPage.prototype.onViewDashboard = function () {
        // this.appService.user.next(true);
        this.surveyForm.reset();
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
    };
    SurveyFormPage.prototype.onGenerateDateAndTime = function () {
        var today = new Date();
        var date = today.toDateString();
        var time = today.toLocaleTimeString();
        this.dateAndTime = date + " " + time;
    };
    SurveyFormPage.prototype.onViewSurveyReport = function () {
        this.appService.user.next(true);
        this.router.navigate(['../survey-report'], { relativeTo: this.route });
    };
    SurveyFormPage.prototype.sendMail = function () {
        email.compose({
            subject: "Yo",
            body: "Hello <strong>dude</strong> :)",
            to: ['roan.j.dimaculangan@gmail.com'],
            cc: [],
            bcc: [],
            attachments: []
        }).then(function () {
            console.log("Email composer closed");
        }, function (err) {
            console.log("Error: " + err);
        });
        // $.ajax({
        //   type: 'POST',
        //   url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        //   data: {
        //     'key': 'be3395b93aa1d02466ea2108eb20312a-us3',
        //     'message': {
        //       'from_email': 'roan.j.dimaculangan@accenture.com',
        //       'to': [
        //           {
        //             'email': 'roan.j.dimaculangan@accenture.com',
        //             'name': 'RECIPIENT NAME (OPTIONAL)',
        //             'type': 'to'
        //           }
        //         ],
        //       'autotext': 'true',
        //       'subject': 'YOUR SUBJECT HERE!',
        //       'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
        //     }
        //   }
        //  }).done(function(response) {
        //    console.log(response); // if you're into that sorta thing
        //  });
    };
    SurveyFormPage = tslib_1.__decorate([
        Component({
            selector: 'app-survey-form',
            templateUrl: './survey-form.page.html',
            styleUrls: ['./survey-form.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            Router,
            ActivatedRoute])
    ], SurveyFormPage);
    return SurveyFormPage;
}());
export { SurveyFormPage };
//# sourceMappingURL=survey-form.page.js.map