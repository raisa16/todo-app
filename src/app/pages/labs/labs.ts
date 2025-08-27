import { Component, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-labs',
  imports: [CommonModule],
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

person = {
  name: 'Mia',
  age: 14,
  avatar: 'https://w3schools.com/howto/img_avatar.png'
}
clickHandler(){
  alert('hola');
}
changeHandler(event: Event) {
  const input = event.target as HTMLInputElement;
  const newValue = input.value;
  this.name.set(newValue);
}
keydownHandler(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}
}
