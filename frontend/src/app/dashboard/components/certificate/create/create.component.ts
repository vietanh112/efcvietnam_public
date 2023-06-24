import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {adminService} from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'admin-certificate-modal-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})

export class AdminCertificateModalCreate implements OnInit, AfterViewInit {
    @Input() checkVisibleCreate: boolean = false;
    @Output() checkVisibleCreateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    loadingState: boolean = false;
    createForm: FormGroup;

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

    show: any = [
        {
            id: '0',
            name: 'Inactive'
        },
        {
            id: '1',
            name: 'Active'
        }
    ]

    widthModal: any = '550px';

    date: any = {
        fstIssueDate: null,
        lstIssueDate: null,
        expiryDate: null
    }

    ngOnInit(): void {
        this.createForm = this.formBuilder.group({
            inforCode: ["", [Validators.required]],
            cerCode: ["", [Validators.required]],
            licenseCode: ["", [Validators.required]],
            name: ["", [Validators.required]],
            address: ["", [Validators.required]],
            website: [""],
            status: ['1', [Validators.required]],
            fstIssueDate: [null, [Validators.required]],
            lstIssueDate: [null, [Validators.required]],
            expiryDate: [null, [Validators.required]],
            standard: [""],
            scope: [""],
            quantity: [""],
            hectares: [""],
            show: ['0', [Validators.required]],
        })
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: adminService,
                private modal: NzModalService,
                private formBuilder: FormBuilder,) {
        
    }
    
    handleOk():void {
        this.createCertificate();
    }
 
    handleCancel(): void {
        this.checkVisibleCreate = false;
        this.checkVisibleCreateChange.emit(false);
    }

    responsive(width: any) {
        if(width < 767 ) {
            this.widthModal = '420px';
        }
        else if (width < 414) {
            this.widthModal = '350px';
        }
        else {
            this.widthModal = '550px';
        }
    }

    get f() {
        return this.createForm.controls;
    }
    
    checkFormValid(){
        return !this.createForm.valid;
    }

    createCertificate() {
        this.loadingState = true;

        if(this.f['fstIssueDate'].value) {
            let timestamp = Date.parse(this.f['fstIssueDate'].value);
            this.date.fstIssueDate = new Date(timestamp).toLocaleDateString("en-US");
            // this.f['fstIssueDate'].setValue(new Date(timestamp).toLocaleDateString("en-US"));
        }
        if(this.f['lstIssueDate'].value) {
            let timestamp = Date.parse(this.f['lstIssueDate'].value);
            this.date.lstIssueDate = new Date(timestamp).toLocaleDateString("en-US");
            // this.f['lstIssueDate'].setValue(new Date(timestamp).toLocaleDateString("en-US"));
        }
        if(this.f['expiryDate'].value) {
            let timestamp = Date.parse(this.f['expiryDate'].value);
            this.date.expiryDate = new Date(timestamp).toLocaleDateString("en-US");
            // this.f['expiryDate'].setValue(new Date(timestamp).toLocaleDateString("en-US"));
        }

        let body = {
            inforCode: this.f['inforCode'].value,
            cerCode: this.f['cerCode'].value,
            licenseCode: this.f['licenseCode'].value,
            name: this.f['name'].value,
            address: this.f['address'].value,
            website: this.f['website'].value,
            status: this.f['status'].value,
            fstIssueDate: this.date.fstIssueDate,
            lstIssueDate: this.date.lstIssueDate,
            expiryDate: this.date.expiryDate,
            standard: this.f['standard'].value,
            scope: this.f['scope'].value,
            quantity: this.f['quantity'].value,
            hectares: this.f['hectares'].value,
            show: this.f['show'].value
        }
        

        this.productService.createCertificate(body).subscribe((res: any) => {
            this.checkVisibleCreateChange.emit(res);
            this.checkVisibleCreate = false;
            return 
        })
    }

    

    loadingOk() {
        let queries = {}
    }
    
}