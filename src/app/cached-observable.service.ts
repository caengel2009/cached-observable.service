import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/catch';

@Injectable()
export class CachedObservableService {	
  private cacheSubject: Subject<any> = new Subject();
  private cacherObs;
  private obsFunction;
  private isInFlight = false;
  private isEmpty = true;

  constructor( fn: Function ) {
	  this.cacherObs = this.cacheSubject.asObservable().publishReplay(1).refCount();
	  this.obsFunction = fn;
  }

  get( force?: boolean ): Observable<any> {

    let test = this.cacheSubject;

  	if ( force || !this.isInFlight && this.isEmpty )
  		this.obsFunction()
        .subscribe( ( value ) => {
  			  this.cacheSubject.next( value )
  			  this.isInFlight = false;
  			  this.isEmpty = false;
  		  },
        ( error ) => {
          this.cacheSubject.error(error);
        });
        

  	this.isInFlight = true;

  	if ( force ) {
  		return this.cacheSubject.asObservable();
  	}
  	return this.cacherObs;
  }
}
