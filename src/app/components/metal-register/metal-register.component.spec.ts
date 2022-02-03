import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalRegisterComponent } from './metal-register.component';

describe('MetalRegisterComponent', () => {
  let component: MetalRegisterComponent;
  let fixture: ComponentFixture<MetalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetalRegisterComponent ]
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
