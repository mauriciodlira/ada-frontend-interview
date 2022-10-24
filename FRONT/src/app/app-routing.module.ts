import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'board',
  },
  {
    path: 'board',
    canLoad: [AuthenticationGuard],
    loadComponent: () => import('./modules/board/board.component').then(x => x.BoardComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
