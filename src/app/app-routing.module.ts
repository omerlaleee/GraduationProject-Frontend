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
import { HouseHelperAddComponent } from './components/house-helper-add/house-helper-add.component';
import { TentHelperAddComponent } from './components/tent-helper-add/tent-helper-add.component';
import { OperatorHelperAddComponent } from './components/operator-helper-add/operator-helper-add.component';
import { TransporterHelperAddComponent } from './components/transporter-helper-add/transporter-helper-add.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "buildreporter/add", component: BuildReporterAddComponent, canActivate: [LoginGuard] },
  { path: "debrisvictim/add", component: DebrisVictimAddComponent },
  { path: "coldvictim/add", component: ColdVictimAddComponent },
  { path: "foodvictim/add", component: FoodVictimAddComponent },

  { path: "foodhelper/add", component: FoodHelperAddComponent, canActivate: [LoginGuard] },
  { path: "tenthelper/add", component: TentHelperAddComponent, canActivate: [LoginGuard] },
  { path: "househelper/add", component: HouseHelperAddComponent, canActivate: [LoginGuard] },
  { path: "operatorhelper/add", component: OperatorHelperAddComponent, canActivate: [LoginGuard] },
  { path: "transporterhelper/add", component: TransporterHelperAddComponent, canActivate: [LoginGuard] },

  { path: "buildreporters", component: BuildReporterComponent },
  { path: "debrisvictims", component: DebrisVictimComponent },
  { path: "coldvictims", component: ColdVictimComponent },
  { path: "foodvictims", component: FoodVictimComponent },
  { path: "foodhelpers", component: FoodHelperComponent },
  { path: "househelpers", component: HouseHelperComponent },
  { path: "tenthelpers", component: TentHelperComponent },
  { path: "operatorhelpers", component: OperatorHelperComponent },
  { path: "transporterhelpers", component: TransporterHelperComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
