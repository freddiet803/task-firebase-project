import { Component, computed, effect, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { TasksService } from '../../data/teams/tasks.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-edit',
  styleUrl: './task-edit.css',
  templateUrl: './task-edit.html',
})
export class TaskEdit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TasksService);
  private ourFormBuilder = inject(FormBuilder);
  private router = inject(Router);

  private params = toSignal(this.route.paramMap);
  taskId = computed(()=> this.params()?.get('id') ?? '');

  

  private task$ = toObservable(this.taskId).pipe(
    filter((id): id is string => id !== ''),
    switchMap(id=>this.taskService.getTask(id)));

  task = toSignal(this.task$);

  ourTaskForm = this.ourFormBuilder.nonNullable.group({
    title: ['',[Validators.required,Validators.minLength(2)]
    ],details: [''],
    color: 'yellow',
  })

  async onSubmit(){
    if(this.ourTaskForm.invalid) return;
    await this.taskService.updateTask(this.taskId(),this.ourTaskForm.getRawValue());
    this.router.navigate(['/tasks'])
  }

  constructor(){
    effect(()=>{
      const t = this.task();
      if(!t) return;
      this.ourTaskForm.patchValue({
        title: t.title,
        details: t.details,
        color: t.color,
      })    })
  }
}
