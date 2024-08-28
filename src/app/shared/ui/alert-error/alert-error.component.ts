import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.css',
})
export class AlertErrorComponent {
  @Input() formName!: FormGroup;
  @Input() controlName!: string;
}
