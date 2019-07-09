import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
