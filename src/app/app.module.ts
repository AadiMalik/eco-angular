import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ListBlogComponent } from './blog/list-blog/list-blog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './user/blog/blog.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { ProductComponent } from './user/product/product.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './user/order/order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    ListCategoryComponent,
    ListProductComponent,
    ListBlogComponent,
    BlogComponent,
    UserhomeComponent,
    BlogDetailComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,
    ListOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
