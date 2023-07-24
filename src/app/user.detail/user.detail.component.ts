import { Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-user.detail',
  templateUrl: './user.detail.component.html',
  styleUrls: ['./user.detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  public userID!: number;
  public userdetail!: User;
  
  constructor(private activatedRoute:ActivatedRoute, private api:apiService, private router: Router){


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.userID= val['id'];
      this.fetchuserDeatils(this.userID);
    })
    
  }
  fetchuserDeatils(userID: number){
    this.api.getRegisteredUserId(userID)
    .subscribe(res=>{
      this.userdetail=res;
    })
  }
  edit(id:number){
    this.router.navigate(['update',id]);
    }
}

