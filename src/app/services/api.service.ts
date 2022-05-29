import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //will be using HTTP calls 
  constructor(private http:HttpClient) { }

  //Need to do post call to save our productS:
  postProduct(productData: any) {
    return this.http.post<any>("http://localhost:3000/productList", productData)
  }
  
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList")
  }

  putProduct(productData: any, productID: any) {
    return this.http.put<any>("http://localhost:3000/productList/"+productID, productData)
  }

  deleteProduct(productID: any)
  {
    return this.http.delete<any>("http://localhost:3000/productList/"+productID)
  }
}
