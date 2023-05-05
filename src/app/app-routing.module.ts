import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { BuildReporterAddComponent } from './components/build-reporter-add/build-reporter-add.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "buildreporters", component: BuildReporterComponent },
  { path: "login", component: LoginComponent },
  { path: "buildreporters/add", component: BuildReporterAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
