import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { TimelineComponent } from './core/timeline/timeline.component';

// angular material m0dules
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { PostDialogComponent } from './core/post-dialog/post-dialog.component';
import { PagesListComponent } from './core/pages-list/pages-list.component';
import { LoginComponent } from './core/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostDialogComponent,
    TimelineComponent,
    PagesListComponent,
    LoginComponent
  ],
  imports: [
     BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // angular material
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTreeModule,
  ],
  entryComponents: [PostDialogComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
