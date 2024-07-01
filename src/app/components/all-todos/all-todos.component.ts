import { Component } from '@angular/core';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent {
  todos: any = [];
  error = '';

  title: string = '';
  checked: boolean = false;

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    }
    catch (e) {
      this.error = 'Fehler beim Laden!'
    }

  }
  constructor(private http: HttpClient) { }


  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Token ' + localStorage.getItem('token'))
    return lastValueFrom(this.http.get(url, {
      headers: headers
    }));

  }


  addTodoItem(title: string, checked: boolean): Observable<any> {
    const url = `${environment.baseUrl}/todos/create/`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    const body = {
      title: title,
      checked: checked
    };
    return this.http.post(url, body, { headers });
  }


  onSubmit(): void {
    this.addTodoItem(this.title, this.checked)
      .subscribe(
        response => {
          console.log('TodoItem erfolgreich hinzugefügt:', response);
          // Hier könntest du weiterführende Aktionen ausführen, z.B. eine Erfolgsmeldung anzeigen
        },
        error => {
          console.error('Fehler beim Hinzufügen des TodoItems:', error);
          // Hier könntest du eine Fehlermeldung anzeigen oder entsprechend reagieren
        }
      );
}
}
