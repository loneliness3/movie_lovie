import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email:string = '';
  password:string = '';
  formData!: FormGroup;
  isLoggedIn: any;

  constructor(private router: Router, private mService: MovieapiService) {
    
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("isUserLoggedIn")
    if(this.isLoggedIn==true){
      this.router.navigate(['/home'])
    }
    this.formData = new FormGroup(
      {
        email: new FormControl(''),
        password: new FormControl('')
      }
    )
  }

  onClickSubmit(data: any){
    console.log(this.formData)
    this.email = data.email;
    this.password = data.password;

    this.mService.signIn(this.email, this.password).subscribe(data=>{
      if(data) this.router.navigate(['/home'])
    })
  }
}
