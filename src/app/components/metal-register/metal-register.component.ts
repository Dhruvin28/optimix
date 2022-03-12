import { Component, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { AllMetals, MetalProperty, MetalRegisterService } from './metal-register.service';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-metal-register',
  templateUrl: './metal-register.component.html',
  styleUrls: ['./metal-register.component.scss'],
  providers: [MetalRegisterService]
})
export class MetalRegisterComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['no','view', 'edit', 'delete', 'metalName', 'metalGroup', 'gradeStandard'];
  displayedColumnsForProperty: string[] = ['elementId', 'minValue', 'maxValue', 'bathMinimum', 'bathMaximum', 'targetReading'];
  dataSource = new MatTableDataSource();
  dataSourceForProperty = new MatTableDataSource();
  filteredOptions: string[] = [];
  totalOptions: string[] = [];
  options = ['Metal 1', 'Metal2', 'Metal3'];
  metalName = '';
  selectActive = '0';
  deleteMetalId = 0;
  viewMetalId = 0;
  active: { key: string; value: string }[] = [
    {
      key: 'Active',
      value: '0'
    },
    {
      key: 'inActive',
      value: '1'
    },
    {
      key: 'All',
      value: '2'
    },
  ];
  @ViewChild('modal', {static: true}) private modalTemplate: TemplateRef<any>;
  @ViewChild('modalDeleteConfirm', {static: true}) private modalTemplateDelete: TemplateRef<any>;
  @ViewChild('modalProperty', {static: true}) private modalTemplateProperty: TemplateRef<any>;
  private readonly defaultConfig: MatDialogConfig = {
    hasBackdrop: true,
    disableClose: true,
  };
  private readonly configForPropertyModal: MatDialogConfig = {
    hasBackdrop: true,
    disableClose: true,
    width: "100%"
  };
  private dialogRef?: MatDialogRef<any>;
  private dialogRefForDelete?: MatDialogRef<any>;
  private dialogRefForProperty?: MatDialogRef<any>;
  constructor(
    private readonly metalRegisterService: MetalRegisterService,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.getMetalData();
    
    this.isLoading = false;
  }
  onKeyUp() {
    this.filteredOptions = this.totalOptions.filter(option => option.toLowerCase().includes(this.metalName));
  }
  async onSearchClick() {
    this.getMetalData();
    this.dataSource.filter = this.metalName.toLowerCase();
  }
  onFocusOutEvent() {
    this.dataSource.filter = this.metalName.toLowerCase();
  }
  async getMetalData() {
    const allMetals: AllMetals[] = await this.metalRegisterService.getAllMetals(this.selectActive);
    this.dataSource = new MatTableDataSource(allMetals);
    this.totalOptions = allMetals.map((i: AllMetals) => i.MetalName);
  }
  onClearClick() {
    this.metalName = '';
    this.selectActive = '0';
    this.getMetalData();
  }
  onDeleteClick(metalId: number) {
    this.deleteMetalId = metalId;
    this.openDialog();
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
  openDeleteDialog() {
    this.dialogRefForDelete = this.dialog.open(this.modalTemplateDelete, this.defaultConfig);

    this.dialogRefForDelete.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closeDeletePopup() {
    this.dialogRefForDelete.close();
  }
  openPropertyDialog() {
    this.dialogRefForProperty = this.dialog.open(this.modalTemplateProperty, this.configForPropertyModal);

    this.dialogRefForProperty.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  closePropertyPopup() {
    this.dialogRefForProperty.close();
  }
  onDelete() {
    const response = this.metalRegisterService.deleteMetal(this.deleteMetalId).then(res => {
      if (res) {
        this.closePopup();
        this.openDeleteDialog();
      }
     
      this.onClearClick();  
    });
  }
  async onViewClick(metalId: number) {
    const metalProperty: MetalProperty[] = await this.metalRegisterService.getMetalProperty(metalId);
    this.dataSourceForProperty = new MatTableDataSource(metalProperty);
    this.openPropertyDialog();
  }
  closePropertyModal() {
    this.closePropertyPopup();
  }
}
