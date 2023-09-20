import { Component } from '@angular/core';
import { faAddressBook, faX, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  facebookIcon = faAddressBook;
  xIcon=faX;
  linkIcon=faLink;
}
