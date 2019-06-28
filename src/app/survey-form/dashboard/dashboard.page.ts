import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  surveys = [];
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Get Surveys from Firebase
    // this.appService.fetchSurvey().subscribe((response: any) => {
    //   this.surveys = response;
    // })
    // Temporary Source Code
    this.surveys = this.appService.getSurveyList();
  }

  onViewSurvey() {
    // const isAdminLoggedIn = true;
    this.appService.user.next(true);
    this.router.navigate(['../survey-form'], {relativeTo: this.route})
  }

  onSignOut() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewUserSurvey(userID: number) {
    const survey = this.appService.getSurvey(userID);
    this.appService.survey.next(survey);
    this.appService.user.next(true);
    this.router.navigate(['../view-survey'], {relativeTo: this.route})
  }

}
