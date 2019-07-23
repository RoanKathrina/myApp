import * as tslib_1 from "tslib";
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
var FIREBASE_URL = 'https://machine-problem-checkout.firebaseio.com/survey.json/';
var AppService = /** @class */ (function () {
    function AppService(http, db) {
        this.http = http;
        this.db = db;
        // user = new Subject<any>();
        // survey = new Subject<any>();
        this.user = new BehaviorSubject(null);
        this.survey = new BehaviorSubject(null);
        this.userID = new BehaviorSubject(null);
        this.userKey = new BehaviorSubject(null);
        this.updateMode = new BehaviorSubject(null);
        // userID = new Subject<any>();
        // surveyList = [];
        this.surveys = [];
        this.surveyList = [
            {
                user: 1,
                email: 'roan@gmail.com',
                date_and_time: 'Friday Jun 28 2019 3:25:03 PM',
                question_1: "Roan's Burger",
                question_2: "Moderate",
                question_3: "Lettuce",
                question_4: "Never",
                question_5: "Friendlier Staff and Crew"
            },
        ];
        this.survey$ = db.list('/survey');
    }
    AppService.prototype.addSurvey = function (survey) {
        this.survey$.push(survey);
    };
    // addSurvey(survey: any) {
    //     return this.http.post(FIREBASE_URL, survey);
    // }
    AppService.prototype.deleteUserSurvey = function (key) {
        this.db.object('/survey/' + key).remove();
    };
    AppService.prototype.updateUserSurvey = function (userKey, survey) {
        this.db.object('/survey/' + userKey).set(survey);
    };
    // fetchSurvey() {
    //     this.survey$ = this.db.list('/survey');
    //     return this.survey$;
    // }
    // addSurveyToList(survey: any) {
    //     this.surveyList.push(survey);
    // }
    AppService.prototype.fetchSurvey = function () {
        return this.http.get(FIREBASE_URL);
    };
    AppService.prototype.getSurveyList = function () {
        return this.surveyList;
    };
    // getSurvey(userID: number) {
    //     let i=0, survey;
    //     for(i=0; i< this.surveyList.length; i++) {
    //         if(this.surveyList[i].user != userID){
    //             continue;
    //         }
    //         else {
    //             survey = this.surveyList[i];
    //             break;
    //         }
    //     }
    //     return survey;
    // }
    AppService.prototype.getSurvey = function (userID) {
        var surveys = [], i = 0, survey = {};
        this.fetchSurvey().subscribe(function (response) {
            surveys = Object.values(response.json());
            // console.log(surveys[0]['id']);
            for (i = 0; i < surveys.length; i++) {
                if (surveys[i]['id'] !== userID) {
                    continue;
                }
                else {
                    return (surveys[i]);
                }
            }
        });
    };
    AppService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http,
            AngularFireDatabase])
    ], AppService);
    return AppService;
}());
export { AppService };
//# sourceMappingURL=app.service.js.map