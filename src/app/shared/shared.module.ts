import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CardHoverDirective],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, 
    MatListModule,
    MatTooltipModule,
    MatInputModule
  ],
  exports:[CardHoverDirective,MatIconModule,MatCardModule,MatButtonModule,MatListModule,MatTooltipModule,MatInputModule]
})
export class SharedModule { }
