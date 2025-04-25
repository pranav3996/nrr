
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointTableService } from '../point-table.service';
import { Team } from '../team.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-point-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './point-table.component.html',
  styleUrl: './point-table.component.css',
})
export class PointTableComponent {
  groupA: Team[] = [];
  groupB: Team[] = [];

  constructor(
    private ptsService: PointTableService,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    // Reset to clean state
    this.ptsService.resetTable();

    // Get all matches from Firebase
    const matches = await this.firebaseService.getAllMatchResults();

    // Reapply matches to point table
    for (const match of matches) {
      this.ptsService.updateMatch(
        match.team1,
        match.team2,
        match.team1Runs,
        match.team1Overs,
        match.team2Runs,
        match.team2Overs
      );
    }

    // this.groupA = this.ptsService.getTeamsByGroup('A');
    // this.groupB = this.ptsService.getTeamsByGroup('B');
    this.groupA = this.ptsService
      .getTeamsByGroup('A')
      .sort((a, b) => b.points - a.points || b.nrr - a.nrr);
    this.groupB = this.ptsService
      .getTeamsByGroup('B')
      .sort((a, b) => b.points - a.points || b.nrr - a.nrr);
  }
}
