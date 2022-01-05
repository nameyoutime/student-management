import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  constructor(public authSer: AuthService,private shared:ShareService) { }

  ngOnInit(): void {
  }
  
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  validateForm(email:any, password:any) {
    if (email.length === 0) {
      this.errorMessage = "please enter email id";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = "password should be at least 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;

  }
  loginByEmail() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authSer.loginWithEmail(this.email, this.password)
        .then(() => {
          // this.router.navigate(['/note-page'])
          this.shared.showToast('Susscess',"susscess login!");
        }).catch(_error => {
          this.shared.showToast('Error',"Error login!",true);
          this.error = _error
          // this.router.navigate(['/sign-in'])
        })
    }
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  loginWithGoogle() {
    this.authSer.loginWithGoogle();
  }

  logout() {
    this.authSer.logout();
  }

}
