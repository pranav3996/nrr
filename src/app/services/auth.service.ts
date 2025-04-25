
import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { app } from './firebase-config';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(app);
  private currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log('User changed:', user);
    });
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
