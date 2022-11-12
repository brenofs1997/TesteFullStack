import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from './storage.service';
import { JsonPipe } from '@angular/common';

const baseUrl = 'http://localhost:3334';

@Injectable({
  providedIn: 'root'
})
export class Service {

  
  
  authToken: any;

  constructor(private http: HttpClient,private storageService: StorageService) { 
    this.authToken =this.storageService.get() ;
     
  }

 
  searchCEP(cep: string) {

    return this.http.get(`https://viacep.com.br/ws/${cep.replace("-","")}/json/`);
  }

  public getAll(): Observable<User[]> {
  
    let authToken =   this.authToken;
    console.log("getA "+this.authToken)
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
     
      
    const requestOptions = { headers: headers };
    
    return this.http.get<User[]>(`${baseUrl}/users`, requestOptions)
  }

  get(id: string) {
    let authToken = this.authToken;
    
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
 
    const requestOptions = { headers: headers };
    return this.http.get(`${baseUrl}/users/${id}`,requestOptions);
  }

  create(data: User) {
    return this.http.post(`${baseUrl}/users`,data);
  }
  signin(data: User) {
    
    return this.http.post(`${baseUrl}/auth`,data);
  }

  update( data: User , id : string) {
    let authToken = this.authToken;
  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
 
    const requestOptions = { headers: headers };
 
    return this.http.put(`${baseUrl}/users/${id}`, data,requestOptions);
  }

  delete(id: string) {
    let authToken = this.authToken;
  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
 
    const requestOptions = { headers: headers };

    return this.http.delete(`${baseUrl}/users/${id}`,requestOptions);
  }

  public findByName(name: string): Observable<User> {
    let authToken = this.authToken;
    
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
      
 
    const requestOptions = { headers: headers };
      
    return this.http.get<User>((`${baseUrl}/finduser/${name}`),requestOptions);
  }

}
