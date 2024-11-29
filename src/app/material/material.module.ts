import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  exports:[MatSidenavModule,
           MatListModule,
           MatIconModule ,
           MatToolbarModule,
           MatButtonModule,
           MatTableModule,
           MatFormFieldModule,
           MatSelectModule,
           MatPaginatorModule,
           MatInputModule,
           MatDialogModule
           


          
            
  ]
})
export class MaterialModule { }
