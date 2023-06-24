import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingModule} from './admin-routing.module';
import {AntDesignModule} from '../shared/ant-design.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
//Components
import {AdminCertificate} from './components/certificate/certificate.component';
import {AdminCertificateModalInfor} from './components/certificate/infor/infor.component';
import {AdminCertificateModalUpdate} from './components/certificate/update/update.component';
import {AdminCertificateModalCreate} from './components/certificate/create/create.component';
import {AdminCertificateModalQrcode} from './components/certificate/qrcode/qrcode.component';

//QR code
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        
        //Admin
        AdminCertificate,
        AdminCertificateModalInfor,
        AdminCertificateModalUpdate,
        AdminCertificateModalCreate,
        AdminCertificateModalQrcode
        
    ],
    imports: [
        AntDesignModule,
        QRCodeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ]
})
export class AdminModule {

}
