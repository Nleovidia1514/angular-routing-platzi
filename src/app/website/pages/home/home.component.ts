import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productId!: string | null;
  offset: number = 0;
  limit: number = 10;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }

  loadMore(): void {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
