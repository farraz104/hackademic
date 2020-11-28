import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRecordComponent } from './components/list-record/list-record.component';
import { CreateRecordComponent } from './components/create-record/create-record.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'lista', component: ListRecordComponent },
  { path: 'crear', component: CreateRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
