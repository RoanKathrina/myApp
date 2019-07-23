import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { app } from 'firebase';
declare var zingchart: any;

@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.page.html',
  styleUrls: ['./survey-report.page.scss'],
})
export class SurveyReportPage implements OnInit, OnDestroy {

  isAdminLoggedIn: boolean = false;
  userSubscription: Subscription;
  surveySubscription: Subscription;
  surveyList = [];
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) {
    console.log('Constructor');
               }

  ngOnInit() {
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

  }

  ionViewWillEnter() {
    console.log('IOnViewWillEnter: SurveyReport');
    this.userSubscription = this.appService.user.subscribe((user: any) => {
      this.isAdminLoggedIn = user;
    })

    this.surveySubscription = this.appService.fetchSurvey().subscribe((response: any) => {
      if(response.json() === null) {
        this.surveyList = [];
        // return;
        console.log('Survey List length is zero (0)');
      } else {
          this.surveyList = Object.values(response.json());
          this.renderQuestion1Chart(this.getQuestion1Values());
          this.renderQuestion2Chart(this.getQuestion2Values());
          this.renderQuestion3Chart(this.getQuestion3Values());
          this.renderQuestion4Chart(this.getQuestion4Values());
          this.renderQuestion5Chart(this.getQuestion5Values());
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.surveySubscription.unsubscribe();
  }

  getQuestion1Values() {
    let i = 0, roans_burger = 0, cheese_burger = 0, cheese_burger_de_luxe = 0, cheesy_burger_roan = 0;
    let question1Val = {
      roans_burger: 0,
      cheese_burger: 0,
      cheese_burger_de_luxe: 0,
      cheesy_burger_roan: 0
    }
    for(i=0; i< this.surveyList.length; i++){
      // console.log(this.surveyList[i].question_1);
      if (this.surveyList[i].question_1 === "Roan's Burger") {
        roans_burger = roans_burger + 1;
      } else if(this.surveyList[i].question_1 === "Cheese Burger") {
        cheese_burger = cheese_burger + 1;
      } else if(this.surveyList[i].question_1 === "Cheese Burger De Luxe") {
        cheese_burger_de_luxe = cheese_burger_de_luxe + 1;
      } else {
        cheesy_burger_roan = cheesy_burger_roan + 1;
      }
     }

     question1Val.roans_burger = roans_burger;
     question1Val.cheese_burger = cheese_burger;
     question1Val.cheese_burger_de_luxe = cheese_burger_de_luxe;
     question1Val.cheesy_burger_roan = cheesy_burger_roan;

     return question1Val;
  }

  getQuestion2Values() {
    let i = 0, poor = 0, moderate = 0, good = 0, very_good = 0;
    let question2Val = {
      poor: 0,
      moderate: 0,
      good: 0,
      very_good: 0
    }
    for(i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].question_2 === 'Poor') {
        poor = poor + 1;
      } else if(this.surveyList[i].question_2 === 'Moderate') {
        moderate = moderate + 1;
      } else if(this.surveyList[i].question_2 === 'Good') {
        good = good + 1;
      } else {
        very_good = very_good + 1;
      }
    }

    question2Val.poor = poor;
    question2Val.moderate = moderate;
    question2Val.good = good;
    question2Val.very_good = very_good;

    return question2Val;
  }

  getQuestion3Values() {
    let i = 0, lettuce = 0, pickles = 0, tomatoes = 0, mushrooms = 0;
    let question3Val = {
      lettuce: 0,
      pickles: 0,
      tomatoes: 0,
      mushrooms: 0
    }
    for (i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].question_3 === 'Lettuce') {
        lettuce = lettuce + 1;
      } else if(this.surveyList[i].question_3 === 'Pickles') {
        pickles = pickles + 1;
      } else if(this.surveyList[i].question_3 === 'Tomato') {
        tomatoes = tomatoes + 1;
      } else {
        mushrooms = mushrooms + 1;
      }
    }

    question3Val.lettuce = lettuce;
    question3Val.pickles = pickles;
    question3Val.tomatoes = tomatoes;
    question3Val.mushrooms = mushrooms;

    return question3Val;
  }

  getQuestion4Values() {
    let i = 0, never = 0, not_likely = 0, very_much = 0;
    let question4Val = {
      never: 0,
      not_likely: 0,
      very_much: 0
    }
    for(i=0; i< this.surveyList.length; i++) {
      	if(this.surveyList[i].question_4 === 'Never') {
          never = never + 1;
        } else if(this.surveyList[i].question_4 === 'Not likely') {
          not_likely = not_likely + 1;
        } else {
          very_much = very_much + 1;
        }
    }

    question4Val.never = never;
    question4Val.not_likely = not_likely;
    question4Val.very_much = very_much;

    return question4Val;1
  }

  getQuestion5Values() {
    let i = 0, friendlier_staff_and_crew = 0, bigger_roans_burger_stores = 0, more_franchise = 0;
    let question5Val = {
      friendlier_staff_and_crew: 0,
      bigger_roans_burger_stores: 0,
      more_franchise: 0
    }
    for(i=0; i< this.surveyList.length; i++) {
      if(this.surveyList[i].question_5 === 'Friendlier Staff and Crew') {
        friendlier_staff_and_crew = friendlier_staff_and_crew + 1;
      } else if(this.surveyList[i].question_5 === "Bigger Roan's Burger Stores") {
        bigger_roans_burger_stores = bigger_roans_burger_stores + 1;
      } else {
        more_franchise = more_franchise + 1;
      }
    }

    question5Val.friendlier_staff_and_crew = friendlier_staff_and_crew;
    question5Val.bigger_roans_burger_stores = bigger_roans_burger_stores;
    question5Val.more_franchise = more_franchise;
    return question5Val;
  }

  renderQuestion1Chart(question1Val: any) {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
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
        text: "What is the most delicious Roan's Burger for you?", // Adds a title to your chart,
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
      }, // Creates an interactive legend
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
      series: [  // Insert your series data here
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
     
    zingchart.render({ // Render Method[3]
      id: 'question1Chart',
      data: chartData,
      height: 400,
      width: '100%'
    });
  }

  renderQuestion2Chart(question2Val: any) {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
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
      }, // Creates an interactive legend
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
      series: [  // Insert your series data here
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
     
    zingchart.render({ // Render Method[3]
      id: 'question2Chart',
      data: chartData,
      height: 400,
      width: '100%'
    });
  }

  renderQuestion3Chart(question3Val: any) {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
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
        text: "What other toppings do you want to be available in your Roan's Burger?", // Adds a title to your chart
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
      }, // Creates an interactive legend
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
      series: [  // Insert your series data here
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
     
    zingchart.render({ // Render Method[3]
      id: 'question3Chart',
      data: chartData,
      height: 400,
      width: '100%'
    });
  }

  renderQuestion4Chart(question4Val: any) {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
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
        text: "How likely are you to recommend Roan's Burger to your family, friends, and colleagues?", // Adds a title to your chart
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
      }, // Creates an interactive legend
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
      series: [  // Insert your series data here
        { values: [
          question4Val.never,
          question4Val.not_likely,
          question4Val.very_much
        ],
        backgroundColor: '#703B09'
      },
      ]
    };
     
    zingchart.render({ // Render Method[3]
      id: 'question4Chart',
      data: chartData,
      height: 400,
      width: '100%'
    });
  }

  renderQuestion5Chart(question5Val: any) {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
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
          // maxHeight: 1000
        }
      ],
      title: {
        text: "What are of Roan's Burger needs improvement?", // Adds a title to your chart
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
      }, // Creates an interactive legend
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
      series: [  // Insert your series data here
        { values: [
          question5Val.friendlier_staff_and_crew,
          question5Val.bigger_roans_burger_stores,
          question5Val.more_franchise
        ],
        backgroundColor: '#703B09'
      },
      ]
    };
     
    zingchart.render({ // Render Method[3]
      id: 'question5Chart',
      data: chartData,
      height: 400,
      width: '100%'
    });
  }

  onViewDashboard() {
    this.router.navigate(['../dashboard'], {relativeTo: this.route});
  }

  onViewSurvey(isAdminLoggedIn: boolean) {
    this.appService.user.next(isAdminLoggedIn);
    this.router.navigate(['../survey-form'], {relativeTo: this.route});
  }

  onSignout() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onLogIn() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
