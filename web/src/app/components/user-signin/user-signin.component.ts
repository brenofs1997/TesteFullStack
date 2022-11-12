import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {
 
  signinForm!: FormGroup;

  authToken: any;
  currentUser = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    cep: '',
    state: '',
};
  currentIndex = -1;
  name = '';

  constructor(
    private router: Router,
    private service: Service,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm() {
     this.signinForm = new FormGroup({
      email: new FormControl,
      password:new FormControl,
    }) 
    
  }

  get formControls() { return this.signinForm.controls; }

  createUser(){
    this.router. navigate(['/add']); 
  }

  signinUser() {
    const data = {
      name: this.currentUser.name,
      email: this.formControls['email'].value,
      password: this.formControls['password'].value,
      phone: this.currentUser.phone,
      address: this.currentUser.address,
      city: this.currentUser.city,
      cep: this.currentUser.cep,
      state: this.currentUser.state,
  };
   
      const aux =this.service.signin(data)
      .subscribe(
        response => {
          const responseToken = JSON.parse(JSON.stringify(response)).token
          console.log("resp "+responseToken);
          this.storageService.setData('token',responseToken );
          this.router. navigate(['/users']); 
        },
        error => {
          console.log(error);
        });
  }



}
