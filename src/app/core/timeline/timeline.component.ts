import { Component, OnInit, Inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component'
import * as $ from 'jquery';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public scrolling = false;
  public scale = 2;
  public years = 10000000000000;
  public catogories = [];
  public items = [];
  public scrolled = 0;
  public catogoryExpand: Array<boolean> = [];
  public catogoryHide = false;
  public subCatogoryHide = false;
  public subCatogoryExpand: Array<boolean> = [];



  constructor(public dialog: MatDialog, public apiService: ApiService ) { }

  ngOnInit() {
    this.getCatogories();
    this.getItems();
    console.log($);
  }

  getCatogories() {
    const API = 'https://api.myjson.com/bins/pqqav';
    this.apiService.apiCall('GET', API).subscribe( res => {
      console.log(res);
      console.log(res[0].geCategories);
      this.catogories = res[0].geCategories;
    });
  }

  getItems() {
    const API = 'https://api.myjson.com/bins/ndyg7';
    this.apiService.apiCall('GET', API).subscribe( res => {
      console.log(res);
      this.items = res;
    });
  }

  gotoCatogory() {
    this.catogoryExpand = [];
    this.catogoryHide = false;
    this.subCatogoryHide = false;
    this.subCatogoryExpand = [];
  }

  gotoSubCatogory() {
    this.subCatogoryHide = false;
    this.subCatogoryExpand = [];
  }

  ShowSubcatogory(scrollTo, i, hasSubCatotogory) {
    scrollTo += (window.innerWidth / 2);
    $('html, body').animate( { scrollLeft: scrollTo }, 500, 'linear');
    if ( hasSubCatotogory ) {
      this.catogoryExpand[i] = !this.catogoryExpand[i];
    this.catogoryHide = true;
    }
  }

  ShowDivision(scrollTo, j, hasDivision) {
    scrollTo += (window.innerWidth / 2);
    $('html, body').animate( { scrollLeft: scrollTo }, 500, 'linear');
    if ( hasDivision ) {
        this.subCatogoryExpand[j] = !this.subCatogoryExpand[j];
        console.log(this.subCatogoryExpand);
        this.subCatogoryHide = true;
    }
  }

  ShowDivisionItem(scrollTo) {
    scrollTo += (window.innerWidth / 2);
    $('html, body').animate( { scrollLeft: scrollTo }, 500, 'linear');
  }

  goTobegining() {
    $('html, body').animate( { scrollLeft: window.innerWidth }, 500, 'linear');
  }




  public nextItem(): void {
    // console.log($('.time-wrapper').width());
    // const toScroll = $('.time-wrapper').width() - this.scrolled;
    // $('html, body').animate( { scrollLeft: '+=' + toScroll }, toScroll, 'linear');
  }

  public prevItem(): void {
    // const toScroll = this.scrolled;
    // $('html, body').animate( { scrollLeft: '-=' + toScroll }, toScroll, 'linear');
  }

  public playScroll(): void {
    this.scrolling = true;
    const toScroll = $('.time-wrapper').width() - this.scrolled;
    $('html, body').animate( { scrollLeft: '+=' + toScroll }, toScroll, 'linear');
  }

  public stopScroll(): void {
    this.scrolling = false;
    $('html, body').stop();
  }


  @HostListener('window:scroll', ['$event'])
    doSomething(event) {
      // console.debug("Scroll Event", document.body.scrollTop);
      // see András Szepesházi's comment below
      // console.log('Scroll Event', window.pageXOffset );
      this.scrolled = window.pageXOffset - (window.innerWidth / 2);
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

}
