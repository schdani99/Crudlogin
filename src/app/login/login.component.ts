import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
public loginform!: FormGroup
constructor(private formBuilder:FormBuilder, private http: HttpClient, private router : Router){}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/Dolgok")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginform.value.mail && a.password === this.loginform.value.password
      });
      if(user){
        alert("Sikeres bejelentkezés");
        this.loginform.reset()
       // this.router.navigate(['/register']
       
        this.router.navigate(['/detail/'+user.id]
        )
      }else{
        alert("Sikertlen");
      }
      
    },err=>{
      alert("Valami nemjó!")
    })
      
    

  }
}
