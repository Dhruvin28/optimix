import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingConstants } from 'src/app/constants/routing.constants';
import { ElementMasterService, Element } from '../element-master/element-master.service';
import { FinalChem, InsertMetalMaster, MetalGradeProperty, MetalMasterService } from './metal-master.service';
const USER_SCHEMA = {
  "min": "text",
  "max": "text",
}
@Component({
  selector: 'app-metal-master',
  templateUrl: './metal-master.component.html',
  styleUrls: ['./metal-master.component.scss'],
  providers: [MetalMasterService]
})
export class MetalMasterComponent implements OnInit {

  metalMasterForm = new FormGroup({
    derivedFrom: new FormControl('', Validators.required),
    metalName: new FormControl('', Validators.required),
    metalGroup: new FormControl('', Validators.required),
    gradeStandard: new FormControl('', Validators.required)
  });
  metalName = '';
  totalOptions: string[] = [];
  filteredOptionsForDerived: { metalId: number; metalName: string }[] = [];
  filteredOptionsForMetalGroup: string[] = [];
  allMetalTypes: string[] = [];
  allMetalsInfo: { metalId: number; metalName: string }[] = [];
  columnsForFinalChem: string[] = ['element', 'min', 'max'];
  dataSourceForFinalChem = new MatTableDataSource();
  columnsForBathChem: string[] = ['element', 'min', 'max'];
  dataSourceForBathChem = new MatTableDataSource();
  columnsForTargetChem: string[] = ['element', 'target'];
  dataSourceForTargetChem = new MatTableDataSource();
  dataSourceForAllElements = new MatTableDataSource();
  finalChem: FinalChem[] = [];
  bathChem: FinalChem[] = [];
  targetChem: FinalChem[] = [];
  @ViewChild('modal', { static: true }) private modalTemplate: TemplateRef<any>;
  allElements: Element[] = [];
  @ViewChild('modalInsertSuccess', { static: true }) private modalInsertSuccess: TemplateRef<any>;
  private readonly defaultConfig: MatDialogConfig = {
    hasBackdrop: true,
    disableClose: true,
    width: "30%"
  };
  private dialogRef?: MatDialogRef<any>;

  dataSchema = USER_SCHEMA;
  constructor(
    private readonly metalMasterService: MetalMasterService,
    private readonly elementMasterService: ElementMasterService,
    public dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.metalMasterService.getMetalType().then(res => {
      this.allMetalTypes = res as string[];
      this.filteredOptionsForMetalGroup = this.allMetalTypes;
    });
    this.elementMasterService.getAllElements().then(res => {
      this.allElements = res as Element[];
      this.allElements.forEach(r => {
        r.min = '';
        r.max = '';
        r.bathMin = '';
        r.bathMax = '';
        r.targetReading = '';
      });
    });
    this.metalMasterService.getMetalsInfo().then(res => {
      this.allMetalsInfo = res as { metalId: number; metalName: string }[];
      this.filteredOptionsForDerived = this.allMetalsInfo;
    });
    this.dataSourceForAllElements = new MatTableDataSource(this.allElements);
    this.dataSourceForFinalChem = new MatTableDataSource(this.finalChem);
    this.dataSourceForBathChem = new MatTableDataSource(this.bathChem);
    this.dataSourceForTargetChem = new MatTableDataSource(this.targetChem);
  }
  onFocusOutEventForDerived() {
    if (this.metalMasterForm.value.derivedFrom) {
      this.metalMasterService.getMetalInfoFromMetal(this.metalMasterForm.value.derivedFrom).then((r: InsertMetalMaster) => {
        this.metalMasterForm.controls['metalName'].setValue(r.metalName);
        this.metalMasterForm.controls['metalGroup'].setValue(r.metalType);
        this.metalMasterForm.controls['gradeStandard'].setValue(r.gradeStandard);
        const selectedElements: Element[] = [];
        r.metalGradeProperty.forEach((d: MetalGradeProperty) => {
          selectedElements.push({
            elementId: d.elementId,
            elementName: d.elementName,
            min: d.min,
            max: d.max,
            bathMin: d.bathMin,
            bathMax: d.bathMax,
            targetReading: d.targetReading,
            isChecked: true
          });
        });
        this.onAdd(selectedElements);
      });
    }
   
    // this.dataSource.filter = this.metalName.toLowerCase();
  }
  onFocusOutEventForMetalGroup() {
    // this.dataSource.filter = this.metalName.toLowerCase();
  }
  onKeyUpForDerived() {
    const formData = this.metalMasterForm.value;
    this.filteredOptionsForDerived = this.allMetalsInfo.filter(option => option.metalName.toLowerCase().includes(formData.derivedFrom));
  }
  onKeyUpForMetalGroup() {
    const formData = this.metalMasterForm.value;
    this.filteredOptionsForMetalGroup = this.allMetalTypes.filter(option =>
      option.toLowerCase().includes(formData.metalGroup));
  }
  onCloseDialog(selecedElements: Element[]) {
    this.closePopup();
    this.onAdd(selecedElements);
  }
  onAdd(selecedElements: Element[]) {
    this.finalChem = [];
    this.bathChem = [];
    this.targetChem = [];
    selecedElements.forEach(r => {
      const find = this.allElements.find(item => item.elementId === r.elementId);
      find.isChecked = r.isChecked ? r.isChecked : false;
      if (r.isChecked) {
        this.finalChem.push({
          id: r.elementId,
          element: r.elementName,
          min: r.min,
          max: r.max
        });
        this.bathChem.push({
          id: r.elementId,
          element: r.elementName,
          min: r.bathMin,
          max: r.bathMax
        });
        this.targetChem.push({
          id: r.elementId,
          element: r.elementName,
          target: r.targetReading
        });
      }
    });
    this.dataSourceForFinalChem = new MatTableDataSource(this.finalChem);
    this.dataSourceForBathChem = new MatTableDataSource(this.bathChem);
    this.dataSourceForTargetChem = new MatTableDataSource(this.targetChem);
  }

