import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListBlogComponent } from './blog/list-blog/list-blog.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { BlogComponent } from './user/blog/blog.component';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { ProductComponent } from './user/product/product.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './user/order/order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { ListOrderDetailComponent } from './order/list-order-detail/list-order-detail.component';
import { OrderDetailComponent } from './user/order-detail/order-detail.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';

const routes: Routes = [
  {
    path: '',
    component: UserhomeComponent,
  },
  {
    path: 'user/products',
    component: ProductComponent,
  },
  {
    path: 'user/product/:query',
    component: ProductDetailComponent,
  },
  {
    path: 'user/cart',
    component: CartComponent,
    canActivate: [authGuard, userGuard],
  },
  {
    path: 'user/checkout',
    component: CheckoutComponent,
    canActivate: [authGuard, userGuard],
  },
  {
    path: 'user/orders',
    component: OrderComponent,
    canActivate: [authGuard, userGuard],
  },
  {
    path: 'user/orders/:query',
    component: OrderDetailComponent,
    canActivate: [authGuard, userGuard],
  },
  {
    path: 'user/blog',
    component: BlogComponent,
  },
  {
    path: 'user/blog/:query',
    component: BlogDetailComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: SignupComponent,
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
  },
  {
    path: 'admin/home',
    component: HomeComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-category',
    component: ListCategoryComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-products',
    component: ListProductComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-blogs',
    component: ListBlogComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-orders',
    component: ListOrderComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'admin/list-orders/:query',
    component: ListOrderDetailComponent,
    canActivate: [authGuard, adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
