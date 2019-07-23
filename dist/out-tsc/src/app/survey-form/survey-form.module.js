import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SurveyFormPage } from './survey-form.page';
var routes = [
    {
        path: '',
        component: SurveyFormPage
    }
];
var SurveyFormPageModule = /** @class */ (function () {
    function SurveyFormPageModule() {
    }
    SurveyFormPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [SurveyFormPage]
        })
    ], SurveyFormPageModule);
    return SurveyFormPageModule;
}());
export { SurveyFormPageModule };
//# sourceMappingURL=survey-form.module.js.map