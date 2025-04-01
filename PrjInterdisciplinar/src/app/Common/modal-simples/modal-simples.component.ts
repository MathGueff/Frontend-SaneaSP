import { Component, Input, Output } from '@angular/core';
import { ModalType } from '../../models/enums/ModalType.enum';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-modal-simples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-simples.component.html',
  styleUrl: './modal-simples.component.css'
})
export class ModalSimplesComponent {
  //Binding para o HTML
  modalTypes = ModalType
  @Input() modalId !: string
  @Input() modalType !: ModalType
}
