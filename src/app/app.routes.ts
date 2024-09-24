import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';
import { QuizGuard } from './guards/quiz.guard';

// Components
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/landing/dashboard/dashboard.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { LearnComponent } from './components/learn/learn.component';
import { QuizComponent } from './components/quiz/quiz.component';

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
        path: 'transcribe', 
        component: TranslatorComponent
    },
    
    { 
        path: 'learn', 
        component: LearnComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    { 
        path: 'quiz/:id', 
        component: QuizComponent,
        canActivate: [redirectUnauthorizedToLogin, QuizGuard]
    },
];
