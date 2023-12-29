import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './unauthenticated.component.html',
  styleUrls: ['./unauthenticated.component.scss']
})
export class UnauthenticatedComponent {

}
