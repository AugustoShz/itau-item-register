import { Routes } from '@angular/router';
import { RegisterItems } from './features/RegisterItems/RegisterItems.component';
import { ListItems } from './features/ListItems/ListItems.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: 'list'
  },
  {
    path: "register",
    component: RegisterItems
  },
  {
    path: "list",
    component: ListItems
  }
];
