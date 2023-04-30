import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: MainComponent },
  { path: "buildreporters", component: BuildReporterComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
