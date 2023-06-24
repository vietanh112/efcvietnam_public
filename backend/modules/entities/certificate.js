
class CertificateModel {
    id = null;
    informationCode = null;
    certificateCode = null;
    licenseCode = null;
    name = null;
    address = null;
    website = null;
    status = 0;
    fstIssueDate = null;
    lstIssueDate = null;
    expiryDate = null;
    standard = null;
    scope = null;
    quantity = null;
    hectares = null;
    show = 0;
    createdAt = null;
    updatedAt = null;
    

    constructor(data) {
        this.id = String(data.ID) ?? null;
        this.informationCode = data.INFORMATION_CODE ?? null;
        this.certificateCode = data.CERTIFICATE_CODE ?? null;
        this.licenseCode = data.LICENSE_CODE ?? null;
        this.name = data.NAME ?? null;
        this.address = data.ADDRESS ?? null;
        this.website = data.WEBSITE ?? null;
        this.status = data.STATUS ?? 0;
        this.fstIssueDate = data.FST_ISSUE_DATE ?? null;
        this.lstIssueDate = data.LST_ISSUE_DATE ?? null;
        this.expiryDate = data.EXPIRY_DATE ?? null;
        this.standard = data.STANDARD || null;
        this.scope = data.SCOPE || null;
        this.quantity = data.QUANTITY ?? null;
        this.hectares = data.HECTARES ?? null;
        this.show = data.SHOW ?? null;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
    }
}

module.exports = CertificateModel;