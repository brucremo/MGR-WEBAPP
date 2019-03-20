import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGroupComponent } from './game-group.component';

describe('GameGroupComponent', () => {
  let component: GameGroupComponent;
  let fixture: ComponentFixture<GameGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
