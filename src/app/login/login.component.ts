import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../services/firebase-config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PointTableComponent } from '../net-run-rate/point-table/point-table.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,PointTableComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

  export class LoginComponent {
    email = '';
    password = '';
    error = '';
    constructor(private route:Router){}
  
    login() {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log('Logged in:', userCredential.user);
        })
        .catch((error) => {
          this.error = error.message;
        });
        this.route.navigate(['match-result']);
    }
   
  }

