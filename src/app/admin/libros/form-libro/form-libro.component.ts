import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../shared/libro.model';
import { LibroService } from '../shared/_service/libro.service';

@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html',
  styles: [
  ]
})
export class FormLibroComponent implements OnInit {
  formulario?: FormGroup;
  errors?: any;
  libro?: Libro;

  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);
    if (id) {
      this.libroService.get(parseInt(id!))
        .subscribe(libro => {
          this.libro = libro;
          this.formulario = this.formBuilder.group({
            titulo: [libro.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            slug: [libro.slug, [Validators.required, Validators.pattern('[a-z0-9-]+')]],
            descripcion: [libro.descripcion, [Validators.required]],
            precio: [libro.precio, [Validators.required, Validators.min(0)]],
          });

        })
    }
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
    })
  }

  save(): void {

    if (this.formulario?.invalid) {
      return;
    }
    const values = this.formulario?.value;
    values['rutaArchivo'] = 'abc.pdf';
    values['rutaPortada'] = 'abc.jpg';
    let request;

    if (this.libro) {
      request = this.libroService.update(this.libro.idLibro, values);
    } else {
      request = this.libroService.create(values);

    }
    request
      .subscribe({
        next: libro => {
          this.router.navigate(['/admin/libros']);
        },
        error: err => {
          console.log('Errores de validación', err.error.errors);
          this.errors = err.error.errors;

        }
      })
  }

  controlHasError(control: string, error: string): boolean {
    return this.formulario?.controls[control].hasError(error) == true;
  }

  buildSlug() {
    const slug =this.formulario?.controls['titulo'].value
      .toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')  // Replace mutiple -with single -
      .replace(/^-+/, '')      // Trim - from start of text 
      .replace(/-+$/, '');     // Trim - from end of text 

      this.formulario?.controls['slug'].setValue(slug);
  }

}
