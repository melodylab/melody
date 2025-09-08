import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, RouterLink, RouterLinkActive,],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']

})
export class LayoutComponent {

}


