import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-auth-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class AuthComponentChangePassword implements OnInit, AfterViewInit {
    @Input() checkVisibleChangePassword: boolean = false;
    @Input() idUpdate: string = null;
    @Output() checkVisibleChangePasswordChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    changePasswordForm: FormGroup;
    confirmPassword: boolean = true;
    passwordCheck: boolean = true;
    
    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]],
            newPassword: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]],
            confirmNewPassword: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]]
        })
    }
    ngAfterViewInit(): void {
    }

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder,
        
    ) {
        
    }

    handleCancel(): void {
        this.changePasswordForm.reset();
        this.checkVisibleChangePassword = false;
        this.checkVisibleChangePasswordChange.emit(false);
    }

    loadingOk():void {
        
    }

    get f() {
        return this.changePasswordForm.controls;
    }

    checkFormValid(){
        return !this.changePasswordForm.valid;
    }

    changePassword() {
        this.passwordCheck = true;
        
        if(!this.checkFormValid) {
            return
        }

        if(this.f['newPassword'].value != this.f['confirmNewPassword'].value) {
            this.confirmPassword = false;
        }
        else this.confirmPassword = true;

        let body = {
            id: this.idUpdate,
            oldPassword: this.f['oldPassword'].value,
            newPassword: this.f['newPassword'].value
        }


        this.authenticationService.changePassword(body).subscribe((res: any) => {
            let eventNoti: any = {
                id: '',
                method: 'success',
                title: 'Thành công',
                message: 'Cập nhật Thành công'
            }

            if(res.code == 202 && res.status == 0) {
                this.changePasswordForm.reset();
                this.passwordCheck = false;
                return
            }
            else if(res.code != 200 && res.status == 0) {
                eventNoti.method = 'error';
                eventNoti.title = 'Lỗi';
                eventNoti.message = res.message ?? "Error";
                this.passwordCheck = true;
            }
            else {
                this.passwordCheck = true;
            }
            this.changePasswordForm.reset();
            this.checkVisibleChangePasswordChange.emit(eventNoti);
            this.checkVisibleChangePassword = false;
        })
    }
}