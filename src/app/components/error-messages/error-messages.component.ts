import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.css',
})
export class ErrorMessagesComponent implements OnInit {
  @Input() errorMessage: string | undefined;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.errorMessage);
  }
}
