import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-empty-search',
  templateUrl: './empty-search.component.html',
  styleUrls: ['./empty-search.component.scss']
})
export class EmptySearchComponent {
  options: AnimationOptions = {    
    path: '/assets/animation/search.json'  
  };  

}
