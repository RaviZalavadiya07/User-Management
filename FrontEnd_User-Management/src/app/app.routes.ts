import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    {
        path:"",
        component:UserListComponent
    },
    {
        path:"user-list",
        component:UserListComponent
    },
    {
        path:"add-user",
        component:UserFormComponent
    },
    {
        path:"user/:id",
        component:UserFormComponent
    }
];
