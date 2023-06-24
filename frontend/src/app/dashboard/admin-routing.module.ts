import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../_helpers/auth.interceptor';

import {AdminCertificate} from './components/certificate/certificate.component';


// import { AuthGuard } from 'src/app/_helpers/auth.interceptor';

export const routes: Routes = [
    { path: '**', redirectTo: 'certificate', component: AdminCertificate, canActivate: [AuthGuard] },
    {path: 'certificate', component: AdminCertificate, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
