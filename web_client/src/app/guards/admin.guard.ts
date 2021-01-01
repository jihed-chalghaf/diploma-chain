import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalService } from 'app/services/local.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private localService: LocalService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let's check if the current user's role
    const role = this.localService.getJsonValue('role');
    if (role && role == 'Admin') {
      // the user is an admin, so he's authorized
      return true;
    }
    // the user has no role or he has a different one, so let's redirect him to the landing page
    this.router.navigate(['/']);
    return false;
  }
  
}
