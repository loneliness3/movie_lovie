import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieapiService {
  isUserLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,private router: Router
  ) { }

  getMovies(cat: string) {
    const url = `https://api.themoviedb.org/3/movie/${cat}?api_key=baf68249c9e2d043a418e39e7a8e5d67`;
    return this.httpRequest(url)
  }

  signIn(email:string, password: string): Observable<any>{
    this.isUserLoggedIn = email == 'admin123@gmail.com' && password == 'admin';
    localStorage.setItem("isUserLoggedIn", `${this.isUserLoggedIn}`)
    console.log(this.isUserLoggedIn)

    return of(this.isUserLoggedIn).pipe(
      delay(1000)
    )

    // const options={
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html, application.json',
    //     'Content-type': 'application.json',
    //   })
    // }

    // const body = {
    //   "id": id,
    //   "password": password
    // }
    // console.log(this.http.post(url, body))
    // return this.http.post(url, body)
  }

  
  httpRequest(url: string, param?: any, token?: any, body?: any){

    const options={
      headers: new HttpHeaders({
        'Accept': 'text/html, application.json',
        'Content-type': 'application.json',
      })
    }
    return this.http.get(url, options)
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');

    this.router.navigate(['/home']);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
