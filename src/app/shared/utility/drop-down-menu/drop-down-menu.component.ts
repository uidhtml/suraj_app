import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent {
  @Output() logout: EventEmitter<string> = new EventEmitter();

  signout() {
    this.logout.emit('logout');
  }
}
