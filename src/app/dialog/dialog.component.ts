import { Component, Inject, OnInit } from '@angular/core'; //need to include inject as well
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; //MUST IMPORT MAT_DIALOG_DATA as well to import valuse into our dialog box
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]

  //Create our Product Form:
  //NOTE: we have to IMPORT reactive form modules in our app.module.ts
  productForm !: FormGroup;

  beginningHeader: string = "Add Product Form"
  actionButton : string = "Save"

  //------------------------------------------------------------------------
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    //Initialize our form values:
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDate: ['', Validators.required],
      productComment: ['', Validators.required]
    })

    if(this.editData)
    {
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory)
      this.productForm.controls['productFreshness'].setValue(this.editData.productFreshness)
      this.productForm.controls['productPrice'].setValue(this.editData.productPrice)
      this.productForm.controls['productDate'].setValue(this.editData.productDate)
      this.productForm.controls['productComment'].setValue(this.editData.productComment)

      //Change the update button
      this.actionButton = "Update"

      //update header to say "Edit Product"
      this.beginningHeader = "Edit Product Form"
    }
  }

  addProduct(): void {
   if(!this.editData)
   {
      //Check that the product form is binding 
      console.log(this.productForm.value);

      if(this.productForm.valid)
      {
        //NOTE: THIS IS OBSERVABLE RETURN VALUE SO MUST USE SUBSCRIBE in ANGULAR 13
        // This is our observer type in our RXJS
        this.apiService.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added succesfully!")
            //Reset the prodcutForm when succesfully Product
            this.productForm.reset()

            //Next we import MatDialogReference of type DialogComponent
            //We then will close the form
            //NOTE: we need to get a Matdialogreference so we can manipulate the form
            //NOTE2: add a messsage in close parameter
            this.dialogRef.close('save');
          },

          error:() =>{
            alert("Error while adding the product")
          }
        })
      }
      else
      {
        alert("Please check that values in form are valid")
      }
    }
    else
    {
      if(this.productForm.valid)
      {
        //NOTE: THIS IS OBSERVABLE RETURN VALUE SO MUST USE SUBSCRIBE in ANGULAR 13
        // This is our observer type in our RXJS
        this.apiService.putProduct(this.productForm.value, this.editData.id).subscribe({
          next:(res)=>{
            alert("Product edited succesfully!")
            //Reset the prodcutForm when succesfully Product
            this.productForm.reset()

            //Next we import MatDialogReference of type DialogComponent
            //We then will close the form
            //NOTE: we need to get a Matdialogreference so we can manipulate the form
            //NOTE2: add a messsage in close parameter
            this.dialogRef.close('update');
          },

          error:() =>{
            alert("Error while editing the product")
          }
        })
      }
      else
      {
        alert("Please check that values in form are valid")
      }
    }
  }
}
