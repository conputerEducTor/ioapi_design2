/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    //private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  async onSubmit()
  {
    const loading=await this.loadingCtrl.create({message: 'Logging.....'});
    await loading.present();

    this.authService.login(this.form.value).subscribe
    (
     async token => {
        localStorage.setItem('token',token);
        loading.dismiss();
        this.router.navigateByUrl('/home');
     },
     async () => {
        const alert =await this.alertCtrl.create({message: 'Login Failed',buttons: ['Ok']});
        await alert.present();
        loading.dismiss();
     }
    );
  }

}
