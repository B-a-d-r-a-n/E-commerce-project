import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  cartId!: string;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrderService = inject(OrderService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  address = this._FormBuilder.group({
    details: [null],
    phone: [null],
    city: [null],
  });

  payment = () => {
    this._OrderService
      .createSession(this.cartId, this.address.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          window.location.href = res.session.url;
        },
      });
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
      },
    });
  }
}
