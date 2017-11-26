import { Component } from '@angular/core';
import { CachedObservableService } from './cached-observable.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	public outputs = [];

	constructor() {

		let cachedObservable = new CachedObservableService( () => {

			return new Observable( ( observer ) => {
				setTimeout( () => {
					observer.next(new Date());
				},200);
			})
		});

		cachedObservable.get().subscribe( ( value ) => {
			this.outputs.push( "1st: " + value );
		},
		( error ) => {
			this.outputs.push( "1st: " + error );
		})

		cachedObservable.get().subscribe( ( value ) => {
			this.outputs.push( "2nd: " + value );
		},
		( error ) => {
			this.outputs.push( "2nd: " + error );
		});

		setTimeout( () => {
			cachedObservable.get( true ).subscribe( ( value ) => {
				this.outputs.push( "3rd: " + value );
			},
			( error ) => {
				this.outputs.push( "3rd " + error );
			});
		}, 2000 );
	}
}
