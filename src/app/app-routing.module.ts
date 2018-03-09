import { PropertiesComponent } from './components/properties/properties.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { BlockCycleComponent } from './components/block-cycle/block-cycle.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  
  {
    path: 'blockcycle',
    data: {
      title: 'Block Cycle',
      urls: [{ title: 'Dashboard', url: '/' }, { title: 'Block Cycle' }]
    }, component: BlockCycleComponent
  },
  {
    path: 'blocks',
    data: {
      title: 'Blocks',
      urls: [{ title: 'Dashboard' }, { title: 'Blocks' }]
    }, component: BlocksComponent
  },
  {
    path: 'properties',
    data: {
      title: 'Properties',
      urls: [{ title: 'Properties' }, { title: 'Properties' }]
    }, component: PropertiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }