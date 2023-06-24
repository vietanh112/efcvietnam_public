import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PublicRoutingModule} from './public-routing.module';
import {AntDesignModule} from '../shared/ant-design.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
//Components
import {publicInformation} from './components/information/information.component';


@NgModule({
    declarations: [
        publicInformation
    ],
    imports: [
        AntDesignModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PublicRoutingModule,
    ],
    providers: [
        
    ],
    entryComponents: [
        
    ]
})
export class PublicModule {

}
