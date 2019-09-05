import { Component, OnInit, Inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {

  public invalidCatogary = true;

  pName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pFrom = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pTo = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pUnit = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  slectedPage = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  cName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  cFrom = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  cTo = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  slectedCatogory = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  sName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  sFrom = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  sTo = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  slectedSubCatogory = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  dName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  dFrom = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  dTo = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  private apiBase = 'https://fossils.herokuapp.com/api/page/addPage'




  pageLists = [];
  catogoryLists = [];
  subCatogoryLists = [];
  divisionLists = [];


  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

  public noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addList(list, name, from, to, group, unit?) {
    const headers = new HttpHeaders({
       'no-auth': 'true',
    });
    list.push(
      {
        'name': name.value,
        'fromAge': +from.value,
        'toAge': +to.value,
        'scaleUnit': +unit.value
      }
    );

    this.apiService.apiCall('POST', this.apiBase, list[list.length - 1], false, {headers: headers}).subscribe(res => {
      console.log('success');
      console.log(res);
    });

    name.setValue('');
    from.setValue('');
    to.setValue('');
    unit.setValue('');

    name.markAsUntouched();
    from.markAsUntouched();
    to.markAsUntouched();
    unit.markAsUntouched();
  }

}
