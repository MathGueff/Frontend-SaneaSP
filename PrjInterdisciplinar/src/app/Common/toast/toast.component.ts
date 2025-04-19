// toast.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,  // ← Adicione esta linha
  imports: [CommonModule],  // ← Importe módulos necessários
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}