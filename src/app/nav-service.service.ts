import { Injectable } from '@angular/core';

@Injectable()
export class NavServiceService {
  visible: boolean;
//  linkvisible: boolean;
  promptLogin: boolean;
  accountOptions: boolean;
  username: string;

  constructor() {
    this.visible = true;
   // this.linkvisible = false;
    this.accountOptions=false;
    this.promptLogin=true;
    this.username= "";
  }

  hide() {
    this.visible = true;
  }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  loggedOutView() {
    this.accountOptions = false;
    this.promptLogin = true; 
    this.username = this.getCookie("username");
  }

  loggedInView() {
    this.promptLogin = false;
    this.accountOptions = true; 
    this.username = this.getCookie("username");
  }
}