import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PanierComponent } from './panier/panier.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    PanierComponent,
    HomeComponent,
    LoginComponent,
    ModalComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
