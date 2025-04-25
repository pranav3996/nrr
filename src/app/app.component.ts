import { Component } from '@angular/core';

import { MatchResultComponent } from './net-run-rate/match-result/match-result.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PointTableComponent } from './net-run-rate/point-table/point-table.component';

import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatchResultComponent,HeaderComponent,FooterComponent,PointTableComponent,LoginComponent,CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nrr';
  constructor(public authService: AuthService) {}

}
