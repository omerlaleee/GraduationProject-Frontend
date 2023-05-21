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
import { ColdVictimComponent } from './components/cold-victim/cold-victim.component';
import { TentHelperComponent } from './components/tent-helper/tent-helper.component';
import { HouseHelperComponent } from './components/house-helper/house-helper.component';
import { OperatorHelperComponent } from './components/operator-helper/operator-helper.component';
import { TransporterHelperComponent } from './components/transporter-helper/transporter-helper.component';
import { FoodVictimComponent } from './components/food-victim/food-victim.component';
import { ColdVictimAddComponent } from './components/cold-victim-add/cold-victim-add.component';
import { DebrisVictimAddComponent } from './components/debris-victim-add/debris-victim-add.component';
import { FoodVictimAddComponent } from './components/food-victim-add/food-victim-add.component';
import { FoodHelperAddComponent } from './components/food-helper-add/food-helper-add.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "buildreporter/add", component: BuildReporterAddComponent, canActivate: [LoginGuard] },
  { path: "debrisvictim/add", component: DebrisVictimAddComponent, canActivate: [LoginGuard] },
  { path: "coldvictim/add", component: ColdVictimAddComponent, canActivate: [LoginGuard] },
  { path: "foodvictim/add", component: FoodVictimAddComponent, canActivate: [LoginGuard] },

  { path: "foodhelpers/add", component: FoodHelperAddComponent },
  // { path: "tenthelpers/add", component: TentHelperAddComponent},
  // { path: "househelpers/add", component: HouseHelperAddComponent },
  // { path: "operatorhelpers/add", component: OperatorHelperAddComponent },
  // { path: "transporterhelpers/add", component: TransporterHelperAddComponent },

  { path: "buildreporters", component: BuildReporterComponent },
  { path: "debrisvictims", component: DebrisVictimComponent },
  { path: "coldvictims", component: ColdVictimComponent },
  { path: "foodvictims", component: FoodVictimComponent },
  { path: "foodhelpers", component: FoodHelperComponent },
  { path: "househelpers", component: HouseHelperComponent },
  { path: "tenthelpers", component: TentHelperComponent },
  { path: "operatorhelpers", component: OperatorHelperComponent },
  { path: "transporterhelpers", component: TransporterHelperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
