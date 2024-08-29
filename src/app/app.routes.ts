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
    { 
        path: '', 
        component: DashboardComponent, 
        ...canActivate(redirectUnauthorizedToLogin)
    },

    { 
        path: 'login', 
        component: LandingComponent, 
        ...canActivate(redirectLoggedInToDashboard)
    },
    
    { 
        path: 'manage-account', 
        component: ManageAccountComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    
    { 
        path: 'translator', 
        component: TranslatorComponent
    },
    
    { 
        path: 'learn', 
        component: LearnComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    
    { 
        path: 'resources', 
        component: AdditionalResourcesComponent
    }
];
