import { Component, OnInit } from '@angular/core';
import { ActionEvent, FastFormGroup, FastFormsService } from '@ngx-fast-forms/core';
import { ButtonProperties } from '@ngx-fast-forms/material';

@Component({
  selector: 'frontend-nested',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.scss']
})
export class NestedComponent implements OnInit {

  public nestedArray: FastFormGroup;

  constructor(private formService: FastFormsService) {
    this.nestedArray = this.formService.group([{
      id: 'first',
      type: 'array',
      children: [
        {
          id: 'inner',
          type: 'group',
          children: [
            {
              id: 'second',
              type: 'array',
              children: [
                {
                  id: 'test',
                  type: 'group',
                  children: [
                    {
                      id: 'tel',
                      type: 'mat-input'
                    },
                    {
                      id: 'add-action-1',
                      type: 'mat-button',
                      properties: {
                        type: 'text-button',
                        text: 'Add'
                      } as ButtonProperties
                    }

                  ]
                }
              ]
            },
            {
              id: 'name',
              type: 'mat-input'
            },
            {
              id: 'add-action',
              type: 'mat-button',
              properties: {
                type: 'text-button',
                text: 'Add'
              } as ButtonProperties
            }
          ]
        }
      ]
    }]);
    this.nestedArray.setValue({
      first: [{
        name: '',
        second: [{
          tel: ''
        }]
      }]
    });
  }

  ngOnInit(): void {
    this.nestedArray.valueChanges.subscribe(value => {
      // console.log(value);
    });
  }

  doAction(event: ActionEvent) {
    if (event.args.length === 2) {

    }
    // console.log(event);
  }
}
