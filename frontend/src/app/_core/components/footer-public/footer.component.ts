import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {environment} from "../../../../environments/environment";
import { fromEvent, Observable, Subscription } from "rxjs";


@Component({
    selector: 'app-footer-public',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class PublicComponentFooter implements OnInit, AfterViewInit {
    url: string = `http://${environment.frontEnd.host}/information`;
    col: number = 6;

    resizeObservable$: Observable<Event>;
    resizeSubscription$: Subscription;

    ngOnInit(): void {
        if(environment.frontEnd.ssl) {
            this.url = `https://${environment.frontEnd.host}/information`;
        }
        else {
            this.url = `http://${environment.frontEnd.host}/information`;
        }

        this.responsive(window.innerWidth)
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
            //@ts-ignore
            this.responsive(evt.currentTarget.innerWidth);
        })
    }
    ngAfterViewInit(): void {
        
    }

    responsive(width: number) {
        if(width < 950) {
            this.col = 24;
        }
        else {
            this.col = 6;
        }
    }
}