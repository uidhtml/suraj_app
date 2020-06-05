import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-main-category-links',
  templateUrl: './main-category-links.component.html',
  styleUrls: ['./main-category-links.component.scss'],
})
export class MainCategoryLinksComponent implements OnInit, OnChanges {
  @Input() categories;

  ngOnInit() {}
  ngOnChanges() {
    if (this.categories.length > 0) {
      this.categories.unshift('all');
    }
  }
}
