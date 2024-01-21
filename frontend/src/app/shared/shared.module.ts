import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSharedModule } from './nz-shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NzSharedModule],
  exports: [CommonModule, NzSharedModule],
})
export class SharedModule {}
