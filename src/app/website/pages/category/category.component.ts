import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products
    [products]="products"
    (loadMore)="loadMore()"
    [productId]="productId"
  ></app-products>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  productId!: string | null;
  categoryId!: string | null;
  limit: number = 10;
  offset: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');

          if (this.categoryId) {
            return this.productsService.getByCategory(
              this.categoryId as string,
              this.limit,
              this.offset
            );
          }

          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }

  loadMore(): void {
    if (this.categoryId) {
      this.productsService
        .getByCategory(this.categoryId as string, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
}
