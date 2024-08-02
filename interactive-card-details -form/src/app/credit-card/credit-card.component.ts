import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


interface CreditCard{
  name: string;
  cardNumber: string;
  expDateM: string;
  expDateY: string;
  cvv: string;
}

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {



  // Variables
  formAddCreditCard!:FormGroup;
  public complete: Boolean= false;
  creditCard: CreditCard={
    name: 'JANE APPLESEED',
    cardNumber: '0000 0000 0000 0000', 
    expDateM: '00',
    expDateY: '00',
    cvv: '000'
  }
  


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // start the validation
    this.formAddCreditCard= this.initForm();
  }

  // validate the form
  initForm(): FormGroup{
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      expM: ['', [Validators.required]],
      expY: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
    })
  };



  addCreditCard(){
    if(this.formAddCreditCard.valid){
      this.complete= true;
    }
    this.formAddCreditCard.markAllAsTouched();
  }


  // clean form
  finish(){
    this.formAddCreditCard.reset();
    this.complete= false;
  }

  changeName(e: any){
    if(e.length){
      this.creditCard.name= e.toUpperCase();   
    }else{
      this.creditCard.name='JANE APPLESEED'
    }
  }

  changeCardNumber(e: any){
    if(e.length){
      this.creditCard.cardNumber= e.toUpperCase();
    }else{
      this.creditCard.cardNumber='0000 0000 0000 0000'
    }
  }

  changeExpDateM(e: any){
    if(e.length){
        this.creditCard.expDateM= e.toUpperCase();    
    }else{
      this.creditCard.expDateM='00'
    }
  }

  changeExpDateY(e: any){
    if(e.length){
      this.creditCard.expDateY= e.toUpperCase();   
    }else{
      this.creditCard.expDateY='00'
    }
  }

  changeCvv(e: any){
    if(e.length){
      this.creditCard.cvv= e;   
    }else{
      this.creditCard.cvv='000'
    }
  }


  // enable only numbers in inputs
  onlyNumbers(event: any): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }


  // enable only text in inputs
  onlyText(event: any): boolean{
    const charCode= (event.which)?event.which: event.keyCode;
    if(((charCode >= 65  && charCode < 90) || (event.keyCode > 96 && event.keyCode < 123) || charCode == 32)){
      return true;
    }
    return false;
  }



}
