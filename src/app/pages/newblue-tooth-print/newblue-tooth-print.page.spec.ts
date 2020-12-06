import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewblueToothPrintPage } from './newblue-tooth-print.page';

describe('NewblueToothPrintPage', () => {
  let component: NewblueToothPrintPage;
  let fixture: ComponentFixture<NewblueToothPrintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewblueToothPrintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewblueToothPrintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
