export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  rating: number;
  tags: string[];
  photoUri: string | null;
  familyFriendly: boolean;
  veganFriendly: boolean;
}

export class FilterModel {
  name: string;
  isVeganFriendly: boolean;
  isFamilyFriendly: boolean;
  tags: string[];
  constructor(name: string, isVeganFriendly: boolean, isFamilyFriendly: boolean, tags: string[]) {
    this.name = name;
    this.isVeganFriendly = isVeganFriendly;
    this.isFamilyFriendly = isFamilyFriendly;
    this.tags = tags;
  }
}

export class TagModel {
  name: string;
  isSelected: boolean;
  constructor(name: string, isSelected: boolean) {
    this.name = name;
    this.isSelected = isSelected;
  }
}
