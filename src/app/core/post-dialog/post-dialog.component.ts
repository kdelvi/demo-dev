import { Component, OnInit, OnDestroy, Inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  public invalidCatogary = true;

  pName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pFrom = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pTo = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pUnit = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  slectedPage = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  cName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  imageUrl = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
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

  private apiBase = 'https://fossils.herokuapp.com/api/'




  pageLists = [];
  catogoryLists = [];
  subCatogoryLists = [];
  divisionLists = [];


  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {}

    ngOnInit() {
      this.getAllList();
    }

  public noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getAllList() {
    const allPages = this.apiBase + 'page/getAllPages';
    const allCat = this.apiBase + 'category/getAllCategory';
    const allsubCat = this.apiBase + 'subCategory/getAllSubCategory';
    const allDiv = this.apiBase + 'subCategoryDiv/getAllSubCategory';

    this.apiService.apiCall('GET', allPages).subscribe(res => {
      this.pageLists = res;
    })

    this.apiService.apiCall('GET', allCat).subscribe(res => {
      this.catogoryLists = res;
    })

    this.apiService.apiCall('GET', allsubCat).subscribe(res => {
      this.subCatogoryLists = res;
    })

    this.apiService.apiCall('GET', allDiv).subscribe(res => {
      this.divisionLists = res;
    })

  }

  addList(list, name, from, to, type, postName, imageUrl?, parent?, unit?) {
    const headers = new HttpHeaders({
       'no-auth': 'true',
    });
    let api;
    if( parent ){
      api = this.apiBase + type +'/'+ parent.value + '/' + postName;
    } else {
      api = this.apiBase + type + '/' + postName;
    }


    const value = {
        'name': name.value,
        'fromAge': +from.value,
        'toAge': +to.value,
      }
      if( unit ) {
        value['scaleUnit'] = unit.value;
      }
      if( imageUrl ) {
        value['bgImageURL'] = imageUrl.value;
      }


    list.push(value);

    this.apiService.apiCall('POST', api, value , false, {headers: headers}).subscribe(res => {
      console.log(res);
      this.getAllList();
    });

    name.setValue('');
    from.setValue('');
    to.setValue('');

    if(unit) {
    unit.setValue('');
    unit.markAsUntouched();
    }

    if(parent) {
      parent.setValue('');
      parent.markAsUntouched();
    }


    if(imageUrl) {
      imageUrl.setValue('');
      imageUrl.markAsUntouched();
    }

    name.markAsUntouched();
    from.markAsUntouched();
    to.markAsUntouched();
  }


  editList(list, name, from , to , unit?) {
    name.setValue(list.name);
    from.setValue(+list.from);
    to.setValue(+list.to);

  }

}
