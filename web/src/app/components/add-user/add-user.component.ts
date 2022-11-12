import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/service';
import { User } from 'src/app/model/User';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    user = {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        cep: '',
        state: '',
    };
    submitted = false;

    constructor(private userService: Service) { }

    ngOnInit() {
    }
    searchCEP(cep : string){
        this.userService.searchCEP(cep)
          .subscribe(
            response => {
              const responseData = JSON.parse(JSON.stringify(response))
              console.log(response)
              //console.log(responseData.logradouro)
              
               this.user.address= responseData.logradouro,
               this.user.city= responseData.localidade,
               this.user.state= responseData.uf
            
                //this.currentUser.address = response
                
            },
            error =>{
              console.error(error);
              
            }
          );
    
      }

    saveUser() {
        const data = {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            phone: this.user.phone,
            address: this.user.address,
            city: this.user.city,
            cep: this.user.cep,
            state: this.user.state,
        };

        this.userService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    console.log(this.user);
                    this.submitted = true;
                },
                error => {
                    console.log(error);
                });
    }

    newUser() {
        this.submitted = false;
        this.user = {
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            city: '',
            cep: '',
            state: '',
        };
    }
}