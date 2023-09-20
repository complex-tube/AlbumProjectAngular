import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { authTypeReducer } from './core/reducers/auth-type.reducer';
import { userReducer } from './core/reducers/user.reducer';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { cardsReducer } from './core/reducers/cards.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MainModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({
      authState: authTypeReducer,
      userState: userReducer,
      cardsState: cardsReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
