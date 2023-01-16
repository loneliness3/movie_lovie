import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isUserLoggedIn = false;
  storeData:any; 
  menuOpen = false;
  catMenuOpen = false;

  constructor(
    private sService: MovieapiService, private router: Router){}  

  ngOnInit() {    
    this.storeData = localStorage.getItem("isUserLoggedIn");
    console.log("StoreData: " + this.storeData);

    if (this.storeData != null && this.storeData == "true") {
      this.isUserLoggedIn = true;
    }
    else {
      this.isUserLoggedIn = false;
    }
  }

   logOut(){
    this.sService.logout()
    this.router.navigate(['/home'])
   }

   activateMenu():void {
    this.catMenuOpen = false
    this.menuOpen = !this.menuOpen
   }

   activateCatMenu():void {
    this.menuOpen = false
    this.catMenuOpen = !this.catMenuOpen
   }
}
