import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildReporterComponent } from './components/build-reporter/build-reporter.component';

const routes: Routes = [
  { path: "buildreporters", component: BuildReporterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
