import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import ITask from 'src/app/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = []

  constructor(private request: RequestsService) { }

  ngOnInit(): void {
    this.request.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggleReminder(task: ITask) {
    task.reminder = !task.reminder;
    this.request.changeReminder(task).subscribe();;
  }

  deleteTask(task: ITask){
    this.request.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter((item) => item.id !== task.id ));
  }

  createTask(task: ITask) {
    this.request.createTask(task).subscribe((newTask) => this.tasks.push(newTask));
  }
}
