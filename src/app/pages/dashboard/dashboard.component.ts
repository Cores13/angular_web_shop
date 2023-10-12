import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users: any = [];
  public fullName: string = "";
  public role: string = "";

  constructor(private api: ApiService, private authService: AuthService, private userService: UserService){}

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });

    this.userService.getFullName().subscribe(res => {
      let fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = res || fullNameFromToken;
    });

    this.userService.getRole().subscribe(res => {
      let roleFromToken = this.authService.getRoleFromToken();
      this.role = res || roleFromToken;
    });
  }

  logout() {
    this.authService.logout();
  }
}
