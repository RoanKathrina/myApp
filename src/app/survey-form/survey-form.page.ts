import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.page.html',
  styleUrls: ['./survey-form.page.scss'],
})
export class SurveyFormPage implements OnInit {

  surveyForm: FormGroup;
  // isValidSurveyForm: boolean = null;
  isSurveyFormSubmitted: boolean = false;
  isAdminLoggedIn: boolean = false;
  dateAndTime = '';
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.appService.user.subscribe((adminLoggedIn: boolean) => {
      console.log(adminLoggedIn);
      this.isAdminLoggedIn = adminLoggedIn;
    })

    // console.log(this.isAdminLoggedIn);
  }

  ngOnChanges() {
    this.appService.user.subscribe((adminLoggedIn: boolean) => {
      this.isAdminLoggedIn = adminLoggedIn;
      console.log('ngOnChanges: ' + this.isAdminLoggedIn);
    })
  }

  initForm() {
    this.surveyForm = new FormGroup({
      'e-mail': new FormControl(null, [Validators.required, Validators.email]),
      'date_and_time': new FormControl({value: null, disabled: true}),
      'question1': new FormControl('', Validators.required),
      'question2': new FormControl('', Validators.required),
      'question3': new FormControl('', Validators.required),
      'question4': new FormControl('', Validators.required),
      'question5': new FormControl('', Validators.required)
    })
  }

  onResetSurvey() {
    const resetSurvey = confirm('Are you sure you want to reset the Survey?');
    if (resetSurvey === false) {
      return;
    }
    else {
      this.surveyForm.reset();
    }
  }

  onSubmit() {
    this.isSurveyFormSubmitted = true;
    if (this.surveyForm.invalid === true){
      window.alert('Kindly input required fields.');
      return;
    }
    // Save the Survey in firebase
    // Send e-mail to the Respondent
    const surveyList = this.appService.getSurveyList();
    const userID = surveyList.length + 1; 
    // console.log(this.dateAndTime);

    const survey = {
      user: userID,
      email: this.surveyForm.value['e-mail'],
      date_and_time: this.dateAndTime,
      question_1: this.surveyForm.value['question1'],
      question_2: this.surveyForm.value['question2'],
      question_3: this.surveyForm.value['question3'],
      question_4: this.surveyForm.value['question4'],
      question_5: this.surveyForm.value['question5']
    }

    //Add to Firebase
    this.appService.addSurveyToList(survey);
    this.appService.addSurvey(survey).subscribe((response: any) => {
      console.log(response);
    });

    window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
    this.surveyForm.reset();
    this.isSurveyFormSubmitted = false;
  }

  onSignOut() {
    this.surveyForm.reset();
    // const isAdminLoggedIn = false;
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onLogIn() {
    this.surveyForm.reset();
    // const isAdminLoggedIn = false;
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewDashboard() {
    // this.appService.user.next(true);
    this.surveyForm.reset();
    this.router.navigate(['../dashboard'], {relativeTo: this.route});
  }

  onGenerateDateAndTime() {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    this.dateAndTime= `${date} ${time}`;
  }


}
