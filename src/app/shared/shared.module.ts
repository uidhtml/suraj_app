import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ProductCardComponent } from './utility/card/product-card/product-card.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeroBannerComponent } from './component/hero-banner/hero-banner.component';

const projectSharedComponent = [
  ProductCardComponent,
  FooterComponent,
  HeaderComponent,
  HeroBannerComponent
];
const projectSharedModule = [CommonModule, MaterialModule];

@NgModule({
  declarations: [...projectSharedComponent],
  imports: [...projectSharedModule],
  exports: [...projectSharedModule, ...projectSharedComponent]
})
export class SharedModule {}
