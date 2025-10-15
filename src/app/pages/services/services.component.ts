import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {  RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-services',
  imports: [RouterLink,LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
