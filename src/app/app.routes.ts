import { Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';

// Components
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './landing/dashboard/dashboard.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { LearnComponent } from './components/learn/learn.component';
import { AdditionalResourcesComponent } from './components/additional-resources/additional-resources.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);

export const routes: Routes = [
    { path: 'login', component: LandingComponent, ...canActivate(redirectLoggedInToDashboard)},
    { path: '', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)},
    { path: 'manage-account', component: ManageAccountComponent},
    { path: 'translator', component: TranslatorComponent},
    { path: 'learn', component: LearnComponent},
    { path: 'resources', component: AdditionalResourcesComponent}
];
