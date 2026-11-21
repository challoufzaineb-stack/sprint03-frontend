import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ➔ CommonModule men hna
import { RouterLink, RouterOutlet, Router } from '@angular/router'; // ➔ Router, RouterLink, RouterOutlet men hna
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'MesVoyages';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    
    isloggedin = localStorage.getItem('isloggedIn')!;
    loggedUser = localStorage.getItem('loggedUser')!;

    if (isloggedin != "true" || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}