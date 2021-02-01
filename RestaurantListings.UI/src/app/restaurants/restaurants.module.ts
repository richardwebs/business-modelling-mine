import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantsRoutingModule } from 'app/restaurants/restaurants-routing.module';

import { RestaurantsComponent } from 'app/restaurants/restaurants.component';
import { RestaurantListComponent } from 'app/restaurants/restaurant-list/restaurant-list.component';
import { RestaurantItemComponent } from 'app/restaurants/restaurant-item/restaurant-item.component';
import { RestaurantFiltersComponent } from 'app/restaurants/restaurant-filters/restaurant-filters.component';
import { RestaurantRatingComponent } from './restaurant-rating/restaurant-rating.component';
import { IRestaurantsService, RestaurantsService } from './restaurants.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RestaurantsRoutingModule, FormsModule],
  declarations: [
    RestaurantsComponent,
    RestaurantListComponent,
    RestaurantItemComponent,
    RestaurantFiltersComponent,
    RestaurantRatingComponent,
  ],
  providers: [
    { provide: IRestaurantsService, useClass: RestaurantsService }
  ]
})
export class RestaurantsModule {}
