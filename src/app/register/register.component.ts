import { LanguageSpokenService } from './../services/language-spoken.service';
import { CountriesService } from './../services/countries.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSelectModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  vendorForm!: FormGroup;
  languagesForm!: FormGroup;
  contactForm!: FormGroup;
  schoolForm!: FormGroup;

  countryList: any[] = [];
  languages: any[] = [];
  selectedLanguages: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private languageSpokenService: LanguageSpokenService,
    private vendorService: VendorService

  ) {
    this.loadCountryList();
    this.loadLanguagesSpokenList();
  }

  ngOnInit() {
    this.vendorForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      countryOfVendor: ['', Validators.required],
    });
    this.languagesForm = this._formBuilder.group({
      languageName: ['', Validators.required],
      selectedLanguage: ['', Validators.required],
    });
    this.contactForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.schoolForm = this._formBuilder.group({
      schoolName: ['', Validators.required],
      schoolCountry: ['', Validators.required],
      schoolCity: ['', Validators.required],
    });
  }

  submitForm() {
    const registrationData = {
      name: this.vendorForm.value.name,
      description: this.vendorForm.value.description,
      countryOfVendor: this.vendorForm.value.countryOfVendor,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      password: this.contactForm.value.password,
      languagesSpokenId: this.languagesForm.value.selectedLanguage,
      languagesSpoken: {
        id: this.languagesForm.value.selectedLanguage,
        name: this.languagesForm.value.languageName,
      },
      schoolId: this.schoolForm.value.schoolId,
      school: {
        id: this.schoolForm.value.schoolId,
        name: this.schoolForm.value.schoolName,
        country: this.schoolForm.value.schoolCountry,
        city: this.schoolForm.value.schoolCity,
      },
    };

    // Llamar al método addVendor del servicio VendorService y pasar los datos del registro
    this.vendorService.addVendor(registrationData).subscribe(
      response => {
        // Manejar la respuesta si es necesario
        console.log(response);
      },
      error => {
        // Manejar el error si ocurre
        console.error(error);
      }
    );
  }


  loadCountryList(): void {
    // Lógica para cargar la lista de países desde tu servicio
    // Supongamos que countriesService.getAllCountries() devuelve una promesa con los países
    this.countriesService.getAllCountries().subscribe((countries: any[]) => {
      // Formatear los países y asignarlos a countryList, ordenándolos alfabéticamente
      this.countryList = countries
        .map((country) => ({
          altSpelling: country.altSpellings[0],
          name: country.name.common,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  loadLanguagesSpokenList() {
    this.languageSpokenService
      .getLanguageSpokens()
      .subscribe((languageSpokenList: any[]) => {
        this.languages = languageSpokenList;

      });
  }
  addLanguage() {
    const selectedLanguageId = this.languagesForm.value.selectedLanguage;
    const selectedLanguage = this.languages.find(
      (language) => language.id === selectedLanguageId
    );
    if (
      selectedLanguage &&
      !this.selectedLanguages.some((lang) => lang.id === selectedLanguage.id)
    ) {
      this.selectedLanguages.push(selectedLanguage);
    }
  }

  removeLanguage(language: any) {
    const index = this.selectedLanguages.indexOf(language);
    if (index >= 0) {
      this.selectedLanguages.splice(index, 1);
    }
  }

  validatePassword(control: any) {
    // Validación personalizada para garantizar que la contraseña contenga caracteres especiales, números y letras
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pattern.test(control.value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordsNotMatch': true };
  }
}
