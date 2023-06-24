import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../../_core/services/authentication.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-core-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class CoreComponentHeader implements OnInit, AfterViewInit {
    @Input() checkVisibleChangePassword: boolean = false;
    @Input() checkVisibleInfor: boolean = false;
    data: any;
    currentUser: any = null;

    ngOnInit(): void {
        this.getCurrentUser();
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public router: Router,
                private authenticationService: AuthenticationService,
                private modal: NzModalService,){

    }

    showModalChangePassword() {
        this.checkVisibleChangePassword = true;
    }

    showModalInfor() {
        this.checkVisibleInfor = true;
    }

    getCurrentUser () {
        if(localStorage.getItem('currentUser')){
            this.currentUser = this.authenticationService.currentUserValue;
            if(this.currentUser) {
                this.data = this.currentUser.id;
            }
        }
    }

    changePassword(res: any) {
        this.checkVisibleChangePassword = false;
        if(res) {
            this.notification(res);
        }
    }



    changeInfor(e: any) {

    }

    notification(event: any) {
        let method = event.method;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.title}`,
            nzContent: `${event.message}`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
        }, 2000);
    }
}