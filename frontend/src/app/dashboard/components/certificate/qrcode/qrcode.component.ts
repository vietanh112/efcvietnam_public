import {Component, OnInit, AfterViewInit,Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import { adminService } from '../../../services/admin.service';



@Component({
    selector: 'admin-certificate-modal-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: ['./qrcode.component.scss']
})

export class AdminCertificateModalQrcode implements OnInit, AfterViewInit {
    @Input() checkVisibleQrcode: boolean = false;
    @Input() certificate: any = null;
    @Output() checkVisibleQrcodeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('qrcode') parent: ElementRef;

    protected apiServerPaths = environment.apiServer.paths;

    url: string = `http://${environment.frontEnd.host}/information?id=`;
    passwordQrcode: string = '';
    checkCopy: boolean = false;
    checkCopy2: boolean = false;
    checkReset: boolean = false;

    constructor(public productService: adminService,) {}
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
        
    }

    handleCancel(): void {
        this.checkVisibleQrcode = false;
        this.checkVisibleQrcodeChange.emit(this.checkVisibleQrcode);
    }

    afterModalOpen():void {
      if(environment.frontEnd.ssl) {
        this.url = `https://${environment.frontEnd.host}/information?id=`;
      }
      else {
        this.url = `http://${environment.frontEnd.host}/information?id=`;
      }
      this.url = this.url + this.certificate.certificateCode;
      this.passwordQrcode = this.certificate.passwordQrcode;
      
    }

    saveAsImage() {
        // fetches base 64 date from image
        //@ts-ignore
        const parentElement = this.parent.qrcElement.nativeElement.querySelector("canvas").toDataURL("image/png");

        // converts base 64 encoded image to blobData
        let blobData = this.convertBase64ToBlob(parentElement);
    
        const blob = new Blob([blobData], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Qrcode-${this.certificate.certificateCode}`;
        link.click();
      }

      resetPasswordQrcode() {
        this.checkReset = true;
        this.productService.resetPasswordQrcode(this.certificate.certificateCode).subscribe((res: any) => {
          if(res.status == 1 && res.code == 200) {
            this.passwordQrcode = res.data
          }
          this.checkReset = false;
        })
      }
    
      private convertBase64ToBlob(Base64Image: any) {
        // SPLIT INTO TWO PARTS
        const parts = Base64Image.split(';base64,');
        // HOLD THE CONTENT TYPE
        const imageType = parts[0].split(':')[1];
        // DECODE BASE64 STRING
        const decodedData = window.atob(parts[1]);
        // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
        const uInt8Array = new Uint8Array(decodedData.length);
        // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
        for (let i = 0; i < decodedData.length; ++i) {
          uInt8Array[i] = decodedData.charCodeAt(i);
        }
        // RETURN BLOB IMAGE AFTER CONVERSION
        return new Blob([uInt8Array], { type: imageType });
      }

      copyUrl(): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.url;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.checkCopy = true;
        setTimeout(() => {
          this.checkCopy = false;
        }, 2000);
      }

      copyUrl2(): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.passwordQrcode;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.checkCopy2 = true;
        setTimeout(() => {
          this.checkCopy2 = false;
        }, 2000);
      }
}