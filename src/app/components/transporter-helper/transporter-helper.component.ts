import { Component } from '@angular/core';
import { TransporterHelper } from 'src/app/models/transporterHelper';
import { TransporterHelperService } from 'src/app/services/transporter-helper.service';

@Component({
  selector: 'app-transporter-helper',
  templateUrl: './transporter-helper.component.html',
  styleUrls: ['./transporter-helper.component.css']
})
export class TransporterHelperComponent {
  transporterHelpers: TransporterHelper[];
  dataLoaded = false;
  filterText = "";
  filterText2 = "";

  constructor(private transporterHelperService:TransporterHelperService){}

  ngOnInit(): void {
    this.getTentHelpers();
  }

  getTentHelpers(){
    this.transporterHelperService.getTransporterHelpers().subscribe(response=>{
      this.transporterHelpers=response.data;
      this.dataLoaded=true;
    })
  }
}
