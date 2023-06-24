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

export class adminService {
    protected apiServerPaths = environment.apiServer.paths;

    constructor(
        private http: HttpClient,
        private apiService: ApiService
        ) {}

        createCertificate(body: any) {
            let options: any = {
                body,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            let path = this.apiServerPaths.qrCode.createCertificate;
            return this.apiService.post(path, options, map((response: any) => {
                return response
            }));
        }

        getCertificate(queries: any) {
            let options: any = {
                params: {},
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            // tslint:disable-next-line:forin
            for (const i in queries) {
                options['params'][i] = queries[i];
            }
            return this.apiService.get(this.apiServerPaths.qrCode.getCertificate, options, map((response: any) => {
                    let rs: any = {
                        total: 0,
                        list: []
                    }
                    if(response.status == 1 && response.code == 200) {
                        if(response.data.certificate) {
                            response.data.certificate.forEach((item: any) => {
                                rs.list.push(new CertificateModel(item));
                            });
                        }
                        rs.total = response.data.total;
                    }
                    return rs;
                })
            )  
        }

        deleteCertificate(cerId: any) {
            let options: any = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            let path = this.apiServerPaths.qrCode.deleteCertificate;
            path = path.replace('{CERTIFICATE_ID}', String(cerId));
            return this.apiService.delete(path, options, map((response: any) => {
                return response;
            }));
        }

        updateCertificate(body: any, certificateId: any) {
            let options: any = {
                body,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };
            let path = this.apiServerPaths.qrCode.updateCertificate;
            path = path.replace('{CERTIFICATE_ID}', String(certificateId));
            return this.apiService.patch(path, options, map((response: any) => {
                return response
            }));
        }
}