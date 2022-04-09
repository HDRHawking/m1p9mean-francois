import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  logged = false;
  IsWait = false;
  data_panier = [];
  constructor(private apiService: ApiService,private router: Router) { 
    if(localStorage.getItem('id_session')!=null){
      this.logged = true;
    }
  }

  ngOnInit(): void {
    this.list_panier();
  }

  panier(){
    this.IsWait = true;
    this.router.navigateByUrl('panier');
  }

  list_panier(){
    this.data_panier = JSON.parse(localStorage.getItem("panier")+"");
  }

  commander(){
    this.IsWait = true;
    this.data_panier = JSON.parse(localStorage.getItem("panier")+"");
    this.apiService.commander(this.data_panier).subscribe(response =>{});
    setTimeout(()=>{
      localStorage.removeItem("panier");
      this.list_panier();
      this.IsWait = false;
    },1000);
  }
  seConnecter(){
    this.IsWait = true;
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },1000);
  }

  deconnexion(){
    this.IsWait = true;
    localStorage.removeItem('id_session');
    localStorage.removeItem('panier');
    this.logged = false;
    this.router.navigateByUrl('home');
    setTimeout(()=>{
      this.IsWait = false;
    },1000);
  }

  drop(event: CdkDragDrop<{libelle: string}[]>) {
    moveItemInArray(this.data_panier, event.previousIndex, event.currentIndex);
  }
}
