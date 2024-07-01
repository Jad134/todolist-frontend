import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}
  username: string = ''
  password: string = ''
  authService = inject(AuthService)

  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password)
     console.log(resp);
     this.router.navigateByUrl('/todos')
     
    }
    catch (e) {
      console.error('Fehler bei der Anmeldung', e);
      alert('Login fehlgeschlagen')

    }
  }




}


