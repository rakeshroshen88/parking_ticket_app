import { Component, OnInit } from '@angular/core';
declare var $: any;
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";


@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss'],
})
export class TestpageComponent implements OnInit {
   form: FormGroup = new FormGroup({});
  allData = [
            {
                "item_name": "Test 1",
                "item_id": "1",
            },
            {
                "item_name": "Test 2",
                "item_id": "2",
            },
            {
                "item_name": "Test 3",
                "item_id": "3",
            },
            {
                "item_name": "Test 4",
                "item_id": "4",
            },
            {
                "item_name": "Test 5",
                "item_id": "5",
            },
        ];
  allDataGroups = [
            {
                "display_name": "Group 1",
                "group_id": "1",
            },
            {
                "display_name": "Group 2",
                "group_id": "2",
            },
            {
                "display_name": "Group 3",
                "group_id": "3",
            }
        ];

  constructor() {
    this.createFormControls()
  }

  ngOnInit(){}

  private createFormControls() {
    for (const datum of this.allData) {
      const id = datum.item_id;
      this.form.addControl(id, new FormControl())
    }
  }

  onSubmit(){
    console.log(this.form.value);
  
  }



}


