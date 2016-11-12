import { Component } from '@angular/core';
import { Location }  from '@angular/common';

import {Order} from "./order";

@Component({
    moduleId: module.id,
    selector: 'order',
    template: `
<div class="category-container">
  <h2>Order information</h2>
  
    <form >
      Name:<br>
      <input [(ngModel)]="order.vardas"> <br>
      Surname:<br>
      <input [(ngModel)]="order.kreditines_numeris"> <br>
      Credit card number:<br>
      <input [(ngModel)]="order.pavarde"> <br>
      Credit card expiration date:<br>
      <input [(ngModel)]="order.kreditines_data"> <br>
      Credit card cvv:<br>
      <input [(ngModel)]="order.krediditines_cvv"> <br>
      Adress:<br>
      <input [(ngModel)]="order.adresas"> <br>
      <br><br>
      <button (click)="goBack()">Back</button>  <button>Finish order</button> 
    </form>

    
</div>`

})

export class OrderComponent {

    constructor(private location: Location){}

    order: Order = {
        _id: 2,
        vardas: "",
        pavarde: "",
        kreditines_numeris: null,
        kreditines_data: "",
        krediditines_cvv: "",
        adresas: "",
        vartotojo_id: 45
    };

    goBack(): void {
        this.location.back();
    }


}
