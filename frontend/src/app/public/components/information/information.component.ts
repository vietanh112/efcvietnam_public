import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { publicService } from '../../services/public.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-public-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})

export class publicInformation implements OnInit, AfterViewInit {
    certificateCode: string = null;
    loadingState: boolean = false;
    isVisible:boolean = false;
    passwordQrcode: string = '';
    showValid1: boolean = false;

    certificate: any = {
        id: '',
        informationCode: '',
        certificateCode: '',
        licenseCode: '',
        name: '',
        address: '',
        website:  '',
        status:  null,
        fstIssueDate: '',
        lstIssueDate:  '',
        expiryDate:  '',
        standard: '',
        scope: '',
        quantity: '',
        hectares: '',
        createdAt:  '',
        updatedAt: '',
    }
    statusSearch: boolean = false;

    routeParams: any = {
        keyword: null,
    };

    

    sizeSearch: any = 'large';

    constructor(public publicService: publicService,
                private modal: NzModalService,
                public activatedRoute: ActivatedRoute,
                private location: Location,
                private router: Router,
                private route: ActivatedRoute,) {
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.routeParams = params;
                        this.certificateCode='';
                        this.passwordQrcode = '';
                        if (typeof (params['id']) !== 'undefined') {
                            this.certificateCode = decodeURIComponent(params['id']);
                        }
                        if (typeof (params['passwordQrcode']) !== 'undefined') {
                            this.passwordQrcode = decodeURIComponent(params['passwordQrcode']);
                        }
                    })
                }

    ngOnInit(): void {
        this.responsive(window.innerWidth);
        // this.resizeObservable$ = fromEvent(window, 'resize');
        // this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
        //     //@ts-ignore
        //     this.responsive(evt.currentTarget.innerWidth);
        // })
    }

    responsive(width: any) {
        if(width < 767) {
            this.sizeSearch = 'default';
        }
        else {
            this.sizeSearch = 'large';
        }
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            if(this.certificateCode == null || this.certificateCode == '' || this.certificateCode == undefined){
                return
            }
            this.searchCertificate();
        }, 0);
    }

    searchCertificate() {
        if(!this.certificateCode) {
            return
        }

        this.loadingState = true;

        this.publicService.getCertificateCode(this.certificateCode).subscribe(res => {
            this.loadingState = false;
            let eventNoti: any = {
                id: '',
                message: 'success',
                title: 'Tìm kiếm Thành công'
            }
    
            if(res.code == 200 && res.status == 1) {
                this.certificate.informationCode = res.data.informationCode;
                this.certificate.certificateCode = res.data.certificateCode;
                this.certificate.licenseCode = res.data.licenseCode;
                this.certificate.name = res.data.name;
                this.certificate.address = res.data.address;
                this.certificate.website = res.data.website;
                this.certificate.status = res.data.status;
                this.certificate.fstIssueDate = res.data.fstIssueDate;
                this.certificate.lstIssueDate = res.data.lstIssueDate;
                this.certificate.expiryDate = res.data.expiryDate;
                this.certificate.standard = res.data.standard;
                this.certificate.scope = res.data.scope;
                this.certificate.quantity = res.data.quantity;
                this.certificate.hectares = res.data.hectares;

                eventNoti.id = res.data.certificateCode;

            }
            else if (res.code == 201 && res.status == 0) {
                eventNoti.message = 'warning';
                eventNoti.title = 'Password QrCode không tồn tại';
                this.certificateNoData();
            }
            else if (res.code == 202 && res.status == 0) {
                eventNoti.message = 'warning';
                eventNoti.title = 'Certificate Code không tồn tại';
                this.certificateNoData();
            }
            else {
                eventNoti.message = 'error';
                eventNoti.title = 'Tìm kiếm Thất bại';
                this.certificateNoData();
            }
            this.location.replaceState(this.router.url.split('?')[0], `id=${this.certificateCode}`);
            
            return this.notification(eventNoti);
        })
    }

    certificateNoData() {
        this.certificate.informationCode = '';
        this.certificate.certificateCode = '';
        this.certificate.licenseCode = '';
        this.certificate.name = '';
        this.certificate.address = '';
        this.certificate.website = '';
        this.certificate.status = null;
        this.certificate.fstIssueDate = '';
        this.certificate.lstIssueDate = '';
        this.certificate.expiryDate = '';
        this.certificate.standard = '';
        this.certificate.scope = '';
        this.certificate.quantity = '';
        this.certificate.hectares = '';
    };

    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.title}`,
            nzContent: `${event.title} <b> ${event.id} </b>`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
            if(method == 'success') {
                this.statusSearch =  true;
            }
        }, 1500);
    }

    showModal(): void {
        let eventNoti: any = {
            id: '',
            message: 'success',
            title: 'Tìm kiếm Thành công'
        }
        if(this.certificateCode == null || this.certificateCode == ''){
            eventNoti.message = 'error';
            eventNoti.title = 'Bạn phải nhập Certificate No';
            return this.notification(eventNoti);
        }
        this.isVisible = true;
      }

      handleOk(){
        if(this.passwordQrcode == null || this.passwordQrcode == ''){
            this.showValid1 = true;
            setTimeout(() => {
                this.showValid1 = false;
            }, 3000);
            return;
        }
        this.searchCertificate();
        this.isVisible = false;
      }
    
      handleCancel(): void {
        this.passwordQrcode= '';
        this.isVisible = false;
      }
}