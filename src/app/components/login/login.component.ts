import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor() {}
  username: string = ''
  password: string = ''
  authService = inject(AuthService)

  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password)
     console.log(resp);
     
    }
    catch (e) {
      console.error('Fehler bei der Anmeldung', e);

    }
  }




}


