import { ANALYZE_FOR_ENTRY_COMPONENTS, Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MetaData } from './model/meta-data';
import { Observable, throwError } from  'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    baseUrl:string = "http://127.0.0.1:3000/";
    // baseUrl:string = "https://e-kalymada.herokuapp.com/";

    constructor(private httpClient: HttpClient) {

    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
    };

    public getAllProduct(): Observable<MetaData>{
        return this.httpClient
          .get<MetaData>(this.baseUrl+"liste-produit")
          .pipe(
            retry(2),
            catchError(this.handleError)
        )
    }

    public inscription(nom: string,prenom: string,identifiant: string,motdepasse:string,email:string,contact:string,adresse:string): Observable<MetaData>{
        return this.httpClient
            .get<MetaData>(this.baseUrl+"inscription?nom="+nom+"&prenom="+prenom+"&identifiant="+identifiant+"&motdepasse="+motdepasse+"&email="+email+"&contact="+contact+"&adresse="+adresse)
            .pipe(
              retry(2),
              catchError(this.handleError)
        );
    }

    public commander(commande_json : any): Observable<MetaData>{
      return this.httpClient
            .get<MetaData>(this.baseUrl+'commander?json_commande='+JSON.stringify(commande_json)+'&user='+localStorage.getItem('id_session'))
            .pipe(
              retry(2),
              catchError(this.handleError)
        );
    }

    public login(identifiant : string, motdepasse:string): Observable<MetaData>{
      return this.httpClient
            .get<MetaData>(this.baseUrl+"login?identifiant="+identifiant+"&motdepasse="+motdepasse)
            .pipe(
              retry(2),
              catchError(this.handleError)
        );
    }

    public search(search : string): Observable<MetaData>{
      return this.httpClient
            .get<MetaData>(this.baseUrl+"search?key="+search)
            .pipe(
              retry(2),
              catchError(this.handleError)
        );
    }
}
