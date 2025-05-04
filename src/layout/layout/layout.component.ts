import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../../service/loading.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-layout',
  imports: [SidebarComponent, RouterOutlet, LoadingComponent, AsyncPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  loadingService =  inject(LoadingService);
}
