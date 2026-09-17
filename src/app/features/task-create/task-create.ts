import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../data/teams/tasks.service';
import { Router } from '@angular/router';
import { NewTask } from '../../models/task.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-create',
  styleUrl: './task-create.css',
  templateUrl: './task-create.html',
})
export class TaskCreate {
  private ourFormBuilder = inject(FormBuilder);
  private taskService = inject(TasksService);
  private router = inject(Router);

  ourTaskForm = this.ourFormBuilder.nonNullable.group({
    title: ['', [Validators.required,Validators.minLength(2)]],
    details: [''],
    color: ['yellow'],
  })

  async onSubmit(){
    
    if(this.ourTaskForm.invalid) return;

    const newTask : NewTask = {
      ...this.ourTaskForm.getRawValue(),
      done: false,
      createdAt: Date.now(),
    };
    await this.taskService.addTask(newTask);
    this.ourTaskForm.reset({color: 'yellow'});
    this.router.navigate(['/tasks'])
  }

}
