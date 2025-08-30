import { Component, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
title = "List of tasks";
tasks = signal( [
  'Install Angular CLI',
  'Crear proyecto',
  'Crear componentes'
]);
name = signal('Mia');
age = 14;
disabled = true;
img = "https://w3schools.com/howto/img_avatar.png";

person = signal({
  name: 'Mia',
  age: 14,
  avatar: 'https://w3schools.com/howto/img_avatar.png'
})

colorCtrl =new FormControl();
widthCtrl = new FormControl(50,{ nonNullable:true});
nameCtrl = new FormControl('Mia',{
   nonNullable:true,
  validators: [
    Validators.required,
    Validators.minLength(3)
  ]});
constructor() {
  this.colorCtrl.valueChanges.subscribe( color => {
    console.log({ color });
})
}
clickHandler(){
  alert('hola');
}
changeHandler(event: Event) {
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.name.set(newValue);
}
changeAgeHandler(event: Event) {
  const input = event.target as HTMLInputElement;
  const newValue = Number(input.value);
  this.person.update( person => ({
    ...person,
    age: newValue
  }))
}

changeNameHandler(event: Event) {
const input = event.target as HTMLInputElement;
const newValue = input.value;
this.person.update( person => ({
  ...person,
  name: newValue
}))
}

keydownHandler(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}
}
