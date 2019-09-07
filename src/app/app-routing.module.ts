import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { TimelineComponent } from './core/timeline/timeline.component';
import { PagesListComponent } from './core/pages-list/pages-list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'time-line',
    component: TimelineComponent
  },
  {
    path: 'pages',
    component: PagesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
