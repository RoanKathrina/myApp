import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
// import * as email from 'nativescript-email';
import { compose as composeEmail } from "nativescript-email";
// import { idText } from '_node_modules/typescript/lib/typescript';
declare var jquery: any;
declare var mandrill: any;
declare var email: any;
// import 'rxjs/add/operator/finally';

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
  surveyList;
  userID: number;
  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.appService.user.subscribe((adminLoggedIn: boolean) => {
      console.log(adminLoggedIn);
      this.isAdminLoggedIn = adminLoggedIn;
    })
    // this.sendMail();
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
      'email': new FormControl(null, [Validators.required, Validators.email]),
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
    // const surveyList = this.appService.getSurveyList();
    // const userID = surveyList.length + 1;

    // let surveyList: {};
    // let userID: number;
    this.appService.fetchSurvey().subscribe((response: any) => {
      // surveyList = response.json();
      // userID = Object.keys(surveyList).length + 1;
      this.surveyList = response.json();
      if(this.surveyList === null) {
        this.userID = 1;
      } else {
        this.userID = Object.keys(this.surveyList).length + 1; 
      }
      this.addSurvey();
      // this.appService.userID.next(userID);
    })

    // let id: number;
    // this.appService.userID.subscribe((id: number) => {
    //   id = id;
    // })

    // const survey = {
    //   id: 1,
    //   email: this.surveyForm.value['e-mail'],
    //   date_and_time: this.dateAndTime,
    //   question_1: this.surveyForm.value['question1'],
    //   question_2: this.surveyForm.value['question2'],
    //   question_3: this.surveyForm.value['question3'],
    //   question_4: this.surveyForm.value['question4'],
    //   question_5: this.surveyForm.value['question5']
    // }

    // //Add to Firebase
    // this.appService.addSurveyToList(survey);
    // this.appService.addSurvey(survey).subscribe((response: any) => {
    //   console.log(response);
    // });

    // window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
    // this.surveyForm.reset();
    // this.isSurveyFormSubmitted = false;
  }

  addSurvey() {
    const survey = {
      id: this.userID,
      email: this.surveyForm.value['email'],
      date_and_time: this.dateAndTime,
      question_1: this.surveyForm.value['question1'],
      question_2: this.surveyForm.value['question2'],
      question_3: this.surveyForm.value['question3'],
      question_4: this.surveyForm.value['question4'],
      question_5: this.surveyForm.value['question5']
    }

    //Add to Firebase
    // this.appService.addSurveyToList(survey);
    this.appService.addSurvey(survey);
    // this.appService.addSurvey(survey).subscribe((response: any) => {
    //   console.log(response);
    // });

    window.alert('Your survey is successfully submitted.\nThank you for answering the survey.');
    this.surveyForm.reset();
    this.isSurveyFormSubmitted = false;
  }

  onSignOut() {
    this.surveyForm.reset();
    // const isAdminLoggedIn = false;
    this.appService.user.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
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

  onViewSurveyReport() {
    this.appService.user.next(true);
    this.router.navigate(['../survey-report'], {relativeTo: this.route});
  }

  sendMail() {

    email.compose({
      subject: "Yo",
      body: "Hello <strong>dude</strong> :)",
      to: ['roan.j.dimaculangan@gmail.com'],
      cc: [],
      bcc: [],
      attachments: []
      }).then(
      function() {
        console.log("Email composer closed");
      }, function(err) {
        console.log("Error: " + err);
      });
    // $.ajax({
    //   type: 'POST',
    //   url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    //   data: {
    //     'key': 'be3395b93aa1d02466ea2108eb20312a-us3',
    //     'message': {
    //       'from_email': 'roan.j.dimaculangan@accenture.com',
    //       'to': [
    //           {
    //             'email': 'roan.j.dimaculangan@accenture.com',
    //             'name': 'RECIPIENT NAME (OPTIONAL)',
    //             'type': 'to'
    //           }
    //         ],
    //       'autotext': 'true',
    //       'subject': 'YOUR SUBJECT HERE!',
    //       'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
    //     }
    //   }
    //  }).done(function(response) {
    //    console.log(response); // if you're into that sorta thing
    //  });
}



}
