import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { ListingService } from './listing/listing.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedImportsModule } from '../shared-imports/shared-imports.module';
import { HttpErrorHandler } from '../common/services/http-error-handler/http-error-handler.service';
import { MessageService } from '../common/services/message/message.service';

@NgModule({
  declarations: [
    HomeComponent,
    ListingComponent,
    DashboardComponent,
    NavigationComponent,
  ],
  imports: [SharedImportsModule, CommonModule],
  providers: [ListingService, HttpErrorHandler, MessageService],
  exports: [
    HomeComponent,
    ListingComponent,
    DashboardComponent,
    NavigationComponent,
  ],
})
export class SharedUIModule {}
