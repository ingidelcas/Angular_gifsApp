import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){
    return this.gifsService.historial;
  }
  constructor(private gifsService:GifsService) { }



  buscar(value:string){
   
    if(value.trim().length=== 0){
      return;
    }
    this.gifsService.buscarGifs(value);
    console.log(value);
  }

  

}
