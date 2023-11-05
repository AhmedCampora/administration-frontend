import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  returnPage: 'Home' | 'Login' = 'Home';
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.returnPage = 'Home';
    } else {
      this.returnPage = 'Login';
    }
  }

  navigate() {
    if (this.returnPage === 'Login') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
