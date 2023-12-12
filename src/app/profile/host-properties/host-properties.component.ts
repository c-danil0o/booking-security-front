import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {HostProperty} from "../../model/hostproperty-model";
import {ActivatedRoute} from "@angular/router";
import {Table} from "primeng/table";
import {fakeAsync} from "@angular/core/testing";

@Component({
  selector: 'app-host-properties',
  templateUrl: './host-properties.component.html',
  styleUrls: ['./host-properties.component.css']
})
export class HostPropertiesComponent implements OnInit{
  properties: HostProperty[];
  loading: boolean = true;
  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const id = +params['hostId']
      this.accommodationService.findByHostId(id).subscribe({
        next: (data: HostProperty[]) =>{
          this.properties = data;
          this.loading = false;
        }

      })
    })
  }
}
