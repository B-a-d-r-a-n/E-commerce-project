import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  showBtn: boolean = false;
  @HostListener('window:scroll')
  scrollToTop() {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 500) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }
}
