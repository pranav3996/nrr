import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PointTableService } from '../point-table.service';
import { Team } from '../team.model';
import { CommonModule } from '@angular/common';
import { PointTableComponent } from '../point-table/point-table.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-match-result',
  standalone: true,
  imports: [FormsModule, CommonModule, PointTableComponent],
  templateUrl: './match-result.component.html',
  styleUrl: './match-result.component.css',
})
export class MatchResultComponent {
  @Output() tableUpdated = new EventEmitter<void>(); 
  teams: Team[] = [];

  selectedTeam1 = '';
  selectedTeam2 = '';
  t1Runs = 0;
  t1Overs = 0;
  t2Runs = 0;
  t2Overs = 0;

  constructor(public pointService: PointTableService,private firebaseService: FirebaseService) {}

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
  
    const matchData = {
      team1: this.selectedTeam1,
      team2: this.selectedTeam2,
      team1Runs: this.t1Runs,
      team1Overs: this.t1Overs,
      team2Runs: this.t2Runs,
      team2Overs: this.t2Overs,
      timestamp: new Date().toISOString()
    };
  
    const updatedTeams = this.pointService.getTeams();
  
    // Save match result
    this.firebaseService.saveMatchResult(matchData)
      .then(() => console.log('Match saved to Firebase!'))
      .catch(err => console.error('Error saving match:', err));
  
    // Save full team data
    this.firebaseService.saveTeams(updatedTeams)
      .then(() => console.log('Team table saved to Firebase!'))
      .catch(err => console.error('Error saving teams:', err));
  
    // Refresh team list
    this.teams = updatedTeams;
  
    // Reset form
    this.selectedTeam1 = '';
    this.selectedTeam2 = '';
    this.t1Runs = this.t1Overs = this.t2Runs = this.t2Overs = 0;
  }
  
  
  resetTable() {
    this.pointService.resetTable();
    this.teams = this.pointService.getTeams();
  
    this.firebaseService.deleteAllMatchResults()
      .then(() => console.log('All match data deleted from Firebase'))
      .catch(err => console.error('Error deleting matches:', err));
  
    this.firebaseService.deleteAllTeams()
      .then(() => console.log('All team data deleted from Firebase'))
      .catch(err => console.error('Error deleting teams:', err));
  }
  
  
  getGroup(teamName: string): 'A' | 'B' | '' {
    const team = this.teams.find(t => t.name === teamName);
    return team ? team.group : '';
  }
  
  
}
