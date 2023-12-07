import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

import { City } from '../../interfaces/location';
import { RentPost } from '../../interfaces/rent-post';
import { DataService } from '../../services/data.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-rent-post',
  templateUrl: './create-rent-post.component.html',
  styleUrl: './create-rent-post.component.css',
})
export class CreateRentPostComponent implements OnInit {
  heading: string | undefined;
  description: string | undefined;
  rent: number = 0;
  bed: number = 1;
  bath: number = 1;
  size: number = 1;

  base64Image: string = '';

  selectedCity: City | undefined;

  cities: City[] | undefined;

  imageStatus: Message[] = [];
  inputStatus: Message[] = [];
  isCreateRentPostBtnDisabled: boolean = false;

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

  onCreateRentPostClick() {
    this.isCreateRentPostBtnDisabled = true;
    if (!this.heading || !this.description || !this.selectedCity) {
      this.inputStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: `${this.heading ? '' : '[Heading] '} ${
            this.description ? '' : '[Description] '
          } ${this.selectedCity ? '' : '[Location]'} is required`,
        },
      ];
      this.isCreateRentPostBtnDisabled = false;
      return;
    }
    if (
      this.base64Image?.length > 0 &&
      this.imageStatus[0].severity === 'success'
    ) {
      const postBody: RentPost = {
        heading: this.heading,
        description: this.description,
        rent: this.rent,
        bed: this.bed,
        bath: this.bath,
        size: this.size,
        rentAreaName: this.selectedCity?.area,
        image: this.base64Image,
      };
      this.dataServices.createRentPost(postBody).subscribe(
        (result) => {
          if (result) {
            this.inputStatus = [
              {
                severity: 'success',
                summary: 'Success',
                detail: 'Rent post created successfully',
              },
            ];
            this.isCreateRentPostBtnDisabled = false;
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
          this.isCreateRentPostBtnDisabled = false;
        }
      );
    } else {
      this.imageStatus = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please select an image',
        },
      ];
      this.isCreateRentPostBtnDisabled = false;
    }
  }

  ngOnInit(): void {
    this.dataServices.getAllRentArea().subscribe((rentArea) => {
      this.cities = rentArea;
    });
  }
}
