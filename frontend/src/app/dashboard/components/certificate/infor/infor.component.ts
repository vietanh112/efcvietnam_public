import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {adminService} from '../../../services/admin.service';
import {CertificateModel} from "../../../models/certificate.model";
import { fromEvent, Observable, Subscription } from "rxjs";


@Component({
    selector: 'admin-certificate-modal-infor',
    templateUrl: './infor.component.html',
    styleUrls: ['./infor.component.scss']
})

export class AdminCertificateModalInfor implements OnInit, AfterViewInit {
    @Input() checkVisibleInfor: boolean = false;
    @Input() dataCertificate: any = undefined;
    @Output() checkVisibleInforChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    sizeTable: any = 'middle';
    widthModal: any = '550px';

    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;


    ngOnInit(): void {
        this.responsive(window.innerWidth)
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            //@ts-ignore
            this.responsive(evt.currentTarget.innerWidth);
        })
    }
    ngAfterViewInit(): void {
        
        
    }
    constructor(public productService: adminService,
            ){}

    responsive(width: any) {
        if(width < 767 ) {
            this.widthModal = '420px';
        }
        else if (width < 600) {
            this.sizeTable = 'small';
        }
        else if (width < 414) {
            this.widthModal = '350px';
        }
        else {
            this.sizeTable = 'default';
            this.widthModal = '550px';
        }
    }

    handleOk(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }
    
    handleCancel(): void {
        this.checkVisibleInfor = false;
        this.checkVisibleInforChange.emit(this.checkVisibleInfor);
    }

    loadingOk():void {
        console.log(this.dataCertificate);
    }
}