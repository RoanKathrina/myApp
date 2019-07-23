import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewSurveyPage } from './view-survey.page';
var routes = [
    {
        path: '',
        component: ViewSurveyPage
    }
];
var ViewSurveyPageModule = /** @class */ (function () {
    function ViewSurveyPageModule() {
    }
    ViewSurveyPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [ViewSurveyPage]
        })
    ], ViewSurveyPageModule);
    return ViewSurveyPageModule;
}());
export { ViewSurveyPageModule };
//# sourceMappingURL=view-survey.module.js.map