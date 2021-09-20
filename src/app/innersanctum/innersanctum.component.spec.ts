import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnersanctumComponent } from './innersanctum.component';

describe('InnersanctumComponent', () => {
  let component: InnersanctumComponent;
  let fixture: ComponentFixture<InnersanctumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnersanctumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnersanctumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
