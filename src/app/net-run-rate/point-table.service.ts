import { Injectable } from '@angular/core';
import { Team } from './team.model';



@Injectable({ providedIn: 'root' })
export class PointTableService {
  teams: Team[] = [];

  private initializeTeams(): void {
    const teamNames = ['HHM', 'RD11', 'CC', 'SH11', 'KSBB', 'GB', 'AV11', 'MW'];
    const totalGroups = 2;
    const teamsPerGroup = teamNames.length / totalGroups;
  
    const generatedTeams: Team[] = [];
  
    teamNames.forEach((name, index) => {
      const group = index < teamsPerGroup ? 'A' : 'B';
      generatedTeams.push({
        name: name,
        group: group as 'A' | 'B',
        matches: 0,
        won: 0,
        lost: 0,
        points: 0,
        runsFor: 0,
        oversFaced: 0,
        runsAgainst: 0,
        oversBowled: 0,
        nrr: 0,
      });
    });
  
    this.teams = generatedTeams;
    console.log(generatedTeams)
 
  }
  
  getTeams(): Team[] {
    return [...this.teams];
  }

  getTeamsByGroup(group: 'A' | 'B'): Team[] {
    return this.teams.filter((team) => team.group === group);
  }

  updateMatch(
    team1Name: string,
    team2Name: string,
    t1Runs: number,
    t1Overs: number,
    t2Runs: number,
    t2Overs: number
  ) {
    let team1 = this.teams.find((t) => t.name === team1Name);
    let team2 = this.teams.find((t) => t.name === team2Name);
    if (!team1 || !team2) return;

    if (team1.group !== team2.group) {
      console.warn(`Invalid match: ${team1.name} (Group ${team1.group}) vs ${team2.name} (Group ${team2.group}). League matches can only occur within the same group.`);
      return;
    }
  
    team1.matches++;
    team2.matches++;

    team1.runsFor += t1Runs;
    team1.oversFaced += t1Overs;
    team1.runsAgainst += t2Runs;
    team1.oversBowled += t2Overs;

    team2.runsFor += t2Runs;
    team2.oversFaced += t2Overs;
    team2.runsAgainst += t1Runs;
    team2.oversBowled += t1Overs;

    if (t1Runs > t2Runs) {
      team1.won++;
      team1.points += 2;
      team2.lost++;
    } else if (t2Runs > t1Runs) {
      team2.won++;
      team2.points += 2;
      team1.lost++;
    } else {
      team1.points += 1;
      team2.points += 1;
    }

    this.calculateNRR(team1);
    this.calculateNRR(team2);
  }

  private calculateNRR(team: Team) {
    const forRate = team.oversFaced ? team.runsFor / team.oversFaced : 0;
    const againstRate = team.oversBowled
      ? team.runsAgainst / team.oversBowled
      : 0;
    team.nrr = +(forRate - againstRate).toFixed(2);
  }

  resetTable() {
    this.initializeTeams();
  }

  getTeamByName(name: string): Team | undefined {
    return this.teams.find((team) => team.name === name);
  }

  updatePoints(teamName: string, pointsToAdd: number): void {
    const team = this.getTeamByName(teamName);
    if (team) {
      team.points += pointsToAdd;
    }
  }
}
