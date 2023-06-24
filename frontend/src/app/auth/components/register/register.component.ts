import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../_core/services/authentication.service';
import {first} from "rxjs/operators";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class AuthComponentRegister implements OnInit, AfterViewInit {
    registerForm: FormGroup;
    loadingState:boolean = false;
    returnUrl: string;
    currentUser: any = undefined;
    listRole: any = [
        {id: '1', name: 'SuperAdmin'},
        {id: '2', name: 'Admin'},
        {id: '3', name: 'User'},
    ];

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private modal: NzModalService,
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern('[a-z0-9](\.?[a-z0-9]){3,}@[a-zA-Z0-9.]{2,30}')]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
            password: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]],
            confirmPassword: ["", [Validators.required, Validators.pattern('[A-Za-z0-9!@#$%^&*()-_+=]{4,20}')]],
            role: ['3', [Validators.required]]
        })
    }
    ngAfterViewInit(): void {
        this.getCurrentUser();
        
        if(this.currentUser.roleId != 1) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['auth', 'login']);
        } 
    }

    get f() {
        return this.registerForm.controls;
    }

    getCurrentUser () {
        if(localStorage.getItem('currentUser')){
            this.currentUser = this.authenticationService.currentUserValue;
        }
    }

    submitForm(): void {
        this.loadingState = true;
        let noti: any = {
            message: 'Success',
            method: 'success',
            data: '',
            time: 1500
        }

        let body = {
            email: this.f['email'].value,
            username: this.f['username'].value,
            password: this.f['password'].value,
            role: this.f['role'].value
        }

        if(this.f['password'].value != this.f['confirmPassword'].value) {
            noti.method = 'warning';
            noti.message = 'Error';
            noti.data = 'Password and Confirm password not match';
            this.f['password'].reset();
            this.f['confirmPassword'].reset();
            this.loadingState = false;
            return this.notification(noti);
        }

        this.authenticationService.register(body).pipe(first()).subscribe(res => {
            this.loadingState = false;
            
            if(res.code == 201) {
                noti.message = 'Error';
                noti.method = 'warning';
                noti.data = res.message;
            }
            else if (res.code != 200) {
                noti.message = 'Error';
                noti.method = 'error';
                noti.data = res.message;
            }
            else {
                noti.data = res.data;
                this.registerForm.reset();
            }
            this.f['password'].reset();
            this.f['confirmPassword'].reset();
            return this.notification(noti);
        })
    }


    notification(event: any) {
        let method = event.method;
        // @ts-ignore
        this.modal[method]({
            nzWidth:350,
            nzOkText: null,
            nzTitle: `${event.message} Register`,
            nzContent: `${event.data}`,
            nzStyle: { position: 'absolute', bottom: `0px`, right: `20px`, top: 'auto' }
        })
        setTimeout(() => {
            this.modal.closeAll();
        }, event.time);
    }

    checkFormValid(){
        return !this.registerForm.valid;
    }
}