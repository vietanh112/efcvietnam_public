import {Component, OnInit, AfterViewInit, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { adminService } from '../../services/admin.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import { fromEvent, Observable, Subscription } from "rxjs";



@Component({
    selector: 'app-admin-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss']
})

export class AdminCertificate implements OnInit, AfterViewInit {
    
    @Input() checkVisibleInfor: boolean = false;
    @Input() checkVisibleCreate: boolean = false;
    @Input() checkVisibleUpdate: boolean = false;
    @Input() checkVisibleQrcode: boolean = false;
    @Input() checkVisibleExport: boolean = false;
    @Input() certificate: any = undefined;
    confirmModalDelete?: NzModalRef;
    searchValue = '';
    visible = false;
    sizeButton: NzButtonSize = 'large';
    listCertificate: any = [];
    totalList: number = 0;
    data: any = undefined;
    search: any = {
        keyword: null,
        status: null
    };
    loadingState:boolean = false;
    
    page: number = 1;
    limit: number = 10;
    currentUser: any = undefined;

    status: any = [
        {
            id: '0',
            name: 'Invalid'
        },
        {
            id: '1',
            name: 'Valid'
        }
    ]

    routeParams: any = {
        keyword: null,
        status: null
    };

    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;

    reponsive: any = {
        name: true,
        status: true,
        searchStatus: true,
        search: true,
        create: true,
        labelSearch: true
    }

  constructor(
    public productService: adminService,
    private modal: NzModalService,
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService){
        this.activatedRoute.queryParams.subscribe(params => {
            this.routeParams = params;
            if (typeof (params['keyword']) !== 'undefined') {
                this.search.keyword = decodeURIComponent(params['keyword']);
            }
            if (typeof (params['status']) !== 'undefined') {
                this.search.status = params['status'];
            }
        })
    }

    ngOnInit(): void {
        this.getCurrentUser();
        
        this.responsive(window.innerWidth)
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            //@ts-ignore
            this.responsive(evt.currentTarget.innerWidth);
        })
    }

    responsive(width: number) {
        if(width < 767 ) {
            this.reponsive.name = false;
            this.reponsive.searchStatus = false;
            this.reponsive.search = false;
            this.sizeButton = 'default';
        }
        else{
            this.reponsive.name = true;
            this.reponsive.searchStatus = true;
            this.reponsive.search = true;
            this.sizeButton = 'large';
        }

        if(width < 485 ) {
            this.reponsive.status = false;
            this.reponsive.create= false;
        }
        else {
            this.reponsive.status = true;
            this.reponsive.create= true;
        }

        if(width < 380 ) {
            this.reponsive.labelSearch = false;
        }
        else {
            this.reponsive.labelSearch = true;
        }
    }

    ngAfterViewInit(): void {
        let queries = {}
        setTimeout(() => {
            this.getList();
        }, 0);
    }

    getCurrentUser () {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    showModalInfor(data: any) {
        this.checkVisibleInfor = true;
        this.certificate = data;
    }

    showModalCreate() {
        this.checkVisibleCreate = true;
    }

    showModalUpdate(data: any) {
        this.checkVisibleUpdate = true;
        this.certificate = data;
    }

    showModalQrcode(data: any) {
        this.checkVisibleQrcode = true;
        this.certificate = data;
    }

    exportModalCreate() {
        this.checkVisibleExport = true;
    }

    getList() {
        this.loadingState = true;
        let queries: any = {
        }
        if(this.search.keyword) {
            queries['keyword'] = this.search.keyword;
        }

        if(this.search.status) {
            queries['status'] = this.search.status;
        }

        this.productService.getCertificate(queries).subscribe(res => {
            this.loadingState = false;
            this.listCertificate = res.list;
            this.totalList = res.total;
        })
        
        
        const params = [];
        for (const i in queries) {
            if (queries[i] !== "") {
                params.push(i + '=' + queries[i]);
            }
        }
        this.location.replaceState(this.router.url.split('?')[0], params.join('&'));
    }
    showConfirmDelete(cerId: any) {
        this.confirmModalDelete = this.modal.confirm({
            nzTitle: 'Bạn có muốn xóa Certificate không?',
            nzContent: 'Khi bạn nhấn đồng ý sẽ xóa Certificate khỏi danh sách',
            nzOkDanger: true,
            nzOnOk: () => {
                this.deleteItem(cerId);
            }
          });
    }
    deleteItem (cerId: any) {
        this.productService.deleteCertificate(cerId).subscribe((res: any) => {
            let eventNoti: any = {
                id: '',
                message: 'success',
                title: 'Xóa Thành công'
            }
    
            if(res.code != 200 && res.status != 1) {
                eventNoti.message = 'error';
                eventNoti.title = 'Xóa Thất bại';
            }
            return this.notification(eventNoti);
        })
    }
    showNotification(res: any) {
        this.notification(res);
    }
    createHosting(res: any){
        this.checkVisibleCreate = false;
        let eventNoti: any = {
            id: '',
            message: 'success',
            title: 'Tạo mới Thành công'
        }
        if(res.code != 200 && res.status != 1) {
            eventNoti.message = 'error';
            eventNoti.title = 'Tạo mới Thất bại';
        }
        return this.notification(eventNoti);
    }
    
    notification(event: any) {
        let method = event.message;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.title}`,
            nzContent: `${event.title} <b> ${event.id}</b>`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
            if(method == 'success') {
                this.getList();
            }
        }, 2000);
    }

    pageChange(event: any) {
        this.limit = event;
        this.getList();
    }

    updateCertificate(res: any){
        this.checkVisibleUpdate = false;
        if(res) {
            this.showNotification(res);
        }
    }

    createCertificate(res: any) {
        this.checkVisibleCreate = false;
        if(res == false) return;
        let eventNoti: any = {
            id: null,
            message: 'success',
            title: 'Tạo mới Thành công'
        }

        if(res.code == 200 && res.status == 1) {
            eventNoti.id = res.data.CERTIFICATE_CODE;
            return this.notification(eventNoti);
        }
        else if (res.code == 201 && res.status == 0) {
            eventNoti.message = 'warning';
            eventNoti.title = 'Certificate Code đã tồn tại';
            return this.notification(eventNoti);
        }
        else {
            eventNoti.message = 'error';
            eventNoti.title = 'Tạo mới Thất bại';
            return this.notification(eventNoti);
        }
    }
}