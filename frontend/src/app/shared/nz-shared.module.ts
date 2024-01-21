import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [],
  imports: [NzButtonModule, NzInputModule, NzIconModule],
  exports: [NzButtonModule, NzInputModule, NzIconModule],
})
export class NzSharedModule {}
