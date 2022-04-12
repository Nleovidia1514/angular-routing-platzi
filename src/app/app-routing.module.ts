import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';
//import { CustomPreloadService } from './services/custom-preload.service';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
    canActivate: [AdminGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
