import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service';
import { User } from 'src/app/model/User';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  
  authToken: any;
  users: User[] = [];
  currentUser: any;
  currentIndex = -1;
  name = '';

  constructor(
    private service: Service,
    private storageService: StorageService,
    private router: Router,
    ) {
    this.authToken = storageService.get();
   }

  ngOnInit() {
    
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.service.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() { 
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number) {
    this.currentUser = user;
    this.currentIndex = index;
  }


  searchName(name:string) {
    this.service.findByName(name)
      .subscribe(
        response => {
          this.currentUser = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  editRoute(id:string){
    this.router. navigate([`/detail/${id}`]); 
  }

  deleteUser(id:string) {
    this.service.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

}