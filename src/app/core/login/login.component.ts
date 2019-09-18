import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  pNauserNameme = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  private apiBase = 'https://fossils.herokuapp.com/api/'

  constructor(public apiService: ApiService, public dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit() {
  }

  login() {
    const api = this.apiBase + 'login'
    this.apiService.apiCall('GET',api).subscribe(res =>{
      console.log(res)
      // add code
    });
    this.dialogRef.close();
    this.apiService.setLogin();

  }

}
