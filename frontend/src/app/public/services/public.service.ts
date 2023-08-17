import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {ApiService} from '../../_core/services/api.service';
import {CertificateModel} from '../models/certificate.model';

declare const commons: any;
@Injectable({
    providedIn: 'root'
})

export class publicService {
    protected apiServerPaths = environment.apiServer.paths;

    constructor(
        private http: HttpClient,
        private apiService: ApiService
        ) {}

        

        getCertificateCode(certificateCode: any) {
            let options: any = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            let path = this.apiServerPaths.public.getCertificateCode;
            path = path.replace('{CERTIFICATE_CODE}', String(certificateCode));
            
            return this.apiService.get(path, options, map((response: any) => {
                if(response.code == 200 && response.status == 1) {
                    response.data = new CertificateModel(response.data)
                }
                return response
            }));
        }

        searchCertificate(certificateCode: any, passwordQrcode: any) {
            let options: any = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            let path = this.apiServerPaths.public.searchCertificateCode;
            path = path.replace('{CERTIFICATE_CODE}', String(certificateCode));
            path = path.replace('{PASSWORD_QRCODE}', String(passwordQrcode));
            
            return this.apiService.get(path, options, map((response: any) => {
                if(response.code == 200 && response.status == 1) {
                    response.data = new CertificateModel(response.data)
                }
                return response
            }));
        }
}