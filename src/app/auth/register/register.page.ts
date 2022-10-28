/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage
{
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
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
    const loading = await this.loadingCtrl.create({ message: 'Registering...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async ()=>
      {
        const toast=await this.toastCtrl.create({message:'User Created',duration:2000,color:'dark'});
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      async ()=>{
        const alert =await this.alertCtrl.create({message:'There is an error',buttons:['Ok']});
        await alert.present();
        loading.dismiss();
      }
    );
  }
}
