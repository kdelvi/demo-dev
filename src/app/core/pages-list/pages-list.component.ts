import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ApiService } from '../../services/api.service';
import { DomSanitizer} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';


/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss']
})
export class PagesListComponent implements OnInit {
  pageList = [];
  isLoggedIn = true;
  treeControl = new NestedTreeControl<any>(node => node.child);
  dataSource = [];
  isLoading ;

  private apiBase = 'https://fossils.herokuapp.com/api/'

  constructor(private apiService: ApiService, private sanitization: DomSanitizer, public dialog: MatDialog) {}

  sanUrl(link) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${link}) no-repeat`);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      panelClass:'add-dialog-cont',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.getData()
  }

  openLogin() {
     const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getData() {
    // const api ='https://api.myjson.com/bins/vp6lp';
    this.isLoading =true;
    const api = this.apiBase + 'page/resultPage'
    this.apiService.apiCall('GET',api).subscribe(res => {
      this.isLoading = false;
      for( let i = 0; i < res.length ; i++) {
        // this.pageList = res;
        this.dataSource[i] = new MatTreeNestedDataSource<any>();
        this.dataSource[i].data = [res[i]];
      }

    })
  }
  hasChild = (_: number, node: any) => !!node.child && node.child.length > 0;
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
