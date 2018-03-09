import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlockCycleComponent } from './components/block-cycle/block-cycle.component';
import { AddBlockCycleComponent } from './components/add-block-cycle/add-block-cycle.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { SearchPipe } from './pipes/search.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    RightSidebarComponent,
    BlockCycleComponent,
    AddBlockCycleComponent,
    BlocksComponent,
    PropertiesComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
    //HttpClientModule
    //RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
