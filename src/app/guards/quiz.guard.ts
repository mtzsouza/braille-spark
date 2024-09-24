import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const QuizGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = new Router();

  // Wait a little for firebase to load auth info
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get module id and user level
  const moduleId = route.params['id'];
  const level = await authService.getLevel();

  // Allow access only if level is enough
  if (level >= moduleId) {
    return true;
  } else {
    router.navigate(['/learn']);
    return false;
  }
};
