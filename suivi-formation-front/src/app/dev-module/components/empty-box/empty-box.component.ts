import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-empty-box',
  templateUrl: './empty-box.component.html',
  styleUrls: ['./empty-box.component.scss']
})
export class EmptyBoxComponent {
  options: AnimationOptions = {    
    path: '/assets/animation/empty.json'  
  };  

}
