import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-search-empty-animation',
  templateUrl: './search-empty-animation.component.html',
  styleUrls: ['./search-empty-animation.component.scss']
})
export class SearchEmptyAnimationComponent {
  options: AnimationOptions = {    
    path: '/assets/animation/search.json'  
  };  

}
