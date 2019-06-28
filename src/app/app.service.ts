import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const FIREBASE_URL = '';
@Injectable()
export class AppService {
    // user = new Subject<any>();
    // survey = new Subject<any>();

    user = new BehaviorSubject<any>(null);
    survey = new BehaviorSubject<any>(null);
    // surveyList = [];
    surveyList = [
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
        {
            user: 2,
            date_and_time: 'Friday Jun 28 2019 3:25:03 PM',
            email: 'roan@gmail.com',
            question_1: "Roan's Burger",
            question_2: "Moderate",
            question_3: "Lettuce",
            question_4: "Never",
            question_5: "Friendlier Staff and Crew"            
        },
        {
            user: 3,
            date_and_time: 'Friday Jun 28 2019 3:25:03 PM',
            email: 'roan@gmail.com',
            question_1: "Roan's Burger",
            question_2: "Moderate",
            question_3: "Lettuce",
            question_4: "Never",
            question_5: "Friendlier Staff and Crew"            
        }
    ];

    constructor(private http: Http) {}

    addSurvey(survey: any) {
        return this.http.post(FIREBASE_URL, survey);
    }

    addSurveyToList(survey: any) {
        this.surveyList.push(survey);
    }

    fetchSurvey() {
        return this.http.get(FIREBASE_URL);
    }

    getSurveyList() {
        return this.surveyList;
    }

    getSurvey(userID: number) {
        let i=0, survey;
        for(i=0; i< this.surveyList.length; i++) {
            if(this.surveyList[i].user != userID){
                continue;
            }
            else {
                survey = this.surveyList[i];
                break;
            }
        }
        return survey;
    }

}