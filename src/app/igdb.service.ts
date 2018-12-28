import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IgdbService {
  //API URL
  public api = "https://mgr-restapi.herokuapp.com";
 // public api = "http://localhost:8082";

  constructor(
    private http: HttpClient
  ) { }

  //This will return search results and the IDs of the games with all fields
  getGamesByName(name, offset = undefined): Observable<any>{

    var requestURL = `${this.api}/games/${name}`;

    if(offset != undefined){

      requestURL = `${this.api}/games/${name}/${offset}`;
    }

    return this.http.get<any>(requestURL);
  }

  //Get information from a specific game based on its ID with all fields
  getGameInfo(gameID): Observable<any>{

    return this.http.get<any>(`${this.api}/game/${gameID}`);
  }

  
}
