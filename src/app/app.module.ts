import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { BuildReporterAddComponent } from './components/build-reporter-add/build-reporter-add.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FoodHelperComponent } from './components/food-helper/food-helper.component';
import { HouseHelperComponent } from './components/house-helper/house-helper.component';
import { OperatorHelperComponent } from './components/operator-helper/operator-helper.component';
import { TentHelperComponent } from './components/tent-helper/tent-helper.component';
import { TransporterHelperComponent } from './components/transporter-helper/transporter-helper.component';
import { FoodVictimComponent } from './components/food-victim/food-victim.component';
import { ColdVictimComponent } from './components/cold-victim/cold-victim.component';
import { DebrisVictimComponent } from './components/debris-victim/debris-victim.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColdVictimAddComponent } from './components/cold-victim-add/cold-victim-add.component';
import { DebrisVictimAddComponent } from './components/debris-victim-add/debris-victim-add.component';
import { FoodVictimAddComponent } from './components/food-victim-add/food-victim-add.component';
import { FoodHelperAddComponent } from './components/food-helper-add/food-helper-add.component';
import { HouseHelperAddComponent } from './components/house-helper-add/house-helper-add.component';
import { TentHelperAddComponent } from './components/tent-helper-add/tent-helper-add.component';
import { OperatorHelperAddComponent } from './components/operator-helper-add/operator-helper-add.component';
import { TransporterHelperAddComponent } from './components/transporter-helper-add/transporter-helper-add.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddressFilterPipe } from './pipes/address-filter.pipe';
import { MapsAddressFilterPipe } from './pipes/maps-address-filter.pipe';
import { AddressFromFilterPipe } from './pipes/address-from-filter.pipe';
import { AddressToFilterPipe } from './pipes/address-to-filter.pipe';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BuildReporterComponent,
    MainComponent,
    LoginComponent,
    BuildReporterAddComponent,
    RegisterComponent,
    FoodHelperComponent,
    HouseHelperComponent,
    OperatorHelperComponent,
    TentHelperComponent,
    TransporterHelperComponent,
    FoodVictimComponent,
    ColdVictimComponent,
    DebrisVictimComponent,
    ColdVictimAddComponent,
    DebrisVictimAddComponent,
    FoodVictimAddComponent,
    FoodHelperAddComponent,
    HouseHelperAddComponent,
    TentHelperAddComponent,
    OperatorHelperAddComponent,
    TransporterHelperAddComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    AddressFilterPipe,
    MapsAddressFilterPipe,
    AddressFromFilterPipe,
    AddressToFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
