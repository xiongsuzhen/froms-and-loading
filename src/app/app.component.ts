import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit,OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  ngOnInit(): void {
    setTimeout(()=>{
      this.form.setDisabled('submit', true);
      this.form.setValue('name', 'Todd Motto');      
    })
  }

  listData=[
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ]
  config: FieldConfig[] = this.listData

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
  }

  submit(value: {[name: string]: any}) {
    // console.log(this.form)
    console.log(value);
  }
}
