import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from 'src/app/modules/ui.module';

import { MetalRegisterComponent } from './metal-register.component';

describe('MetalRegisterComponent', () => {
  let component: MetalRegisterComponent;
  let fixture: ComponentFixture<MetalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalRegisterComponent ],
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
    fixture = TestBed.createComponent(MetalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
