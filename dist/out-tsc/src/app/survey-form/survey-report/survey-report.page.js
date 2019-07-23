import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
var SurveyReportPage = /** @class */ (function () {
    function SurveyReportPage(appService, router, route) {
        this.appService = appService;
        this.router = router;
        this.route = route;
        this.isAdminLoggedIn = false;
        this.surveyList = [];
        console.log('Constructor');
    }
    SurveyReportPage.prototype.ngOnInit = function () {
        console.log('ngOnInit Survey Report');
        // this.userSubscription = this.appService.user.subscribe((user: any) => {
        //   this.isAdminLoggedIn = user;
        // })
        // this.surveySubscription = this.appService.fetchSurvey().subscribe((response: any) => {
        //   this.surveyList = Object.values(response.json());
        //   console.log(this.surveyList);
        //   this.renderQuestion1Chart(this.getQuestion1Values());
        //   this.renderQuestion2Chart(this.getQuestion2Values());
        //   this.renderQuestion3Chart(this.getQuestion3Values());
        //   this.renderQuestion4Chart(this.getQuestion4Values());
        // })
    };
    SurveyReportPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('IOnViewWillEnter');
        this.userSubscription = this.appService.user.subscribe(function (user) {
            _this.isAdminLoggedIn = user;
        });
        this.surveySubscription = this.appService.fetchSurvey().subscribe(function (response) {
            if (response.json() === null) {
                _this.surveyList = [];
                // return;
                console.log('Survey List length is zero (0)');
            }
            else {
                _this.surveyList = Object.values(response.json());
                _this.renderQuestion1Chart(_this.getQuestion1Values());
                _this.renderQuestion2Chart(_this.getQuestion2Values());
                _this.renderQuestion3Chart(_this.getQuestion3Values());
                _this.renderQuestion4Chart(_this.getQuestion4Values());
                _this.renderQuestion5Chart(_this.getQuestion5Values());
            }
        });
    };
    SurveyReportPage.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
        this.surveySubscription.unsubscribe();
    };
    SurveyReportPage.prototype.getQuestion1Values = function () {
        var i = 0, roans_burger = 0, cheese_burger = 0, cheese_burger_de_luxe = 0, cheesy_burger_roan = 0;
        var question1Val = {
            roans_burger: 0,
            cheese_burger: 0,
            cheese_burger_de_luxe: 0,
            cheesy_burger_roan: 0
        };
        for (i = 0; i < this.surveyList.length; i++) {
            // console.log(this.surveyList[i].question_1);
            if (this.surveyList[i].question_1 === "Roan's Burger") {
                roans_burger = roans_burger + 1;
            }
            else if (this.surveyList[i].question_1 === "Cheese Burger") {
                cheese_burger = cheese_burger + 1;
            }
            else if (this.surveyList[i].question_1 === "Cheese Burger De Luxe") {
                cheese_burger_de_luxe = cheese_burger_de_luxe + 1;
            }
            else {
                cheesy_burger_roan = cheesy_burger_roan + 1;
            }
        }
        question1Val.roans_burger = roans_burger;
        question1Val.cheese_burger = cheese_burger;
        question1Val.cheese_burger_de_luxe = cheese_burger_de_luxe;
        question1Val.cheesy_burger_roan = cheesy_burger_roan;
        return question1Val;
    };
    SurveyReportPage.prototype.getQuestion2Values = function () {
        var i = 0, poor = 0, moderate = 0, good = 0, very_good = 0;
        var question2Val = {
            poor: 0,
            moderate: 0,
            good: 0,
            very_good: 0
        };
        for (i = 0; i < this.surveyList.length; i++) {
            if (this.surveyList[i].question_2 === 'Poor') {
                poor = poor + 1;
            }
            else if (this.surveyList[i].question_2 === 'Moderate') {
                moderate = moderate + 1;
            }
            else if (this.surveyList[i].question_2 === 'Good') {
                good = good + 1;
            }
            else {
                very_good = very_good + 1;
            }
        }
        question2Val.poor = poor;
        question2Val.moderate = moderate;
        question2Val.good = good;
        question2Val.very_good = very_good;
        return question2Val;
    };
    SurveyReportPage.prototype.getQuestion3Values = function () {
        var i = 0, lettuce = 0, pickles = 0, tomatoes = 0, mushrooms = 0;
        var question3Val = {
            lettuce: 0,
            pickles: 0,
            tomatoes: 0,
            mushrooms: 0
        };
        for (i = 0; i < this.surveyList.length; i++) {
            if (this.surveyList[i].question_3 === 'Lettuce') {
                lettuce = lettuce + 1;
            }
            else if (this.surveyList[i].question_3 === 'Pickles') {
                pickles = pickles + 1;
            }
            else if (this.surveyList[i].question_3 === 'Tomato') {
                tomatoes = tomatoes + 1;
            }
            else {
                mushrooms = mushrooms + 1;
            }
        }
        question3Val.lettuce = lettuce;
        question3Val.pickles = pickles;
        question3Val.tomatoes = tomatoes;
        question3Val.mushrooms = mushrooms;
        return question3Val;
    };
    SurveyReportPage.prototype.getQuestion4Values = function () {
        var i = 0, never = 0, not_likely = 0, very_much = 0;
        var question4Val = {
            never: 0,
            not_likely: 0,
            very_much: 0
        };
        for (i = 0; i < this.surveyList.length; i++) {
            if (this.surveyList[i].question_4 === 'Never') {
                never = never + 1;
            }
            else if (this.surveyList[i].question_4 === 'Not likely') {
                not_likely = not_likely + 1;
            }
            else {
                very_much = very_much + 1;
            }
        }
        question4Val.never = never;
        question4Val.not_likely = not_likely;
        question4Val.very_much = very_much;
        return question4Val;
        1;
    };
    SurveyReportPage.prototype.getQuestion5Values = function () {
        var i = 0, friendlier_staff_and_crew = 0, bigger_roans_burger_stores = 0, more_franchise = 0;
        var question5Val = {
            friendlier_staff_and_crew: 0,
            bigger_roans_burger_stores: 0,
            more_franchise: 0
        };
        for (i = 0; i < this.surveyList.length; i++) {
            if (this.surveyList[i].question_5 === 'Friendlier Staff and Crew') {
                friendlier_staff_and_crew = friendlier_staff_and_crew + 1;
            }
            else if (this.surveyList[i].question_5 === "Bigger Roan's Burger Stores") {
                bigger_roans_burger_stores = bigger_roans_burger_stores + 1;
            }
            else {
                more_franchise = more_franchise + 1;
            }
        }
        question5Val.friendlier_staff_and_crew = friendlier_staff_and_crew;
        question5Val.bigger_roans_burger_stores = bigger_roans_burger_stores;
        question5Val.more_franchise = more_franchise;
        return question5Val;
    };
    SurveyReportPage.prototype.renderQuestion1Chart = function (question1Val) {
        var chartData = {
            type: 'bar',
            plotarea: {
                height: '100%'
            },
            gui: {
                contextMenu: {
                    button: {
                        visible: false
                    }
                }
            },
            mediaRules: [
                {
                    maxWidth: 500,
                    fontSize: '10',
                    height: '100%',
                }
            ],
            title: {
                text: "What is the most delicious Roan's Burger for you?",
                adjustLayout: true,
                mediaRules: [
                    {
                        maxWidth: 500,
                        fontSize: '10',
                        wrapText: true
                    }
                ]
            },
            legend: {
                draggable: true,
                visible: false
            },
            scaleX: {
                // label: {text: "Question No. 1"},
                labels: [
                    "Roan's Burger",
                    "Cheese Burger",
                    "Cheese Burger De Luxe",
                    "Cheesy Burger Roan"
                ],
                item: {
                    mediaRules: [
                        {
                            maxWidth: 500,
                            fontSize: '7',
                            angle: '45'
                        }
                    ]
                }
            },
            series: [
                { values: [
                        question1Val.roans_burger,
                        question1Val.cheese_burger,
                        question1Val.cheese_burger_de_luxe,
                        question1Val.cheesy_burger_roan
                    ],
                    backgroundColor: '#703B09',
                },
            ]
        };
        zingchart.render({
            id: 'question1Chart',
            data: chartData,
            height: 400,
            width: '100%'
        });
    };
    SurveyReportPage.prototype.renderQuestion2Chart = function (question2Val) {
        var chartData = {
            type: 'bar',
            plotarea: {
                height: '100%',
                marginBottom: 'dynamic'
            },
            gui: {
                contextMenu: {
                    button: {
                        visible: false
                    }
                }
            },
            mediaRules: [
                {
                    maxWidth: 500,
                    fontSize: '10',
                    height: '100%',
                }
            ],
            title: {
                text: "How will you rate your favorite Roan's Burger?",
                mediaRules: [
                    {
                        maxWidth: 500,
                        fontSize: '10',
                        wrapText: true
                    }
                ] // Adds a title to your chart
            },
            legend: {
                draggable: true,
                visible: false
            },
            scaleX: {
                // label: {text: "Question No. 1"},
                labels: [
                    "Poor (Needs improvement)",
                    "Moderate (Just enough)",
                    "Good (Delicious)",
                    "Very Good (Very delicious)"
                ],
                item: {
                    mediaRules: [
                        {
                            maxWidth: 500,
                            fontSize: '7',
                            angle: '45'
                        }
                    ]
                }
            },
            series: [
                { values: [
                        question2Val.poor,
                        question2Val.moderate,
                        question2Val.good,
                        question2Val.very_good
                    ],
                    backgroundColor: '#703B09'
                },
            ]
        };
        zingchart.render({
            id: 'question2Chart',
            data: chartData,
            height: 400,
            width: '100%'
        });
    };
    SurveyReportPage.prototype.renderQuestion3Chart = function (question3Val) {
        var chartData = {
            type: 'bar',
            gui: {
                contextMenu: {
                    button: {
                        visible: false
                    }
                }
            },
            mediaRules: [
                {
                    maxWidth: 500,
                    fontSize: '10',
                    height: '100%',
                }
            ],
            title: {
                text: "What other toppings do you want to be available in your Roan's Burger?",
                mediaRules: [
                    {
                        maxWidth: 500,
                        fontSize: '10',
                        wrapText: true
                    }
                ]
            },
            legend: {
                draggable: true,
                visible: false
            },
            scaleX: {
                // label: {text: "Question No. 1"},
                labels: [
                    "Lettuce",
                    "Pickles",
                    "Tomatoes",
                    "Mushrooms"
                ],
                item: {
                    mediaRules: [
                        {
                            maxWidth: 500,
                            fontSize: '7',
                            angle: '45'
                        }
                    ]
                }
            },
            series: [
                { values: [
                        question3Val.lettuce,
                        question3Val.pickles,
                        question3Val.tomatoes,
                        question3Val.mushrooms
                    ],
                    backgroundColor: '#703B09'
                },
            ]
        };
        zingchart.render({
            id: 'question3Chart',
            data: chartData,
            height: 400,
            width: '100%'
        });
    };
    SurveyReportPage.prototype.renderQuestion4Chart = function (question4Val) {
        var chartData = {
            type: 'bar',
            gui: {
                contextMenu: {
                    button: {
                        visible: false
                    }
                }
            },
            mediaRules: [
                {
                    maxWidth: 500,
                    fontSize: '10',
                    height: '100%',
                }
            ],
            title: {
                text: "How likely are you to recommend Roan's Burger to your family, friends, and colleagues?",
                mediaRules: [
                    {
                        maxWidth: 500,
                        fontSize: '10',
                        wrapText: true
                    }
                ]
            },
            legend: {
                draggable: true,
                visible: false
            },
            scaleX: {
                // label: {text: "Question No. 1"},
                labels: [
                    "Never",
                    "Not likely",
                    "Very much"
                ],
                item: {
                    mediaRules: [
                        {
                            maxWidth: 500,
                            fontSize: '7',
                            angle: '45'
                        }
                    ]
                }
            },
            series: [
                { values: [
                        question4Val.never,
                        question4Val.not_likely,
                        question4Val.very_much
                    ],
                    backgroundColor: '#703B09'
                },
            ]
        };
        zingchart.render({
            id: 'question4Chart',
            data: chartData,
            height: 400,
            width: '100%'
        });
    };
    SurveyReportPage.prototype.renderQuestion5Chart = function (question5Val) {
        var chartData = {
            type: 'bar',
            plotArea: {
                margin: 'dynamic',
                adjustLayout: true
            },
            gui: {
                contextMenu: {
                    button: {
                        visible: false
                    }
                }
            },
            mediaRules: [
                {
                    maxWidth: 500,
                    fontSize: '10',
                    height: '100%',
                }
            ],
            title: {
                text: "What are of Roan's Burger needs improvement?",
                mediaRules: [
                    {
                        maxWidth: 500,
                        fontSize: '10'
                    }
                ]
            },
            legend: {
                draggable: true,
                visible: false
            },
            scaleX: {
                // label: {text: "Question No. 1"},
                labels: [
                    "Friendlier Staff and Crew",
                    "Bigger Roan's Burger Stores",
                    "More franchise of Roan's Burger nationwide"
                ],
                item: {
                    mediaRules: [
                        {
                            maxWidth: 500,
                            fontSize: '7',
                            angle: '45',
                            wrapText: true,
                            margin: '200px',
                            marginBottom: 'dynamic'
                            // maxItems: '20'
                            // padding: '10px'
                            // marginBottom: '1000px'
                            // autoFit: true
                        }
                    ]
                }
            },
            series: [
                { values: [
                        question5Val.friendlier_staff_and_crew,
                        question5Val.bigger_roans_burger_stores,
                        question5Val.more_franchise
                    ],
                    backgroundColor: '#703B09'
                },
            ]
        };
        zingchart.render({
            id: 'question5Chart',
            data: chartData,
            height: 400,
            width: '100%'
        });
    };
    SurveyReportPage.prototype.onViewDashboard = function () {
        this.router.navigate(['../dashboard'], { relativeTo: this.route });
    };
    SurveyReportPage.prototype.onViewSurvey = function () {
        this.router.navigate(['../survey-form'], { relativeTo: this.route });
    };
    SurveyReportPage.prototype.onSignout = function () {
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    SurveyReportPage.prototype.onLogIn = function () {
        this.appService.user.next(false);
        this.router.navigate(['../'], { relativeTo: this.route });
    };
    SurveyReportPage = tslib_1.__decorate([
        Component({
            selector: 'app-survey-report',
            templateUrl: './survey-report.page.html',
            styleUrls: ['./survey-report.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AppService,
            Router,
            ActivatedRoute])
    ], SurveyReportPage);
    return SurveyReportPage;
}());
export { SurveyReportPage };
//# sourceMappingURL=survey-report.page.js.map