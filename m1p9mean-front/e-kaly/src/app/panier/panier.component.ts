import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  logged = false;
  IsWait = false;
  data_panier = [];
  constructor(private apiService: ApiService,private router: Router,private dialog: MatDialog) { 
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

  onKeypressEvent(event : any){
    console.log(event.key);
    if(event.key==="Enter"){
      this.IsWait = true;
      var statusResult : any;
      this.apiService.search(event.target.value).subscribe(response => {
        statusResult = response.meta;
        if(statusResult.status==="OK"){
          // this.produit = response.data; 
        }else {
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.position = {
            top: '0',
            left: '0',
            // width : '120',
            // heigth: '30'
        };
          this.dialog.open(ModalComponent, {
            width: '400px',
            data:  statusResult.message
          });
        }
      });
      setTimeout(()=>{
        this.IsWait = false;
      },1000);
    }
  }
}
