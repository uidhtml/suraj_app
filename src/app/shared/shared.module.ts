import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ProductCardComponent } from './utility/card/product-card/product-card.component';
import { HeroBannerComponent } from './component/hero-banner/hero-banner.component';
import { ProductCounterComponent } from './component/product-counter/product-counter.component';

const projectSharedComponent = [
  ProductCardComponent,
  HeroBannerComponent,
  ProductCounterComponent
];
const projectSharedModule = [CommonModule, MaterialModule];

@NgModule({
  declarations: [...projectSharedComponent],
  imports: [...projectSharedModule],
  exports: [...projectSharedModule, ...projectSharedComponent]
})
export class SharedModule {}
