import { Component, OnInit } from '@angular/core';
import { FilterModel, Restaurant } from 'app/restaurants/restaurants.models';
import { IRestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[]; 

  constructor(private restaurantsService: IRestaurantsService) {
    this.restaurants = [];    
  }

  ngOnInit(): void {
    this.restaurantsService.getRestaurantsAsync().subscribe(() => {      
      this.restaurants = this.restaurantsService.getRestaurants();      
    });   
  }

  updateFilter(filter: FilterModel): void{
    this.restaurants = this.restaurantsService.getFilteredRestaurants(filter.name, filter.isVeganFriendly, filter.isFamilyFriendly, filter.tags);
  }    
}
