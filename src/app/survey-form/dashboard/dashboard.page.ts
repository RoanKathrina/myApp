import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  surveys = [];
  isAdminLoggedIn: boolean = false;
  userSubscription: Subscription;
  surveySubscription: Subscription;
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
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
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: Dashboard');
    this.userSubscription = this.appService.user.subscribe((user: any) => {
      this.isAdminLoggedIn = user;
    })

    // Get Surveys from Firebase
    this.surveySubscription = this.appService.fetchSurvey().subscribe((response: any) => {
      if(response.json() === null) {
        this.surveys = [];
        // return;
      } else {
        this.surveys = Object.entries(response.json());
      }
    })
  
    // this.surveys$ = this.appService.fetchSurvey();
    // console.log(this.surveys$);
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.surveySubscription.unsubscribe();

  }

  onViewSurvey() {
    // const isAdminLoggedIn = true;
    // this.appService.user.next(true);
    this.appService.user.next(this.isAdminLoggedIn);
    this.router.navigate(['../survey-form'], {relativeTo: this.route})
  }

  onSignOut() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewUserSurvey(survey: {}) {
    // const survey = this.appService.getSurvey(userID);
    // console.log('survey: ' + survey);
    console.log(survey);
    this.appService.survey.next(survey);
    this.appService.user.next(true);
    this.router.navigate(['../view-survey'], {relativeTo: this.route})
  }

  onViewSurveyReport() {
    this.router.navigate(['../survey-report'], {relativeTo: this.route});
  }

  onLogIn() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteUserSurvey(key: string, id: number) {
    const confirmDeleteSurvey = confirm(`Are you sure you want to delete: User ${id}?`);
    if (confirmDeleteSurvey === false) {
      return;
    } else {
      this.appService.deleteUserSurvey(key);
    }
    this.ionViewWillEnter();
    // this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
    //   this.appService.user.next(true);
    //   this.router.navigate([decodeURI(this.location.path())]);
    // })
  }

  onUpdateUserSurvey(key: string, survey: {}) {
    const confirmUpdateSurvey = confirm(`Are you sure you want to update survey of User ${survey['id']}?`);
    if (confirmUpdateSurvey === false) {
      return;
    } else {
      this.appService.survey.next(survey);
      this.appService.user.next(true);
      this.appService.userKey.next(key);
      this.appService.updateMode.next(true);
      this.router.navigate(['../view-survey'], {relativeTo: this.route});  
    }
  }

}
