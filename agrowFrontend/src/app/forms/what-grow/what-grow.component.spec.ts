import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatGrowComponent } from './what-grow.component';

describe('WhatGrowComponent', () => {
  let component: WhatGrowComponent;
  let fixture: ComponentFixture<WhatGrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatGrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatGrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
