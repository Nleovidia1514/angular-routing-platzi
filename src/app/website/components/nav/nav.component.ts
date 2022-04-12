import { Component, OnInit } from '@angular/core';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  categories: Category[] = [];
  activeMenu = false;
  counter = 0;
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('admin@mail.com', 'admin123')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
