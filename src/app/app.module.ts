import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { BuildReporterAddComponent } from './components/build-reporter-add/build-reporter-add.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BuildReporterComponent,
    MainComponent,
    LoginComponent,
    BuildReporterAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
