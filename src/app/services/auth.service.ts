import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  loginUsingGoogle() {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userData: any) => resolve(userData))
      ,(err: Error) => reject(err);
    })
  }

  loginUsingEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData))
      .catch(err => reject(err));
    })
  }

  registerUsingEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData))
      .catch(err => reject(err));
    })
  }

  getAuth() {
    return this.afAuth.authState.pipe(map((auth: any) => auth));
  }

  logout() {
    this.afAuth.signOut();
  }
}
