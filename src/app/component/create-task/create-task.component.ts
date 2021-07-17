import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import ITask from 'src/app/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  showForm: boolean = false;
  subscription!: Subscription;
  text: string = "";
  day: string = "";
  reminder: boolean = false;

  @Output() onCreateTask: EventEmitter<ITask> = new EventEmitter();

  constructor(private ui: UiService) {
    this.subscription = this.ui.onToggle().subscribe((value) => this.showForm = value);
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const TASK = { text: this.text, day: this.day, reminder: this.reminder} as ITask;

    this.onCreateTask.emit(TASK);

    this.text= "";
    this.day= "";
    this.reminder = false;
  }
}
