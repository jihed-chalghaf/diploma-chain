import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Web3Service } from 'app/services/web3.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(
    private web3Serivce: Web3Service,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    let logged = this.web3Serivce.isLogged();
    console.log("Is the current user logged in? : ", logged);
    // user is logged in => logged = true
    if (logged) {
      // logged in => redirect to landing page
      this.router.navigate(["/"]);
    }
    return !logged;
  } 
}
