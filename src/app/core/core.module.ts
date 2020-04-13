import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainCategoryLinksComponent } from './components/main-category-links/main-category-links.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DropDownMenuComponent } from '@shared/utility/drop-down-menu/drop-down-menu.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    MainCategoryLinksComponent,
    MainFooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    DropDownMenuComponent,
  ],
  exports: [
    HeaderComponent,
    MainFooterComponent,
    MainCategoryLinksComponent,
    RouterModule,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
  ],
})
export class CoreModule {}
