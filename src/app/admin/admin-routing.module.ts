import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './libros/lista-libros/lista-libros.component';
import { FormLibroComponent } from './libros/form-libro/form-libro.component';

const routes: Routes = [
{
  path:'libros',
  component:ListaLibrosComponent
},
{
  path:'libros/nuevo',
  component:FormLibroComponent
},
{
  path:'libros/:id',
  component:FormLibroComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
