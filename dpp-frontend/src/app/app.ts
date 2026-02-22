import { Component } from '@angular/core';
import { NavbarComponent } from './features/navbar/navbar.component';
import { RouterModule } from "@angular/router";
@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-navbar></app-navbar><router-outlet></router-outlet>',
  imports: [NavbarComponent, RouterModule]
})
export class AppComponent {

}
