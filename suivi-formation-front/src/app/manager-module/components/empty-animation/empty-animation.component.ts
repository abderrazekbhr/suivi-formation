import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-empty-animation',
  templateUrl: './empty-animation.component.html',
  styleUrls: ['./empty-animation.component.scss']
})
export class EmptyAnimationComponent {
  options: AnimationOptions = {    
    path: '/assets/animation/empty.json'  
  };  

}
