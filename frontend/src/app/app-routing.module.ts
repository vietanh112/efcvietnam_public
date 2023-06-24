import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {environment} from "../environments/environment";
import {AdminComponentLayout} from "../app/_core/components/layout/layout.component";
import {CustomPreloadingStrategy} from './custom-preloading';
import {PublicComponentLayout} from './_core/components/layout-public/layout.component';


const routes: Routes = [
    //auth
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        data: { preload: true }
    },
    //admin
    {
        path: 'admin',
        component: AdminComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/admin.module').then(m => m.AdminModule),
                data: { preload: true }
            }
        ]
    },
    //public
    {
        path: '',
        component: PublicComponentLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
                data: { preload: true }
            }
        ]
    },
    // auth-manage
    // {
    //     path: 'auth',
    //     component: AuthComponentLayout,
    //     children: [
    //         {
    //             path: '',
    //             loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    //             data: { preload: true }
    //         }
    //     ]
    // },
    
    /**
     * Page 404
     */

     { path: '**', redirectTo: 'information' }
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        preloadingStrategy: CustomPreloadingStrategy,
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule],
    providers: [CustomPreloadingStrategy]
  })

export class AppRoutingModule {
}
