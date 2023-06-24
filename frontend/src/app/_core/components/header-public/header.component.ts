import {Component, OnInit, AfterViewInit,Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthenticationService} from '../../services/authentication.service';


@Component({
    selector: 'app-header-public',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class PublicComponentHeader implements OnInit, AfterViewInit {
    data: any;
    currentUser: any = undefined;

    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        
    }
    constructor(public router: Router, private authenticationService: AuthenticationService){

    }

  


}