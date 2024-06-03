import { Component } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'footer-content',
    standalone: true,
    imports: [
        NzIconModule
    ],
    templateUrl: './FooterContent.component.html',
    styleUrl: './FooterContent.component.css'
})
export class FooterContent { }