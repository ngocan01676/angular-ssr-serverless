import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component'; 
const routes: Routes = [  
 { path: '', component: HomeComponent },
 { path: 'home', component: HomeComponent },
 { path: 'contact', component: ContactUsComponent },  
 { path: '**', redirectTo: 'home' }
];
@NgModule({
 imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
 exports: [RouterModule]
})
export class AppRoutingModule {}