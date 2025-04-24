import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PointTableService } from '../point-table.service';
import { Team } from '../team.model';

@Component({
  selector: 'app-point-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './point-table.component.html',
  styleUrl: './point-table.component.css'
})
export class PointTableComponent {
  groupA: Team[] = [];
  groupB: Team[] = [];

  constructor(private ptsService: PointTableService) {}

  ngOnInit() {
    this.groupA = this.ptsService.getTeamsByGroup('A');
    this.groupB = this.ptsService.getTeamsByGroup('B');
  }
}
