import { Component } from '@angular/core';
import { CarouselImage } from 'src/app/interfaces/carousel/CarouselImage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: CarouselImage[] = [
    {
      src: 'https://wallpaper.dog/large/20553830.jpg',
      alt: 'banner image 1'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Zec1haQB2bU-ArposvevL0VUTmuS028GRbnwMo_iqVsQXQubKcF1VAV6B3cVVIvVS6Y&usqp=CAU',
      alt: 'banner image 2'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwen0cFDzwiOA7uD9cCergdgddpdEbO7_h9UjI1PphKz5X807ZG-eCmuMU1Qxl9B84guw&usqp=CAU',
      alt: 'banner image 3'
    },
  ];
}
