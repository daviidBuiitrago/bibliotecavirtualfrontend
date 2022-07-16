import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.libroService.create(values)
      .subscribe({
        next: libro => {
          this.router.navigate(['/']);
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

}
