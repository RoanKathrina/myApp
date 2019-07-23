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
  userKey: string = '';
  updateMode: boolean = false;
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

    this.appService.userKey.subscribe((userKey: string) => {
      this.userKey = userKey;
    })

    this.appService.updateMode.subscribe((updateMode: boolean) => {
      this.updateMode = updateMode;
    })

    this.initForm();
  }

  initForm() {
    this.surveyForm = new FormGroup({
      'question1': new FormControl({value: this.survey.question_1, disabled: !this.updateMode}),
      'question2': new FormControl({value: this.survey.question_2, disabled: !this.updateMode}),
      'question3': new FormControl({value: this.survey.question_3, disabled: !this.updateMode}),
      'question4': new FormControl({value: this.survey.question_4, disabled: !this.updateMode}),
      'question5': new FormControl({value: this.survey.question_5, disabled: !this.updateMode})
    })
  }

  onViewDashboard() {
    this.appService.updateMode.next(false);
    this.router.navigate(['../dashboard'], {relativeTo: this.route});
  }

  onViewSurvey(isAdminLoggedIn: boolean) {
    this.appService.user.next(isAdminLoggedIn);
    this.router.navigate(['../survey-form'], {relativeTo: this.route});
  }
  
  onSignOut() {
    this.appService.updateMode.next(false);
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onLogIn() {
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onUpdateUserSurvey() {
    const confirmSurveyUpdate = confirm(`Are you sure you want to update the survey of User: ${this.survey.id}?`);
    if (confirmSurveyUpdate === false) {
      return;
    } else {
      const survey = {
        id: this.survey.id,
        email: this.survey.email,
        date_and_time: this.survey.date_and_time,
        question_1: this.surveyForm.value['question1'],
        question_2: this.surveyForm.value['question2'],
        question_3: this.surveyForm.value['question3'],
        question_4: this.surveyForm.value['question4'],
        question_5: this.surveyForm.value['question5']
      }
  
      this.appService.updateUserSurvey(this.userKey, survey);
    }
  }

  onViewSurveyReport() {
    this.appService.user.next(true);
    this.router.navigate(['../survey-report'], {relativeTo: this.route});
  }
}
