import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ApiService } from '../../services/api.service';
import { DomSanitizer} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';


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
  isLoggedIn = false;
  treeControl = new NestedTreeControl<any>(node => node.child);
  dataSource = [];

  constructor(private apiService: ApiService, private sanitization: DomSanitizer, public dialog: MatDialog) {}

  sanUrl(link) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${link}) no-repeat`);
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
    const api ='https://api.myjson.com/bins/vp6lp';
    this.apiService.apiCall('GET',api).subscribe(res => {
      for( let i = 0; i < res.length ; i++) {
        //this.pageList = res;
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
