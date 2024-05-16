import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'; // Importujte Auth i createUserWithEmailAndPassword
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private auth: Auth) { // Dodajte Auth kao dependency
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]], // Proverava da li je validna email adresa
      password: ['', [Validators.required, Validators.minLength(6)]] // Minimalna dužina lozinke je 6 karaktera
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      return;
    }

    const { username, password } = this.registerForm.value;
    createUserWithEmailAndPassword(this.auth, username, password)
      .then(() => {
        alert('Registration successful');
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
