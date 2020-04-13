import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationComponent } from './activation/activation.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';

const userComponents = [
  UserComponent,
  CartComponent,
  SignupComponent,
  ProfileComponent,
  OrdersComponent,
  OrderDetailsComponent,
  ActivationComponent,
  UserStatusComponent,
  ShippingComponent,
  PaymentModeComponent,
];

@NgModule({
  declarations: [...userComponents],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
