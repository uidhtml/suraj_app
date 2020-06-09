import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from '@app/core/pages/login/login.component';
import { ForgotPasswordComponent } from '@app/core/pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { ActivationComponent } from './activation/activation.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'orders/:order_range', component: OrdersComponent },
  { path: 'status', component: UserStatusComponent },
  { path: 'activation', component: ActivationComponent },
  { path: 'activation/:otpSent', component: ActivationComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'payment-mode', component: PaymentModeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
