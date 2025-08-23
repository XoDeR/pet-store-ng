import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  platformId = inject(PLATFORM_ID);
  currentUser$ = user(this.auth);
  idToken = '';
  cookieKey = '__ps_session'; // ps -- pet store

  constructor() {
    if (isPlatformServer(this.platformId)) {
      // set up server auth
    } else {
      // set up browser auth
    }
  }

  handleCookie(token?: string) {
    if (token) {
      cookies.set(this.cookieKey, token);
    } else {
      cookies.remove(this.cookieKey);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return result.user;
    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }

  async signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return result.user;
    } catch (error) {
      console.error('Signup error: ', error);
      throw error;
    }
  }

  async getToken() {
    let token: string | null = null;
    const user = this.auth.currentUser;
    if (user) {
      token = await user.getIdToken();
    } else if (this.idToken) {
      token = this.idToken;
    }
    console.log('getToken(): token', token);
    return token;
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google signin error: ', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Logout error: ', error);
      throw error;
    }
  }
}
