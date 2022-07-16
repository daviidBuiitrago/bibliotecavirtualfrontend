import { Injectable } from '@angular/core';
import { Libro, LibroPage } from '../libro.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url: string = `${environment.HOST}/api/libros`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page:number=0,size:number=5):Observable<LibroPage>{
    return this.http.get<LibroPage>(`${this.url}/pageable?size=${size}&number=${page}`,{});

  }

  get(id:number):Observable<Libro>{
    return this.http.get<Libro>(`${this.url}/${id}`);
  }

  create(libro:Libro){
    return this.http.post<Libro>(`${this.url}`,libro);

  }
  
  update(id:number, libro:Libro){
    return this.http.put<Libro>(`${this.url}/${id}`,libro);

  }

  delete(id:number){
    return this.http.delete<Libro>(`${this.url}/${id}`);

  }

}
