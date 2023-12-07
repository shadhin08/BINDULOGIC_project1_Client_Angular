import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;

  base64Image: string = '';

  imageStatus: Message[] = [];
  inputStatus: Message[] = [];
  isSignupBtnDisabled: boolean = false;
  constructor(private dataServices: DataService, private router: Router) {}

  base64Converter(image: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async onImageLoad(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length === 0) {
      this.imageStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please select an image',
        },
      ];
      return;
    }
    const image = files[0];
    if (image.size > 100000) {
      this.imageStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Image size must be less than 100KB',
        },
      ];
      return;
    }
    this.imageStatus = [
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Image accepted',
      },
    ];
    this.base64Image = (await this.base64Converter(image)) as string;
  }

  onCreateAccountClick() {
    this.isSignupBtnDisabled = true;
    if (
      !this.firstName ||
      !this.lastName ||
      !this.username ||
      !this.password ||
      !this.email
    ) {
      this.inputStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: `${this.firstName ? '' : '[First Name] '} ${
            this.lastName ? '' : '[Last Name] '
          } ${this.username ? '' : '[Username] '} ${
            this.email ? '' : '[Email] '
          } ${this.password ? '' : '[Password] '} is required`,
        },
      ];
      this.isSignupBtnDisabled = false;
      return;
    }
    if (
      this.base64Image?.length > 0 &&
      this.imageStatus[0].severity === 'success'
    ) {
      const userData: User = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password,
        image: this.base64Image,
      };
      this.dataServices.createAccount(userData).subscribe(
        (result) => {
          if (result) {
            this.inputStatus = [
              {
                severity: 'success',
                summary: 'Success',
                detail: 'Account created successfully',
              },
            ];
            this.isSignupBtnDisabled = false;
            this.router.navigate(['/private-profile']);
          }
        },
        (error) => {
          this.inputStatus = [
            {
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message
                ? error.error.message
                : error.error
                ? error.error
                : 'Something went wrong',
            },
          ];
          this.isSignupBtnDisabled = false;
        }
      );
    } else {
      this.inputStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please select an image',
        },
      ];
      this.isSignupBtnDisabled = false;
      return;
    }
  }
  ngOnInit(): void {}
}
