import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {adminService} from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'admin-certificate-modal-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss']
})



export class AdminCertificateModalExport implements OnInit, AfterViewInit {
    @Input() checkVisibleExport: boolean = false;
    @Output() checkVisibleExportChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    loadingState: boolean = false;
    createForm: FormGroup;
    listCertificate: any = [];
    totalList: number = 0;

    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';

    checked = false;

    listOfCurrentPageData: readonly any[] = [];
    setOfCheckedId = new Set<number>();
    indeterminate = false;

    fileName: string ='Export Certificate';

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
    preInforExport: any = [];
    inforExport: any = []

    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public productService: adminService,
                private modal: NzModalService,) {
        
    }
    
    handleOk():void {
        this.exportCertificate();
    }
 
    handleCancel(): void {
        this.unSelectedAll();
        this.checkVisibleExport = false;
        this.checkVisibleExportChange.emit(false);
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


    loadingOk() {
        this.listOfCurrentPageData = [];
        this.getList();
    }

    handlePreExport (type: string) {
        this.inforExport = [];
        this.preInforExport = [];
        if(type == 'all') {
            this.preInforExport = this.listCertificate;
        } else if (type == 'select') {
            this.setOfCheckedId.forEach((i: any) => {
                this.preInforExport.push(this.listCertificate[i-1]);
            })
            
        }
        
        this.preInforExport.forEach(async(cer: any) => {
            let json: any = {};

            json["Id"] = cer["id"];
            json["Certificate Code"] = cer["certificateCode"];
            json["License Code"] = cer["licenseCode"];
            json["Information Code"] = cer["informationCode"];
            json["Name"] = cer["name"];
            json["Address"] = cer["address"];
            json["Hectares"] = cer["hectares"];
            json["Scope"] = cer["scope"];
            json["Standard"] = cer["standard"];
            json["Website"] = cer["website"];
            json["Quantity"] = cer["quantity"];
            json["Password Qrcode"] = cer["passwordQrcode"];
            json["Show"] = cer["show"];
            json["Status"] = cer["status"];
            json["First Issue Date"] = cer["fstIssueDate"];
            json["Last Issue Date"] = cer["lstIssueDate"];
            json["Expiry Date"] = cer["expiryDate"];
            json["Created At"] = cer["createdAt"];
            json["Updated At"] = cer["updatedAt"];

            if(json["Status"] == 1) {
                json["Status"] = 'Valid';
            }
            else {
                json["Status"] = 'Invalid';
            };

            if(json["Show"] == 1) {
                json["Show"] = 'Show';
            }
            else {
                json["Show"] = 'Hide';
            }
            
            this.inforExport.push(json);
        });
    }

    exportAllCertificate() {
        this.handlePreExport('all');
        this.exportexcel();
    }

    exportCertificate () {
        this.handlePreExport('select');
        this.exportexcel();
    }

    getList() {
        this.loadingState = true;
        
        this.productService.getAllCertificate().subscribe(res => {
            this.loadingState = false;
            this.listCertificate = res.list;
            this.preInforExport = this.listCertificate;
            this.totalList = res.total;
        })
        
    }

    onItemChecked(id: number, checked: boolean): void {
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
        this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
        this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }

    onAllChecked(checked: boolean): void {
        this.listOfCurrentPageData.forEach(({ id }) => this.updateCheckedSet(id, checked));
        this.refreshCheckedStatus();
    }

    onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
        this.listOfCurrentPageData = listOfCurrentPageData;
        this.refreshCheckedStatus();
    }
    
    exportexcel(): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.inforExport);
        const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        this.saveExcelFile(excelBuffer, this.fileName);
    }

    private saveExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: this.fileType});
        FileSaver.saveAs(data, fileName + this.fileExtension);
    }

    unSelectedAll() {
        this.setOfCheckedId = new Set<number>();
    }
}