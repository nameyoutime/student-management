import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public showBar = false;
  public user: any;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.checkUser();
  }

  checkUser() {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.showBar = true;
      }
    })
  }

  getUser() {
    return this.user;
  }
  async loginWithEmail(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.user = user;
        this.router.navigate([""])

      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  async registerWithEmail(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.user = user;
        this.router.navigate([""])

      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  async loginWithGoogle() {
    const user = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>{
      this.router.navigate([""])
    });

  }
  async logout() {
    await this.afAuth.signOut().then(() => {
      this.showBar = false;

    });
  }
}
