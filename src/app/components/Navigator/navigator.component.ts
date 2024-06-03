import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'navigator',
    standalone: true,
    imports: [
      CommonModule,
      NzMenuModule,
      RouterModule
    ],
    templateUrl: './navigator.component.html'
})
export class Navigator {}