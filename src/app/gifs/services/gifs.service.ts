import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey= 'KrzQ6p5Vwk2vs4SXY1Q5wSV3l1tKRpxs';
  public response:Gif [] = [];
  private UrlApi ='https://api.giphy.com/v1/gifs';

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.response = JSON.parse(localStorage.getItem('response')!) || [];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.UrlApi}/search`, {params})
          .subscribe((resp) =>{
            this.response = resp.data;
            localStorage.setItem('response',JSON.stringify(resp.data));
            
          })
  }


}
