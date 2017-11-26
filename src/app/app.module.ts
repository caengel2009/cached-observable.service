import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CachedObservableService } from './cached-observable.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ 
    CachedObservableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
