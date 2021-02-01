import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterModel, TagModel } from '../restaurants.models';
import { IRestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.scss'],
})
export class RestaurantFiltersComponent implements OnInit {  
  name: string;
  tags: TagModel[];
  isVeganFriendly: boolean;
  isFamilyFriendly: boolean; 
  @Output() onFilterUpdated: EventEmitter<FilterModel>;  

  constructor(private service: IRestaurantsService) {    
    this.tags = [];
    this.name = "";
    this.isFamilyFriendly = false;
    this.isVeganFriendly = false;
    this.onFilterUpdated = new EventEmitter<FilterModel>(false);
  }  

  ngOnInit(): void {
    this.service.getRestaurantsAsync().subscribe(() => {
      this.tags = this.service.getDistinctTags().map(x => new TagModel(x, false));
    });    
  }

  onInputChanged(): void {
    const tags = this.tags.filter((x) => x.isSelected).map((x) => x.name); // get selected tags only
		this.onFilterUpdated.emit(new FilterModel(this.name, this.isVeganFriendly, this.isFamilyFriendly, tags));  
  }
}
