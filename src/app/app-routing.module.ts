import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { BuildReporterAddComponent } from './components/build-reporter-add/build-reporter-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { FoodHelperComponent } from './components/food-helper/food-helper.component';
import { DebrisVictimComponent } from './components/debris-victim/debris-victim.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "buildreporters", component: BuildReporterComponent },
  { path: "login", component: LoginComponent },
  { path: "buildreporters/add", component: BuildReporterAddComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "foodhelpers", component: FoodHelperComponent },
  { path: "debrisvictims", component: DebrisVictimComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
