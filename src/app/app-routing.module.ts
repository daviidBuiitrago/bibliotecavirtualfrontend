import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './libros/lista-libros/lista-libros.component';
import { FormLibroComponent } from './libros/form-libro/form-libro.component';

const routes: Routes = [
{
  path:'',
  component:ListaLibrosComponent
},
{
  path:'nuevo',
  component:FormLibroComponent
},
{
  path:':id',
  component:FormLibroComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
