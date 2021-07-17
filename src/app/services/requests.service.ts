import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ITask from "../Task";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  url = "http://localhost:5000/tasks"

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url);
  }

  deleteTask(task :ITask): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${task.id}`);
  }

  changeReminder(task :ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/${task.id}`, task, httpOptions);
  }

  createTask(task :ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task, httpOptions);
  }
}
