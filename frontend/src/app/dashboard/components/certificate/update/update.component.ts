import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {adminService} from '../../../services/admin.service';
import {CertificateModel} from "../../../models/certificate.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'admin-certificate-modal-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})

export class AdminCertificateModalUpdate implements OnInit, AfterViewInit {
    @Input() checkVisibleUpdate: boolean = false;
    @Input() dataCertificate: any = undefined;
    @Output() checkVisibleUpdateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    listVlan: any = undefined;
    listServer: any = undefined;
    loadingState: boolean = false;

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

    updateForm: FormGroup;
    date: any = {
        fstIssueDate: null,
        lstIssueDate: null,
        expiryDate: null
    }


    
    ngOnInit(): void {
        this.updateForm = this.formBuilder.group({
            inforCode: ["", [Validators.required]],
            cerCode: ["", [Validators.required]],
            licenseCode: ["", [Validators.required]],
            name: ["", [Validators.required]],
            address: ["", [Validators.required]],
            website: [""],
            status: [1, [Validators.required]],
            fstIssueDate: [null, [Validators.required]],
            lstIssueDate: [null, [Validators.required]],
            expiryDate: [null, [Validators.required]],
            standard: [""],
            scope: [""],
            quantity: [""],
            hectares: [""],
            show: [0, [Validators.required]]
        })
    }
    ngAfterViewInit(): void {
    }

    constructor(public productService: adminService,
                private formBuilder: FormBuilder,
                ) {
    }

    handleOk(): void {
        this.updateHosting();
    }
    
    handleCancel(): void {
        this.checkVisibleUpdate = false;
        this.checkVisibleUpdateChange.emit(this.checkVisibleUpdate);
    }

    loadingOk():void {
    }

    get f() {
        return this.updateForm.controls;
    }

    showContent() {
        this.f['inforCode'].setValue(this.dataCertificate.informationCode);
        this.f['cerCode'].setValue(this.dataCertificate.certificateCode);
        this.f['licenseCode'].setValue(this.dataCertificate.licenseCode);
        this.f['name'].setValue(this.dataCertificate.name);
        this.f['address'].setValue(this.dataCertificate.address);
        this.f['website'].setValue(this.dataCertificate.website);
        this.f['status'].setValue(String(this.dataCertificate.status));
        this.f['fstIssueDate'].setValue(new Date(this.dataCertificate.fstIssueDate));
        this.f['lstIssueDate'].setValue(new Date(this.dataCertificate.lstIssueDate));
        this.f['expiryDate'].setValue(new Date(this.dataCertificate.expiryDate));
        this.f['standard'].setValue(this.dataCertificate.standard);
        this.f['scope'].setValue(this.dataCertificate.scope);
        this.f['quantity'].setValue(this.dataCertificate.quantity);
        this.f['hectares'].setValue(this.dataCertificate.hectares);
        this.f['show'].setValue(String(this.dataCertificate.show));
    }

    updateHosting() {
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
            status: Number(this.f['status'].value),
            fstIssueDate: this.date.fstIssueDate,
            lstIssueDate: this.date.lstIssueDate,
            expiryDate: this.date.expiryDate,
            standard: this.f['standard'].value,
            scope: this.f['scope'].value,
            quantity: this.f['quantity'].value,
            hectares: this.f['hectares'].value,
            show: Number(this.f['show'].value)
        }


        this.productService.updateCertificate(body, this.dataCertificate.id).subscribe((response: any) => {
            this.loadingState = false;
            let eventNoti: any = {
                id: null,
                message: 'success',
                title: 'Cập nhật Thành công'
            }

            if(response.code == 200 && response.status == 1){
                eventNoti.id = response.data.CERTIFICATE_CODE;
            }

            else if (response.code == 201 && response.status == 0){
                eventNoti.message = 'warning';
                eventNoti.title =  'Certificate không tồn tại'
            }

            else {
                eventNoti.message = 'error';
                eventNoti.title =  'Cập nhật thất bại'
            }

            this.checkVisibleUpdateChange.emit(eventNoti);
            this.checkVisibleUpdate = false;
        })
    }
}