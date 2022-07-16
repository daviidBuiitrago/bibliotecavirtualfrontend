import { Component, OnInit } from '@angular/core';
import { LibroService } from '../shared/_service/libro.service';
import { Libro, LibroPage } from '../shared/libro.model';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styles: [
  ]
})
export class ListaLibrosComponent implements OnInit {

  libros?: Libro[];

  constructor(
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.libroService.getAll()
      .subscribe(libroPage => {
        this.libros = libroPage.content;

      })
  }

  delete(libro: Libro) {
    const ok = confirm('¿Estás seguro de eliminar el libro?');
    if (ok) {
      this.libroService.delete(libro.idLibro)
        .subscribe(() => {
          this.getAll();
        });
    }

  }

}


