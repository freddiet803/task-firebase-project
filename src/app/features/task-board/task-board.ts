import { Component, computed, inject } from '@angular/core';
import { TasksService } from '../../data/teams/tasks.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-task-board',
  styleUrl: './task-board.css',
  templateUrl: './task-board.html',
})
export class TaskBoard {

  
    private taskService = inject(TasksService);
    private router = inject(Router)
    tasks = toSignal(this.taskService.getTasks(), {initialValue: [] as Task[]})

    openCount= computed(()=> this.tasks().filter(t=>!t.done).length);
    totalCount = computed(()=> this.tasks().length);

    async remove(id: string){
      
      if(!confirm('Delete this task?')) return;
      await this.taskService.deleteTask(id);
    }

    async updateTask(id:string, changes: Partial<Task> ){
      if(!confirm("Mark as done?")) return;
      await this.taskService.updateTask(id,changes);
      this.router.navigate(['/tasks']);
    }
}
