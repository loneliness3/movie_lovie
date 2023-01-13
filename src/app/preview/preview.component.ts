import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieResponse,Result, SingleMovieResponse } from '../models/movies_model';
import { ActivatedRoute } from '@angular/router';
import { MovieapiService } from '../services/movieapi.service';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, OnDestroy{
  constructor(private router:ActivatedRoute, private mservice: MovieapiService){}
  movieId!: string | null;
  overviewMovie: SingleMovieResponse | null = null;
  prefixImgurl = 'https://image.tmdb.org/t/p/w500/';
  originalImgurl = 'https://image.tmdb.org/t/p/original/';
  loading = true;
  errorText: string = ''
  private subs = new SubSink();

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.movieId = param.get('id');      
    })
    if(this.movieId !== null) {
        this.getSingleMovie(this.movieId)
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getSingleMovie(id: string){
   this.subs.sink = this.mservice.getMovies(id).subscribe({ 
    next: (response: SingleMovieResponse) => {
      this.overviewMovie = response
    },
    error: (error: any) => {
      this.errorText= 'Error'
    }
  })
  }
  
  
}
