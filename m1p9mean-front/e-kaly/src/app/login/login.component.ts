import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  produit:any;
  utilisateur = { identifiant:"",motdepasse:""};
  utilisateurStatus: any;
  user_session = "";
  logged = false;
  message = "";
  IsWait = false;
  data: any ;
  constructor(private apiService: ApiService,private router: Router,private dialog: MatDialog) {
    this.produit = [];
    if(localStorage.getItem('id_session')!=null){
      this.logged = true;
    }
  }

  ngOnInit() {
    this.apiService.getAllProduct().subscribe(response => {
      this.produit = response.data; 
    });
    if(localStorage.getItem('id_session')!=null){
      this.logged = true;
    }
    console.log(this.logged)
  }

  inscription(){
    
  }

  panier(){
    this.IsWait = true;
    setTimeout(()=>{
      this.router.navigateByUrl('panier');
    },1000);
  }
  add_panier(nom_produit:string,code_produit:string ,prix:string){
    this.IsWait = true;
    var produit = {
      'libelle': nom_produit,
      'code_produit': code_produit,
      'prix':prix,
      'qte': 1
    }
    this.data  = JSON.parse(localStorage.getItem("panier")+"");
    if (this.data === null) {
      this.data = [];
    }
    if(this.data.indexOf(produit)===-1){
      this.data.push(produit);
    }
    localStorage.setItem('panier',JSON.stringify(this.data));
    this.IsWait = false;
  }

  login(){
    this.IsWait = true;
    this.apiService.login(this.utilisateur.identifiant,this.utilisateur.motdepasse).subscribe(response => {
      this.utilisateurStatus = response.meta;
      this.user_session = response.data;
      if(this.utilisateurStatus.status ==='OK'){
        localStorage.setItem('id_session',this.user_session);
        // console.log("test"+localStorage.getItem('id_session'));
        this.logged = true;
        // this.router.navigateByUrl('home');
      }else{
        this.message = "Identifiant ou mot de passe incorrect";
      }
      setTimeout(()=>{
        this.IsWait = false;
      },3000);
    });
    setTimeout(()=>{
      this.IsWait = false;
    },1000);
  }

  deconnexion(){
    this.IsWait = true;
    localStorage.removeItem('id_session');
    localStorage.removeItem('panier');
    this.logged = false;
    // this.router.navigateByUrl('home');
    setTimeout(()=>{
      this.IsWait = false;
    },1000);
  }

  onKeypressEvent(event : any){
    console.log(event.key);
    if(event.key==="Enter"){
      this.IsWait = true;
      var statusResult : any;
      this.apiService.search(event.target.value).subscribe(response => {
        statusResult = response.meta;
        if(statusResult.status==="OK"){
          this.produit = response.data; 
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
