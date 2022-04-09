import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private apiService: ApiService,private router: Router) {
    
  }

  ngOnInit() {
    this.router.navigateByUrl('home');
  }
    
  title = 'e-kaly';
}
