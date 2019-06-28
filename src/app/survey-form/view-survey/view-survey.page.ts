import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.page.html',
  styleUrls: ['./view-survey.page.scss'],
})
export class ViewSurveyPage implements OnInit {

  survey = null;
  isAdminLoggedIn: boolean = false;
  surveyForm: FormGroup;
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.appService.survey.subscribe((survey: any) => {
      this.survey = survey;
      console.log(survey)
    })

    this.appService.user.subscribe((isAdminLoggedIn: boolean) => {
      this.isAdminLoggedIn = isAdminLoggedIn;
    })

    this.initForm();
  }

  initForm() {
    this.surveyForm = new FormGroup({
      'question1': new FormControl({value: this.survey.question_1, disabled: true}),
      'question2': new FormControl({value: this.survey.question_2, disabled: true}),
      'question3': new FormControl({value: this.survey.question_3, disabled: true}),
      'question4': new FormControl({value: this.survey.question_4, disabled: true}),
      'question5': new FormControl({value: this.survey.question_5, disabled: true})
    })
  }

  onViewDashboard() {
    this.router.navigate(['../dashboard'], {relativeTo: this.route});
  }

  onViewSurvey() {
    this.appService.user.next(true);
    this.router.navigate(['../survey-form'], {relativeTo: this.route});
  }
  
  onSignOut() {
    // this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