  onAddElementClick() {

  }
  openDialog() {
    this.addDataToAllElements();
    this.dialogRef = this.dialog.open(this.modalTemplate, this.defaultConfig);
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
  async onSave() {
    this.addDataToAllElements();

    const formData = this.metalMasterForm.value;
    const isValid = this.validateMinMax();
    if (!isValid) {
      return;
    }
    const isValidName = await this.validateMetalName(formData.metalName);
    if (!isValidName) {
      window.alert('please add unique name');
      return;
    }

    const metalElementInfo: MetalGradeProperty[] = [];
    const selectedElements = this.allElements.filter((d: Element) => { return d.isChecked });
    selectedElements.forEach((r: Element) => {
      metalElementInfo.push({
        elementId: r.elementId,
        min: r.min,
        max: r.max,
        bathMin: r.bathMin,
        bathMax: r.bathMax,
        targetReading: r.targetReading
      });
    });
    const insertMetalInfo = {
      metalName: formData.metalName,
      metalType: formData.metalGroup,
      gradeStandard: formData.gradeStandard,
      metalGradeProperty: metalElementInfo
    } as InsertMetalMaster;

    this.metalMasterService.insertMetalMasterInfo(insertMetalInfo).then(result => {
      if (result) {
        this.dialogRef = this.dialog.open(this.modalInsertSuccess, this.defaultConfig);
        this.dialogRef.afterClosed().subscribe(result => {
        });
      }
    });

  }

  closeInsertPopup() {
    this.dialogRef.close();
    this.router.navigate([RoutingConstants.metalMaster]);
  }

  async validateMetalName(metalName: string): Promise<boolean> {
    return this.metalMasterService.validateMetalName(metalName).then((r: boolean) => {
      return r;
    });
  }

  validateMinMax(): boolean {
    const selectedElements = this.allElements.filter(item => item.isChecked === true);
    selectedElements.forEach(r => {
      if (+r.max === 0) {
        window.alert(r.elementName + ' max value cannot be zero');
        return false;
      }
      if (r.min && r.max) {
        if (+r.min === +r.max) {
          window.alert(r.elementName + ' cannot have same value');
          return false;
        }
        if (+r.min > +r.max) {
          window.alert(r.elementName + ' min value cannot greater than max value');
          return false;
        }
        if (+r.max < +r.min) {
          window.alert(r.elementName + ' max value cannot smaller than min value');
          return false;
        }
      }
    });
    return true;
  }

  addDataToAllElements() {
    this.allElements.forEach(r => {
      const find = this.finalChem.find(item => item.element === r.elementName);
      if (find) {
        r.min = find.min;
        r.max = find.max;
      }
      const findbath = this.bathChem.find(item => item.element === r.elementName);
      if (findbath) {
        r.bathMin = findbath.min;
        r.bathMax = findbath.max;
      }
      const findTarget = this.targetChem.find(item => item.element === r.elementName);
      if (findTarget) {
        r.targetReading = findTarget.target;
      }
    });
  }
  checkNegative(value: string) {
    if (value && +value < 0) {
      // window.alert('cannot negative');

    }
  }
}
