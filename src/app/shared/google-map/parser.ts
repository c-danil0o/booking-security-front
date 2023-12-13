import {Address} from "../../model/address-model";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}


export class GoogleAddressParser {
  private address: Address = {
    number: "",
    street: "",
    city: "",
    country: ""
  };

  constructor(private address_components: Array<AddressComponent>) {
    this.parseAddress();
  }

  private parseAddress() {
    if (!Array.isArray(this.address_components)) {
      throw Error('Address Components is not an array');
    }

    if (!this.address_components.length) {
      throw Error('Address Components is empty');
    }

    for (let i = 0; i < this.address_components.length; i++) {
      const component: AddressComponent = this.address_components[i];

      if (this.isStreetNumber(component)) {
        this.address.number = component.long_name;
      }

      if (this.isStreetName(component)) {
        this.address.street = component.long_name;
      }

      if (this.isCity(component)) {
        this.address.city = component.long_name;
      }

      if (this.isCountry(component)) {
        this.address.country = component.long_name;
      }
    }
  }

  private isStreetNumber(component: AddressComponent): boolean {
    return component.types.includes('street_number');
  }

  private isStreetName(component: AddressComponent): boolean {
    return component.types.includes('route');
  }

  private isCity(component: AddressComponent): boolean {
    return component.types.includes('locality');
  }


  private isCountry(component: AddressComponent): boolean {
    return component.types.includes('country');
  }

  result(): Address {
    return this.address;
  }
}
