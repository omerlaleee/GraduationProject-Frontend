import { Component, OnInit } from '@angular/core';
import { BuildReporter } from 'src/app/models/buildReporter';
import { BuildReporterService } from 'src/app/services/build-reporter.service';

@Component({
  selector: 'app-build-reporter',
  templateUrl: './build-reporter.component.html',
  styleUrls: ['./build-reporter.component.css']
})
export class BuildReporterComponent implements OnInit {

  buildReporters: BuildReporter[];
  dataLoaded = false;

  constructor(private buildReporterService: BuildReporterService) { }

  ngOnInit(): void {
    this.getBuildReporters();
  }


  getBuildReporters() {
    this.buildReporterService.getBuildReporters().subscribe(response => {
      this.buildReporters = response.data;
      this.dataLoaded = true;
    });
  }

}
