import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api-service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produit:any;
  utilisateur = { nom :'',prenom:'',identifiant:"",motdepasse:"",email:"",contact:"",adresse:''};
  utilisateurStatus: any;
  user_session = "";
  logged = false;
  message = "";
  messageResult = "";
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
  }

  inscription(){
    this.IsWait = true;
    this.apiService.inscription(this.utilisateur.nom,this.utilisateur.prenom,this.utilisateur.identifiant,this.utilisateur.motdepasse,this.utilisateur.email,this.utilisateur.contact,this.utilisateur.adresse).subscribe(response =>{
      this.utilisateurStatus = response.meta;
      this.user_session = response.data;
      if(this.utilisateurStatus.status ==='OK'){
        localStorage.setItem('id_session',this.user_session);
        console.log("test"+localStorage.getItem('id_session'));
        this.logged = true;
      }else{
        this.message = "Erreur Inscrption";
      }
      setTimeout(()=>{
        this.IsWait = false;
      },3000);
    });
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

  seConnecter(){
    this.IsWait = true;
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },1000);
    // this.router.navigateByUrl('login');
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

  title = 'e-kaly';

}
