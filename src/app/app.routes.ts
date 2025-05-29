import { Routes } from '@angular/router';
import { StripeGenerator } from './stripe-generator/stripe-generator';

export const routes: Routes = [
    {
        path: '',
        component: StripeGenerator
    },
    {
        path: 'stripe-generator',
        component: StripeGenerator
    }
];
