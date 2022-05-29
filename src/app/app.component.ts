import { Component, OnInit, ViewChild } from '@angular/core'; //NOTE: have to import Viewchild as well
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //Declaer our variables
  displayedColumns: string[] = ['productName', 'productCategory', 
    'productFreshness', 'productPrice', 'productDate', 'productComment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'AngularCRUDPracticeMaterialUI';

  //Whats happening is that we call our dialog component in order to open up an alert box
  //First we will create a constructor and inject our matDialog here:
  constructor(private dialog : MatDialog, private apiService: ApiService)
  {
    //Constructor is using dependency injection through the variable dialog of type MatDialog SERVICE
    //It is known as injection because this App Component service is dependent on the MatDialog SERVICE

    //We can use it to then open whatever content is inside dialog.component.html as a "dialog box" using MaterialUI
    //this is shown in our openDialog() function
  }
  
  ngOnInit(): void {
      this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save')
      {
        this.getAllProducts()
      }
    })
  }

  //Have to call our products now
  getAllProducts() {
    this.apiService.getProduct()
      .subscribe({
        next:(res)=>{
          //Check console to see the data returned
          console.log(res)

          //Populate our data values from our HTTP call into dataSource
          this.dataSource = new MatTableDataSource(res);

          //Assign our paginatioon and sort from our ViewChild elements that we declared
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error:(err)=> {
          alert("Error while fetching Product List")
        }
      })
  }

  editProduct(row: any) {
    console.log("Clicking Edit Product")
    console.log(row)
    this.dialog.open(DialogComponent, {
      width: '30%',
      //We need to pass the data value 
      data:row 
    }).afterClosed().subscribe(value => {
      if(value == 'update')
      {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: any) {
    this.apiService.deleteProduct(id)
      .subscribe({
        next:(res)=>{
          console.log(res)
          alert("Succesfully deleted the product!")
          this.getAllProducts()
        },
        error:(err) =>{
          alert("Something went wrong with deletion of the product!")
        }
      })
  }

  //Code from MaterialUI for filtering:
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
