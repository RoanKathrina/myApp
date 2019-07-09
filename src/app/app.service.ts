import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';

const FIREBASE_URL = 'https://machine-problem-checkout.firebaseio.com/survey.json/';
@Injectable()
export class AppService {
    // user = new Subject<any>();
    // survey = new Subject<any>();

    user = new BehaviorSubject<any>(null);
    survey = new BehaviorSubject<any>(null);
    userID = new BehaviorSubject<any>(null);
    userKey = new BehaviorSubject<any>(null);
    updateMode = new BehaviorSubject<any>(null);
    // userID = new Subject<any>();
    // surveyList = [];
    surveys = [];
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
        // {
        //     user: 2,
        //     date_and_time: 'Friday Jun 28 2019 3:25:03 PM',
        //     email: 'roan@gmail.com',
        //     question_1: "Roan's Burger",
        //     question_2: "Moderate",
        //     question_3: "Lettuce",
        //     question_4: "Never",
        //     question_5: "Friendlier Staff and Crew"            
        // },
        // {
        //     user: 3,
        //     date_and_time: 'Friday Jun 28 2019 3:25:03 PM',
        //     email: 'roan@gmail.com',
        //     question_1: "Roan's Burger",
        //     question_2: "Moderate",
        //     question_3: "Lettuce",
        //     question_4: "Never",
        //     question_5: "Friendlier Staff and Crew"            
        // }
    ];
    survey$;
    constructor(private http: Http,
                private db: AngularFireDatabase) {
        this.survey$ = db.list('/survey');    
    }

    addSurvey(survey: any) {
        this.survey$.push(survey);
    }

    // addSurvey(survey: any) {
    //     return this.http.post(FIREBASE_URL, survey);
    // }

    deleteUserSurvey(key: string) {
        this.db.object('/survey/' + key).remove();
    }

    updateUserSurvey(userKey: string, survey: {}) {
        this.db.object('/survey/' + userKey).set(survey);
    }

    // fetchSurvey() {
    //     this.survey$ = this.db.list('/survey');
    //     return this.survey$;
    // }

    // addSurveyToList(survey: any) {
    //     this.surveyList.push(survey);
    // }

    fetchSurvey() {
        return this.http.get(FIREBASE_URL);
    }

    getSurveyList() {
        return this.surveyList;
    }

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

    getSurvey(userID: number) {
        let surveys = [], i = 0, survey = {};
        this.fetchSurvey().subscribe((response: any) => {
            surveys = Object.values(response.json());
            // console.log(surveys[0]['id']);
            for (i=0; i<surveys.length; i++) {
                if(surveys[i]['id'] !== userID) {
                    continue;
                } else {
                    return (surveys[i]);
                }
            }
        })
    }

    // deleteUserSurvey(id: number) {
        // var itemRef = new Firebase(FIREBASE_URL);
        // itemRef.child(id).remove();

    //     console.log(FIREBASE_URL + id);
    //     return this.http.delete(FIREBASE_URL + id);
    // }
    // deleteUserSurvey(pos: number) {
    //     return this.http.delete(FIREBASE_URL + pos);
    // }
    // }

}