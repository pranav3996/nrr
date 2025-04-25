  import { Routes } from '@angular/router';
  import { LoginComponent } from './login/login.component';
  import { MatchResultComponent } from './net-run-rate/match-result/match-result.component';
  import { AuthGuard } from './services/auth.guard';
  import { AppComponent } from './app.component';
import { PointTableComponent } from './net-run-rate/point-table/point-table.component';

  export const routes: Routes = [
    {path:'',component:PointTableComponent},
      { path: 'login', component: LoginComponent },
      { path: 'match-result', component: MatchResultComponent, canActivate: [AuthGuard] },  
      
    ];
