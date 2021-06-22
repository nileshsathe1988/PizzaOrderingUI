import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseUrl = "https://localhost:44373/api";
  
constructor(private httpClient: HttpClient) { 
}

public saveOrder(order) {
  return this.httpClient.post<any>(`${this.baseUrl}/pizza/SaveOrder`, order);
} 

public GetSauses(){
  return this.httpClient.get(`${this.baseUrl}/pizza/GetSauses`);
}

public GetPizzaCustSize(){
  return this.httpClient.get(`${this.baseUrl}/pizza/GetPizzaCustSize`);
}

public GetToppings(){
  return this.httpClient.get(`${this.baseUrl}/pizza/GetToppings`);
}

public GetAllOrders() {
  return this.httpClient.get(`${this.baseUrl}/pizza/GetAllOrders`);
}
}
