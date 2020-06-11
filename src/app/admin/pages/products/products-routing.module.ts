import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ActiveComponent } from './list/active/active.component';
import { AllComponent } from './list/all/all.component';
import { InactiveComponent } from './list/inactive/inactive.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'all', component: AllComponent },
      { path: 'active', component: ActiveComponent },
      { path: 'inactive', component: InactiveComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
