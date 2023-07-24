import { apiService } from '../services/api.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create.reg',
  templateUrl: './create.reg.component.html',
  styleUrls: ['./create.reg.component.scss']
})
export class CreateRegComponent implements OnInit {
  public packages: string[] = ["Havi","Negyed éves","Éves"];
  public Nemek: string[] =["Nő","Férfi"];
  public motivate: string[]=["Fogyás","Izom építés","Szálkásítás"];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute,private http:HttpClient,  private api:apiService,private toastService:NgToastService){


  }
  ngOnInit(): void {
    this.registerForm =this.fb.group({
      firstname: [''],
      lastname: [''],
      mail: [''],
      phone:[''],
      tomeg:[''],
      magas:[''],
      bmi: [''],
      password:[''],
      eddzo:[''],
      Neme:[''],
      motiv:[''],
      voltgym:[''],
      berlet:[''],
      date:['']

    }
    )
    
    
    
  
    this.registerForm.controls['magas'].valueChanges.subscribe(res=>{
      this.calculatebmi(res)
    })
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getRegisteredUserId(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.fillFomrtoUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })
  }
  submit(){
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res=>{
      this.toastService.success({detail:"Success",summary:"Tag hozzáadva",duration:3000});
this.registerForm.reset();
      alert("Sikeres Regisztrácó");
      this.router.navigate(['login'])
    },err=>{
      alert("Valami nemjó")
    })

  }
 

    
  
  update(){
    this.api.updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
    .subscribe(res=>{
this.toastService.success({detail:"Success",summary:"Tag szerkesztve",duration:3000});
this.registerForm.reset();
this.router.navigate(['/detail/'+this.userIdToUpdate])
    })
  }
  calculatebmi(magasValue: number){
    const tomeg = this.registerForm.value.tomeg;
    const magas = this.registerForm.value.magas;
    const bmi = (tomeg/ (magas*magas))*100;
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi <18.5:
        this.registerForm.controls['bmiresult'].patchValue("Sovány")
       
        
        break;
        case (bmi >=18.5 && bmi <23.5):
          this.registerForm.controls['bmiresult'].patchValue("Ideális")
          break;
          case (bmi >=23.5 && bmi <28.5):
          this.registerForm.controls['bmiresult'].patchValue("Túlsúly")
          break;
          case (bmi >=28.5 && bmi <38.5):
          this.registerForm.controls['bmiresult'].patchValue("Elhízás")
          break;
    
    
      default:this.registerForm.controls['bmiresult'].patchValue("Súlyos Elhízás")
        break;
    }

  }

  fillFomrtoUpdate(user: User){this.registerForm.setValue({
    firstname: user.firstname,
      lastname: user.lastname,
      mail: user.mail,
      phone:user.phone,
      tomeg:user.tomeg,
      magas:user.magas,
      bmi: user.bmi,
      password:user.password,
      berlet:user.berlet,
      eddzo:user.eddzo,
      Neme:user.Neme,
      motiv:user.motiv,
      voltgym:user.voltgym,
      date:user.date
  })

  }


}
