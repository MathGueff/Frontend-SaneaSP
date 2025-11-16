import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IComplaint } from '@features/denuncia/models/complaint.model';
import { GraphComponent } from '@shared/components/graph/graph.component';
import { IDataGraph } from '@shared/models/graph.model';
import { DataGraph, BigPoints } from '@shared/services/dataGraph.service';

@Component({
  selector: 'app-graph-one',
  imports: [ReactiveFormsModule, CommonModule, GraphComponent],
  templateUrl: './graph-one.component.html',
  styleUrl: './graph-one.component.css',
})
export class GraphOneComponent {
  public filtrosForm!: FormGroup;
  protected cidades : IComplaint['cidade'][] = []
  private dataGraph = inject(DataGraph);
  graph!: IDataGraph;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.dataGraph.getCities().subscribe({
      next: (values) => {
        this.cidades = values
      }
    })
    this.filtrosForm = this.fb.group({
      cidade: [''],
    });
    let data!: BigPoints[]
    this.dataGraph.getBigPoints().subscribe({
      next: (values) => {
        data = values;
        this.graph = this.dataGraph.convertBigPointInChar(data);
      },
    });
  }

  aplicarFiltros() {
    const { cidade } = this.filtrosForm.value;
    let data!: BigPoints[]

    this.dataGraph.getBigPoints(cidade).subscribe({
      next: (values) => {
        data = values;
        this.graph = this.dataGraph.convertBigPointInChar(data);
      },
    });
  }
}
