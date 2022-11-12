import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { User } from 'src/app/model/User';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: any;
  user = {
    id:'',
    name: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cep: '',
    state: '',
  };
  currentUser: any;
  currentIndex = -1;
  name = '';
  constructor(
    private service: Service, 
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.retrieveUser(this.id);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Closed');
    });
  }
  searchCEP(cep : string){
    this.service.searchCEP(cep)
      .subscribe(
        response => {
          const responseData = JSON.parse(JSON.stringify(response))
          console.log(response)
          //console.log(responseData.logradouro)
          
           this.user.address= responseData.logradouro,
           this.user.city= responseData.localidade,
           this.user.state= responseData.uf,
        
            //this.currentUser.address = response
            console.log(this.currentUser)
        },
        error =>{
          console.error(error);
          
        }
      );

  }
  retrieveUser(id: string) {
    this.service.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          this.user = this.currentUser;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.currentUser = null;
  }

  setActiveUser(user: User) {
    this.currentUser = user;
  }



  deleteUser(id: string) {
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

  updateUser() {
   
    const data = {
      id:this.currentUser.id,
      name: this.currentUser.name,
      password: this.currentUser.password,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      address: this.currentUser.address,
      city: this.currentUser.city,
      cep: this.currentUser.cep,
      state: this.currentUser.state,
    };
    console.log(data)
    this.service.update(data, this.id)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveUser(this.id);
          this.openDialog();
        },
        error => {
          console.log(error);
        });
  }

}
