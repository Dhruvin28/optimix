import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementMasterService, Element } from './element-master.service';

@Component({
  selector: 'app-element-master',
  templateUrl: './element-master.component.html',
  styleUrls: ['./element-master.component.scss']
})
export class ElementMasterComponent implements OnInit {

  @Input() allElements: Element[] = [];
  globalAllElements: Element[] = [];
  @Output() emitSelectedElements = new EventEmitter<Element[]>();
  constructor(
    private readonly elementMasterService: ElementMasterService
  ) { }

  ngOnInit(): void {
    console.log('oninit', this.allElements);
    
    this.globalAllElements = this.allElements;
    // this.elementMasterService.getAllElements().then(res => {
    //   this.allElements = res as Element[];
    // });
  }
  changeSelection(elementId: number, event: any) {
    console.log(event);
    
   const findIndex = this.allElements.find(e => e.elementId === elementId);
   if (findIndex) {
     console.log(findIndex);
     
     findIndex.isChecked = true;
   }
  }
  onAdd() {
    console.log(this.allElements);
    
    this.emitSelectedElements.emit(this.allElements);
  }
  onElementClose() {
    this.emitSelectedElements.emit(this.globalAllElements);
  }
}
