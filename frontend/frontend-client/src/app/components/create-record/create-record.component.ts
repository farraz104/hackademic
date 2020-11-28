import { RecordService } from '../../services/record.service';
import { Record } from '../../record';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {

  record: Record = new Record();
  submitted = false;
  result: any;

  constructor(private recordService: RecordService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  newRecord(): void {
    this.submitted = false;
    this.record = new Record();
  }

  openDialog(data: Object) {
    this.dialog.open(AlertDialogComponent,{
      data: {
        message: data['message'],
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }

  save() {
    this.result = this.recordService.createRecord(this.record)
      .subscribe(data => this.openDialog(data), error => console.log(error));
    
    this.record = new Record();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
