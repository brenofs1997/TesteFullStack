import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(  private router: Router,private storageService: StorageService) { }
  
  ngOnInit(): void { 
  }
  signOut(){
    this.router. navigate(['/signin']);
    this.storageService.clear()
  }

}
