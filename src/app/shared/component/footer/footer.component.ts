import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public list = [
    { title: 'All' },
    { title: 'Fruits' },
    { title: 'Vegetables' },
    { title: 'Cereals' },
    { title: 'Spices' }
  ];
  constructor() {}

  ngOnInit() {}
}
