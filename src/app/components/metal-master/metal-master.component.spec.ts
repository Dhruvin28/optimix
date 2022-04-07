import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from 'src/app/modules/ui.module';

import { MetalMasterComponent } from './metal-master.component';

describe('MetalMasterComponent', () => {
  let component: MetalMasterComponent;
  let fixture: ComponentFixture<MetalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalMasterComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
