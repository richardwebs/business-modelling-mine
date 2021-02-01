import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from 'app/restaurants/restaurants.models';

export abstract class IRestaurantsService {  
	abstract getRestaurants(): Restaurant[];	
	abstract getRestaurantsAsync(): Observable<void>;	
  abstract getDistinctTags(): string[];
  abstract getFilteredRestaurants(name: string, isVeganFriendly: boolean, isFamilyFriendly: boolean, tags: string[]): Restaurant[];
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService implements IRestaurantsService {
  private restaurants: Restaurant[];
  private onDataChanged: EventEmitter<void>;  
  constructor(private http: HttpClient) {    
    this.restaurants = [];
    this.onDataChanged = new EventEmitter<void>(false);
		this.initializeRestaurantsAsync();
  }  

  getRestaurants(): Restaurant[] {
    return new Array<Restaurant>().concat(this.restaurants); // return a copy of the data to preserve immutability
  }  

  getRestaurantsAsync(): Observable<void> {
    return new Observable<void>((x) => {
			this.onDataChanged.subscribe(() => x.next());
		});
  }

  getDistinctTags(): string[] {
		let tags = new Array<string>();
		this.restaurants.forEach((x) => {
			tags = tags.concat(x.tags);
		});
		return [...new Set(tags)];
  }
  
  getFilteredRestaurants(name: string, isVeganFriendly: boolean, isFamilyFriendly: boolean, tags: string[]): Restaurant[] {
    let restaurants = this.getRestaurants();
    if (name.length > 0) restaurants = restaurants.filter(x => x.name.search(new RegExp(name, "i")) > -1);
    if (isVeganFriendly) restaurants = restaurants.filter(x => x.veganFriendly);
    if (isFamilyFriendly) restaurants = restaurants.filter(x => x.familyFriendly);
    if (tags.length === 0) return restaurants;
    return restaurants.filter((x) => x.tags.filter((y) => tags.includes(y)).length > 0);
  } 

  private initializeRestaurantsAsync(): void {    
    this.http.get<Restaurant[]>('/api/restaurants').subscribe((x) => {      
      this.setRestaurants(x);           
    });
  }

  private setRestaurants(restaurants: Restaurant[]): void {
    if (this.restaurants === restaurants) return;
    this.restaurants = restaurants;
    this.onDataChanged.emit();    
  }
}
