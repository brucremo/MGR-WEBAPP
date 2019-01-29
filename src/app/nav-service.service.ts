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

    /*//store the navList element into a variable
    var navList = document.getElementById("nav-list");

    //get list items
    var search = document.getElementById("nav-list-option1"); //search
    var profile = document.getElementById("nav-list-option2"); //profile
    var collection = document.getElementById("nav-list-option3"); //collection
    var logIn = document.getElementById("nav-list-option4"); //log in

    //appending list items before replacing
    navList.appendChild(search);
    navList.appendChild(profile);
    navList.appendChild(collection);
    navList.appendChild(logIn);

    //create replacement node for profile
    var profReplace = document.createElement("li");
    var profReplaceText = document.createTextNode("");
    profReplace.appendChild(profReplaceText);

    //replace profile
    navList.replaceChild(profReplace, profile);

    //create replacement node for collection
    var collReplace = document.createElement("li");
    var collReplaceText = document.createTextNode("");
    collReplace.appendChild(collReplaceText);

    //replace collection
    navList.replaceChild(collReplace, collection);
*/
  }

  loggedInView() {
    this.promptLogin = false;
    this.accountOptions = true; 
    this.username = this.getCookie("username");
    /*
    //store the navList element into a variable
    var navList = document.getElementById("nav-list");

    //get list items
    var search = document.getElementById("nav-list-option1"); //search
    var collection = document.getElementById("nav-list-option3"); //collection

    var profile = document.getElementById("nav-list-option2"); //profile
    var profDropDown = document.getElementById("profDropDown"); //dropdown list for profile
    profile.appendChild(profDropDown);

    var logIn = document.getElementById("nav-list-option4"); //log in

    //appending list items before replacing
    navList.appendChild(search);
    navList.appendChild(collection);
    navList.appendChild(profile);
    navList.appendChild(logIn);

    //create replacement node for log in
    var logInReplace = document.createElement("li");
    var logInReplaceText = document.createTextNode("");
    logInReplace.appendChild(logInReplaceText);

    //replace profile
    navList.replaceChild(logInReplace, logIn);

    //create replacement node for collection
    var collReplace = document.createElement("li");
    var collReplaceText = document.createTextNode("");
    collReplace.appendChild(collReplaceText);

    //replace collection
    navList.replaceChild(collReplace, collection);

    //creating dropdown menu
    profile.className = "dropdown";
    profDropDown.className = "dropdown-toggle";
    profDropDown.id = "navBarDropDown";
    //profDropDown.setAttribute("role", "button");
    profDropDown.setAttribute("data-toggle", "dropdown");
    //profDropDown.setAttribute("aria-haspopup", "true");
    //profDropDown.setAttribute("aria-expanded", "false");

    //creating list (to append to drop down menu above);
    var dropDownMenu = document.createElement("ul");
    dropDownMenu.className = "dropdown-menu";
    //dropDownMenu.setAttribute("aria-labelledby", "navBarDropdown");
    profile.appendChild(dropDownMenu);

    //creates 'view profile' option
    var dropDownItem1 = document.createElement("a");
    var dropDownItem1Text = document.createTextNode("Go to Profile");
    //dropDownItem1.className = "dropdown-item";
    dropDownItem1.setAttribute("href", "/user/" + username);
    dropDownItem1.appendChild(dropDownItem1Text);
    dropDownMenu.appendChild(dropDownItem1);

    //creates 'edit profile' option
    var dropDownItem2 = document.createElement("a");
    var dropDownItem2Text = document.createTextNode("Edit profile");
    //dropDownItem2.className = "dropdown-item";
    dropDownItem2.setAttribute("href", "/editUser/" + username);
    dropDownItem2.appendChild(dropDownItem2Text);
    dropDownMenu.appendChild(dropDownItem2);

    /*creates divider
    var divider = document.createElement("div");
    divider.className = "dropdown-divider";
    dropDownMenu.appendChild(divider);

    //creates 'log out' option
    var dropDownItem3 = document.createElement("a");
    var dropDownItem3Text = document.createTextNode("Log Out");
    //dropDownItem3.className = "dropdown-item";
    dropDownItem3.setAttribute("href", "/logout");
    dropDownItem3.appendChild(dropDownItem3Text);
    dropDownMenu.appendChild(dropDownItem3);
    */
  }
}