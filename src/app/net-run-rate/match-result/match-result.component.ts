import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PointTableService } from '../point-table.service';
import { Team } from '../team.model';
import { CommonModule } from '@angular/common';
import { PointTableComponent } from '../point-table/point-table.component';

@Component({
  selector: 'app-match-result',
  standalone: true,
  imports: [FormsModule, CommonModule, PointTableComponent],
  templateUrl: './match-result.component.html',
  styleUrl: './match-result.component.css',
})
export class MatchResultComponent {
  teams: Team[] = [];

  selectedTeam1 = '';
  selectedTeam2 = '';
  t1Runs = 0;
  t1Overs = 0;
  t2Runs = 0;
  t2Overs = 0;

  constructor(public pointService: PointTableService) {}

  ngOnInit() {
    this.teams = this.pointService.getTeams();
  }

  submitMatch() {
    if (this.selectedTeam1 === this.selectedTeam2) {
      alert('Both teams cannot be the same.');
      return;
    }

    this.pointService.updateMatch(
      this.selectedTeam1,
      this.selectedTeam2,
      this.t1Runs,
      this.t1Overs,
      this.t2Runs,
      this.t2Overs
    );

    this.teams = this.pointService.getTeams();

    this.selectedTeam1 = '';
    this.selectedTeam2 = '';
    this.t1Runs = this.t1Overs = this.t2Runs = this.t2Overs = 0;
  }

  resetTable() {
    this.pointService.resetTable();
    this.teams = this.pointService.getTeams();
  }
  getGroup(teamName: string): 'A' | 'B' | '' {
    const team = this.teams.find(t => t.name === teamName);
    return team ? team.group : '';
  }
  
  
}
