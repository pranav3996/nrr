

import { Injectable } from '@angular/core';

import { ref, push, set, update, get, child } from 'firebase/database';
import { Team } from '../net-run-rate/team.model';
import { db } from './firebase-config';



@Injectable({ providedIn: 'root' })
export class FirebaseService {
  saveMatchResult(matchData: any) {
    const matchRef = ref(db, 'matches');
    return push(matchRef, matchData);
  }

  saveTeams(teams: any[]) {
    const teamsRef = ref(db, 'teams');
    const teamsObj: { [key: string]: any } = {};
    teams.forEach(team => {
      teamsObj[team.name] = team;
    });
    return set(teamsRef, teamsObj);
  }

  async getAllMatchResults(): Promise<any[]> {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'matches'));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    } else {
      return [];
    }
  }

  deleteAllMatchResults() {
    const matchesRef = ref(db, 'matches');
    return set(matchesRef, null); // Setting a node to null deletes it
  }
  deleteAllTeams() {
    const teamsRef = ref(db, 'teams');
    return set(teamsRef, null); // Setting to null deletes the node
  }
  
}
