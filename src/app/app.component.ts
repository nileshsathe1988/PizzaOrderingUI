import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pizzaorderingui';
  sauses = [];
  crustSize = [];
  toppings = [];
  selectedCrust;
  selectedSauses;
  selectedToppings;
  totalAmount = 0;
  pizzaForm: FormGroup;
  submitted = false;
  allOrders = [];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.createForm();
    this.fillDropdown();
    this.getAllOrders();
  }  
  
  createForm() {
    this.pizzaForm = this.formBuilder.group({
      crustSize: ['', Validators.required],
      toppings: ['', Validators.required],
      sauses: ['', Validators.required]
    });
  }

  fillDropdown() {
    this.apiService.GetSauses().subscribe((data: any)=>{
      this.sauses = data;
    },
    (err)=>{
      alert('Failed to retrive data.');
    });

    this.apiService.GetPizzaCustSize().subscribe((data: any)=>{
      this.crustSize = data;
    },
    (err)=>{
      alert('Failed to retrive data.');
    });

    this.apiService.GetToppings().subscribe((data: any)=>{
      this.toppings = data;
    },
    (err)=>{
      alert('Failed to retrive data.');
    });
  }

  getAllOrders() {
    this.apiService.GetAllOrders().subscribe((data: any)=>{
      this.allOrders = data;
    },
    (err)=>{
      alert('Failed to retrive data.');
    });
  }

  onCrustChange(value) {
    this.crustSize.forEach((item, index)=>{
      if(value == item.crustSizeId) this.selectedCrust = this.crustSize[index];
    });
    this.calSum();
  }

  onSausesChange(value) {
    this.sauses.forEach((item, index)=>{
      if(value == item.sausesId) this.selectedSauses = this.sauses[index];
    });
    this.calSum();
  }

  onToppingsChange(value) {
    this.toppings.forEach((item, index)=>{
      if(value == item.toppingId) this.selectedToppings = this.toppings[index];
    });
    this.calSum();
  }

  calSum() {
    var sausePrice = this.selectedSauses? this.selectedSauses.price: 0;
    var crustPrice = this.selectedCrust? this.selectedCrust.price: 0;
    var toppingPrice = this.selectedToppings? this.selectedToppings.price: 0;

    this.totalAmount = sausePrice + crustPrice + toppingPrice;
  }

  submitState() {
    this.submitted = true;

    if (this.pizzaForm.invalid) {
      return;
    }
  
    var customPizza = {
      "custPizzaId": 1,
      "isExtraCheesNeeded": false,
      "custSize": this.selectedCrust,
      "sauses": this.selectedSauses,
      "topping": this.selectedToppings
    };

    var order = {
      "orderId": this.allOrders.length == 0? 1: (this.allOrders.length + 1),
      "cutomePizzas": [customPizza],
      "totalAmount": this.totalAmount
    };

    this.apiService.saveOrder(order).subscribe(
      (data: any)=>{
        this.getAllOrders();
        var msg = 'Order Saved successfully. Your order id is '+ data.orderId;
        alert(msg);
      },
      (err)=>{
        alert('Failed to save order. Please try again.');
      });
  }

   // convenience getter for easy access to form fields
   get f() { return this.pizzaForm.controls; }
}
