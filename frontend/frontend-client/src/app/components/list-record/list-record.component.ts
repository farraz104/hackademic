import { Observable } from "rxjs";
import { RecordService } from "../../services/record.service";
import { Record } from "../../record";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent implements OnInit {
  records: Observable<Record[]>;

  constructor(private recordService: RecordService,
    private router: Router) {  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.records = this.recordService.getRecordsList();
  }

}
