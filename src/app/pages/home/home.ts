import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [  JsonPipe],
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
changeHandler(event:Event) {
  const newValue = event.target as HTMLInputElement;
  const task = newValue.value;
  this.addTask(task);
  
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
}


