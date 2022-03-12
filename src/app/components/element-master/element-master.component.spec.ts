import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMasterComponent } from './element-master.component';

describe('ElementMasterComponent', () => {
  let component: ElementMasterComponent;
  let fixture: ComponentFixture<ElementMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
