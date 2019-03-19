import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IgdbService } from "../igdb.service";
import { Observable } from 'rxjs';

@Injectable()
export class GameGroupResolve implements Resolve<any> {

    constructor(private igdb: IgdbService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<any> {

        return this.igdb.getGameInfo(route.params['id']);
    }
}