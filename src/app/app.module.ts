import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/reducers/user.reducer';
import { cardsReducer } from './core/reducers/cards.reducer';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { authWindowReducer } from './core/reducers/auth-window.reducer';
import { addNewCardWindowReducer } from './core/reducers/add-new-card-window.reducer';
import { editCardWindowReducer } from './core/reducers/edit-card-window.reducer';
import { viewCardWindowReducer } from './core/reducers/view-card-window.reducer';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    StoreModule.forRoot({
      userState: userReducer,
      cardsState: cardsReducer,
      authWindowState: authWindowReducer,
      addNewCardWindowState: addNewCardWindowReducer,
      editCardWindowState: editCardWindowReducer,
      viewCardWindowState: viewCardWindowReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
