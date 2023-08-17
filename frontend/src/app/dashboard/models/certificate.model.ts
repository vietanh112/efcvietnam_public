
export class CertificateModel {
    id: string = '';
    informationCode: string = '';
    certificateCode: string = '';
    licenseCode: string = '';
    name: string = '';
    address: string = '';
    website: string = '';
    status: number = 0;
    fstIssueDate: string = '';
    lstIssueDate: string = '';
    expiryDate: string = '';
    standard: string = '';
    scope: string = '';
    quantity: string = '';
    hectares: string = '';
    show: number = 0;
    passwordQrcode: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    

    constructor(data: any) {
        this.id = String(data.id) ?? '';
        this.informationCode = data.informationCode ?? '';
        this.certificateCode = data.certificateCode ?? '';
        this.licenseCode = data.licenseCode ?? '';
        this.name = data.name ?? '';
        this.address = data.address ?? '';
        this.website = data.website ?? '';
        this.status = data.status ?? 0;
        this.fstIssueDate = data.fstIssueDate ?? '';
        this.lstIssueDate = data.lstIssueDate ?? '';
        this.expiryDate = data.expiryDate ?? '';
        this.standard = data.standard || '';
        this.scope = data.scope || '';
        this.quantity = data.quantity ?? '';
        this.hectares = data.hectares ?? '';
        this.show = data.show ?? 0;
        this.passwordQrcode = data.passwordQrcode ?? null;
        this.createdAt = data.createdAt ?? '';
        this.updatedAt = data.updatedAt ?? '';
    }
}
