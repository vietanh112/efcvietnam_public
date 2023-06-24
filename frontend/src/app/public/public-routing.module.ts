import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../_helpers/auth.interceptor';
import {publicInformation} from './components/information/information.component';


export const routes: Routes = [
    { path: '**', redirectTo: 'information', component: publicInformation },
    { path: 'information', component: publicInformation },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {
}
