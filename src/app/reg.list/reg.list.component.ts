import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, } from '@angular/material/sort';
import { MatPaginator, } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { apiService } from '../services/api.service';
import {  Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reg.list',
  templateUrl: './reg.list.component.html',
  styleUrls: ['./reg.list.component.scss']
})
export class RegListComponent implements OnInit {
public dataSource!:MatTableDataSource<User>;
public users!: User[];

@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

displayedColumns: string[] = 
['id',
'firstname',
'lastname',
'mail',
'phone',
'bmi',
'date',
'Action']
constructor(private api:apiService,private toast:NgToastService, private router : Router, private confirm:NgConfirmService){}

ngOnInit(): void {
  this.getUsers();
}
getUsers() {
  this.api.getRegisteredUser()
    .subscribe({
      next: (res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
edit(id:number){
this.router.navigate(['update',id]);
}
deleteUser(id: number){
  
  {this.api.deleteRegistered(id)
    .subscribe(res=>{
      this.toast.success({detail:"Success",summary:"Tag szerkesztve",duration:3000});
      this.getUsers();
    })
  }
 
  
    
  
}


}
