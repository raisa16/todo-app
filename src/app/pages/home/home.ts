import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [  JsonPipe, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

tasks = signal<Task[]>( [
  {
    id: Date.now(),
    title: 'Install Angular CLI',
    completed: false
  },
  {
    id: Date.now(),
    title: 'Crear proyecto',
    completed: false
  },
  {
    id: Date.now(),
    title: 'Crear componentes',
    completed: false
  }  
]);

newTaskCtrl = new FormControl('', {
  nonNullable: true,
  validators: [
    Validators.required,
  ]
});

filter = signal('all');

taskByFilter = computed(() => {
  const filter = this.filter();
  const tasks = this.tasks();
  if(filter === 'pending'){
    return tasks.filter( task => !task.completed)
  }
  if(filter === 'completed'){
    return tasks.filter(task => task.completed)
  }
  return tasks;
});
changeHandler() {
  if(this.newTaskCtrl.valid){
    const value = this.newTaskCtrl.value.trim();
    if(value !== ''){
      this.addTask(value);
      this.newTaskCtrl.reset();
    }
  }
  
}
addTask(task: string){
  const newTask = {
    id: Date.now(),
    title: task,
    completed: false
  }
  this.tasks.update((tasks) => [...tasks, newTask])
}
deleteTask(index: number) {
  this.tasks.update(tasks => tasks.filter((task,position) => position !== index))
}
updateTask(index: number) {
  this.tasks.update(tasks => {
    return tasks.map((task,position) => {
    if(position === index){
      return {
        ...task,
        completed: !task.completed
      }
    }
    return task;
  })
})
}
updateTaskEditMode(index: number) {
  this.tasks.update(tasks => {
    return tasks.map((task,position) => {
    if(position === index && task.completed === false){
      return {
        ...task,
        editing: !task.editing
      }
    }
    return {
      ...task,
      editing: false
    }
  })
})
}
updateTaskText(index:number,event: Event) {
  const input = event.target as HTMLInputElement
  const text = input.value.trim();
  if(text !== '' ){
    this.tasks.update(tasks => {
      return tasks.map((task,position) => {
        if(position === index && task.completed === false){
          return {
      ...task,
      title: text,
      editing: false
    }
}
return task
})
    })
  }
}
changeFilter(newFilter: string) {
  this.filter.set(newFilter);
}
}
