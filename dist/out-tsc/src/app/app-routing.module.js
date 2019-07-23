import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'survey-form', loadChildren: './survey-form/survey-form.module#SurveyFormPageModule' },
    { path: 'dashboard', loadChildren: './survey-form/dashboard/dashboard.module#DashboardPageModule' },
    { path: 'view-survey', loadChildren: './survey-form/view-survey/view-survey.module#ViewSurveyPageModule' },
    { path: 'survey-report', loadChildren: './survey-form/survey-report/survey-report.module#SurveyReportPageModule' }
    // { path: 'refresh', loadChildren: './refresh/refresh.module#RefreshPageModule' }
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    // { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
                RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map