import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { Result, MovieResponse } from '../models/movies_model';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private mService: MovieapiService, private router: Router) {

  }

  popular?: Result[];
  top_rated?: Result[];
  now_playing?: Result[];
  upcoming?: Result[];
  prefixImgurl = 'https://image.tmdb.org/t/p/w500/';
  loading = true;
  errorMessage = ""
  isUserLoggedIn = false;
  storeData:any; 

  movieSubscription: Subscription = new Subscription()
  private subs = new SubSink();


  ngOnInit(): void {
    this.storeData = localStorage.getItem("isUserLoggedIn");
    if (this.storeData != null && this.storeData == "true") {
      this.isUserLoggedIn = true;
    }
    else {
      this.isUserLoggedIn = false;
    }

    this.getMoviesList('popular')
    this.getMoviesList('top_rated')
    this.getMoviesList('now_playing')
    this.getMoviesList('upcoming')
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getMoviesList(myCat: string) {
    this.subs.sink = this.mService.getMovies(myCat).subscribe({
      next: (response: MovieResponse) => {
        switch (myCat) {
          case 'popular':
            this.popular = response.results
            break;
          case 'top_rated':
            this.top_rated = response.results
            break;
          case 'now_playing':
            this.now_playing = response.results
            break;
          case 'upcoming':
            this.upcoming = response.results
            break;
        }
        this.loading = false
      },
      error: (error) => {
        this.errorMessage = "Error"
      }
    })   
  }
  check(){
    console.log('-----------------------------')
    if(!localStorage.getItem("isUserLoggedIn")){
      alert('You need to log in first')
    }
  }

  gotoDetail(id:number){
    this.router.navigate([`overview/${id}`])
  }
}
