import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SurveyReportPage } from './survey-report.page';
var routes = [
    {
        path: '',
        component: SurveyReportPage
    }
];
var SurveyReportPageModule = /** @class */ (function () {
    function SurveyReportPageModule() {
    }
    SurveyReportPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SurveyReportPage]
        })
    ], SurveyReportPageModule);
    return SurveyReportPageModule;
}());
export { SurveyReportPageModule };
//# sourceMappingURL=survey-report.module.js.map