import { Component, Input, OnInit } from '@angular/core';
import { RentPost } from '../../interfaces/rent-post';

@Component({
  selector: 'app-rent-post-item',
  templateUrl: './rent-post-item.component.html',
  styleUrl: './rent-post-item.component.css',
})
export class RentPostItemComponent implements OnInit {
  @Input() rentPost: RentPost | undefined;

  constructor() {}

  ngOnInit(): void {}
}
