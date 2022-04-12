import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
