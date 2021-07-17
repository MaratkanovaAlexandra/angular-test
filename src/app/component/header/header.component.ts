import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title:string = "Task Tracker";
  showForm: boolean = false;
  subscription!: Subscription;

  constructor(private ui: UiService, private router: Router) {
    this.subscription = this.ui.onToggle().subscribe((value) => this.showForm = value);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBtnClick() {
    this.ui.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
