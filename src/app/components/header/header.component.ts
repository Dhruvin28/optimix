import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoutingConstants } from 'src/app/constants/routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isOpen = false;
  @ViewChild('modal', {static: true}) private modalTemplate: TemplateRef<any>;
  private readonly defaultConfig: MatDialogConfig = {
    hasBackdrop: true,
    disableClose: true,
  };
  private dialogRef?: MatDialogRef<any>;
  constructor(public dialog: MatDialog,
    private readonly router: Router,) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.closePopup();
    localStorage.removeItem('jwtToken');
    this.router.navigate([RoutingConstants.login]);
  }
  openDialog() {
    this.dialogRef = this.dialog.open(this.modalTemplate, this.defaultConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
  onMetalRegisterClick() {
    this.router.navigate([RoutingConstants.metalRegister]);
  }
  onMetalMasterClick() {
    this.router.navigate([RoutingConstants.metalMaster]);
  }

}
