import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzMessageService } from 'ng-zorro-antd/message'
import DB from '../../api/db'
import dayjs from 'dayjs'
import { ActivatedRoute, Router } from '@angular/router'

type Units = "kg" | "un" | "lt"

@Component({
    selector: 'register-items',
    standalone: true,
    imports: [
      CommonModule,
      NzButtonModule,
      NzFormModule,
      NzInputModule,
      NzSelectModule,
      ReactiveFormsModule,
      NzInputNumberModule,
      NzCheckboxModule,
      NzDatePickerModule
    ],
    templateUrl: './RegisterItems.component.html',
    styleUrl: './RegisterItems.component.css',
})
export class RegisterItems implements OnInit {
  validateForm: FormGroup<{
    name: FormControl<string>;
    unit: FormControl<Units>;
    amount: FormControl<number>;
    currency: FormControl<string>;
    value: FormControl<number>;
    isPerishable: FormControl<boolean>;
    manufacturingDate: FormControl<Date>;
    expirationDate: FormControl<Date>;
  }>
  db = new DB()
  id: string | undefined = undefined

  listOfCurrencies: Array<{label: string, value: string}> = [
    {label: 'AED', value: 'AED'},
    {label: 'UAE', value: 'UAE'},
    {label: 'AFN', value: 'AFN'},
    {label: 'ALL', value: 'ALL'},
    {label: 'AMD', value: 'AMD'},
    {label: 'AOA', value: 'AOA'},
    {label: 'ARS', value: 'ARS'},
    {label: 'AUD', value: 'AUD'},
    {label: 'AWG', value: 'AWG'},
    {label: 'AZN', value: 'AZN'},
    {label: 'BAM', value: 'BAM'},
    {label: 'BBD', value: 'BBD'},
    {label: 'BDT', value: 'BDT'},
    {label: 'BGN', value: 'BGN'},
    {label: 'BHD', value: 'BHD'},
    {label: 'BIF', value: 'BIF'},
    {label: 'BMD', value: 'BMD'},
    {label: 'BND', value: 'BND'},
    {label: 'BOB', value: 'BOB'},
    {label: 'BRL', value: 'BRL'},
    {label: 'BSD', value: 'BSD'},
    {label: 'BTN', value: 'BTN'},
    {label: 'BWP', value: 'BWP'},
    {label: 'BYN', value: 'BYN'},
    {label: 'BZD', value: 'BZD'},
    {label: 'CAD', value: 'CAD'},
    {label: 'CDF', value: 'CDF'},
    {label: 'CHF', value: 'CHF'},
    {label: 'CLP', value: 'CLP'},
    {label: 'CNY', value: 'CNY'},
    {label: 'COP', value: 'COP'},
    {label: 'CRC', value: 'CRC'},
    {label: 'CUP', value: 'CUP'},
    {label: 'CVE', value: 'CVE'},
    {label: 'CZK', value: 'CZK'},
    {label: 'DJF', value: 'DJF'},
    {label: 'DKK', value: 'DKK'},
    {label: 'DOP', value: 'DOP'},
    {label: 'DZD', value: 'DZD'},
    {label: 'EGP', value: 'EGP'},
    {label: 'ERN', value: 'ERN'},
    {label: 'ETB', value: 'ETB'},
    {label: 'EUR', value: 'EUR'},
    {label: 'FJD', value: 'FJD'},
    {label: 'FKP', value: 'FKP'},
    {label: 'GBP', value: 'GBP'},
    {label: 'GEL', value: 'GEL'},
    {label: 'GHS', value: 'GHS'},
    {label: 'GIP', value: 'GIP'},
    {label: 'GMD', value: 'GMD'},
    {label: 'GNF', value: 'GNF'},
    {label: 'GTQ', value: 'GTQ'},
    {label: 'GYD', value: 'GYD'},
    {label: 'HKD', value: 'HKD'},
    {label: 'HNL', value: 'HNL'},
    {label: 'HRK', value: 'HRK'},
    {label: 'HTG', value: 'HTG'},
    {label: 'HUF', value: 'HUF'},
    {label: 'IDR', value: 'IDR'},
    {label: 'ILS', value: 'ILS'},
    {label: 'INR', value: 'INR'},
    {label: 'IQD', value: 'IQD'},
    {label: 'IRR', value: 'IRR'},
    {label: 'ISK', value: 'ISK'},
    {label: 'JMD', value: 'JMD'},
    {label: 'JOD', value: 'JOD'},
    {label: 'JPY', value: 'JPY'},
    {label: 'KES', value: 'KES'},
    {label: 'KGS', value: 'KGS'},
    {label: 'KHR', value: 'KHR'},
    {label: 'KPW', value: 'KPW'},
    {label: 'KRW', value: 'KRW'},
    {label: 'KWD', value: 'KWD'},
    {label: 'KYD', value: 'KYD'},
    {label: 'KZT', value: 'KZT'},
    {label: 'LAK', value: 'LAK'},
    {label: 'LBP', value: 'LBP'},
    {label: 'LKR', value: 'LKR'},
    {label: 'LRD', value: 'LRD'},
    {label: 'LSL', value: 'LSL'},
    {label: 'LYD', value: 'LYD'},
    {label: 'MAD', value: 'MAD'},
    {label: 'MDL', value: 'MDL'},
    {label: 'MGA', value: 'MGA'},
    {label: 'MKD', value: 'MKD'},
    {label: 'MMK', value: 'MMK'},
    {label: 'MNT', value: 'MNT'},
    {label: 'MOP', value: 'MOP'},
    {label: 'MRU', value: 'MRU'},
    {label: 'MUR', value: 'MUR'},
    {label: 'MVR', value: 'MVR'},
    {label: 'MWK', value: 'MWK'},
    {label: 'MXN', value: 'MXN'},
    {label: 'MYR', value: 'MYR'},
    {label: 'MZN', value: 'MZN'},
    {label: 'NAD', value: 'NAD'},
    {label: 'NGN', value: 'NGN'},
    {label: 'NIO', value: 'NIO'},
    {label: 'NOK', value: 'NOK'},
    {label: 'NPR', value: 'NPR'},
    {label: 'NZD', value: 'NZD'},
    {label: 'OMR', value: 'OMR'},
    {label: 'PAB', value: 'PAB'},
    {label: 'PEN', value: 'PEN'},
    {label: 'PGK', value: 'PGK'},
    {label: 'PHP', value: 'PHP'},
    {label: 'PKR', value: 'PKR'},
    {label: 'PLN', value: 'PLN'},
    {label: 'PYG', value: 'PYG'},
    {label: 'QAR', value: 'QAR'},
    {label: 'RON', value: 'RON'},
    {label: 'RSD', value: 'RSD'},
    {label: 'RUB', value: 'RUB'},
    {label: 'RWF', value: 'RWF'},
    {label: 'SAR', value: 'SAR'},
    {label: 'SBD', value: 'SBD'},
    {label: 'SCR', value: 'SCR'},
    {label: 'SDG', value: 'SDG'},
    {label: 'SEK', value: 'SEK'},
    {label: 'SGD', value: 'SGD'},
    {label: 'SHP', value: 'SHP'},
    {label: 'SLL', value: 'SLL'},
    {label: 'SOS', value: 'SOS'},
    {label: 'SRD', value: 'SRD'},
    {label: 'STN', value: 'STN'},
    {label: 'SYP', value: 'SYP'},
    {label: 'SZL', value: 'SZL'},
    {label: 'THB', value: 'THB'},
    {label: 'TJS', value: 'TJS'},
    {label: 'TMT', value: 'TMT'},
    {label: 'TND', value: 'TND'},
    {label: 'TOP', value: 'TOP'},
    {label: 'TRY', value: 'TRY'},
    {label: 'TTD', value: 'TTD'},
    {label: 'TWD', value: 'TWD'},
    {label: 'TZS', value: 'TZS'},
    {label: 'UAH', value: 'UAH'},
    {label: 'UGX', value: 'UGX'},
    {label: 'USD', value: 'USD'},
    {label: 'UYU', value: 'UYU'},
    {label: 'UZS', value: 'UZS'},
    {label: 'VEF', value: 'VEF'},
    {label: 'VND', value: 'VND'},
    {label: 'VUV', value: 'VUV'},
    {label: 'WST', value: 'WST'},
    {label: 'XAF', value: 'XAF'},
    {label: 'XCD', value: 'XCD'},
    {label: 'XPF', value: 'XPF'},
    {label: 'YER', value: 'YER'},
    {label: 'ZAR', value: 'ZAR'},
    {label: 'ZMW', value: 'ZMW'},
    {label: 'ZWL', value: 'ZWL'}
  ]

  customFnValue=0
  precision=0

  expirationDateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value && this.validateForm?.controls.isPerishable.value) {
      return { required: true, error: true };
    } else if (dayjs().diff(this.validateForm?.controls.expirationDate.value, 'days') > 0) {
      return { expired: true, error: true };
    }

    return {}
  };

  manufacturingDateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true, error: true };
    } else if (dayjs(this.validateForm?.controls.manufacturingDate.value).diff(this.validateForm?.controls.expirationDate.value, 'hours') > 0) {
      return { expiration: true, error: true };
    }

    return {}
  };

  async setId(id: string) {
    const item = await this.db.findItemById(id)
    
    if(!item) this.message.error("ID não identificado, registrar o item irá resultar em um novo cadastro!")
    else {
      this.message.success("ID encontrado")
      this.id = id
      this.validateForm = this.fb.group({
        name: [item.name, [Validators.required]],
        unit: [item.unit, [Validators.required]],
        amount: [item.amount, [Validators.required]],
        currency: [item.currency, [Validators.required]],
        value: [item.value, [Validators.required]],
        isPerishable: [item.isPerishable, [Validators.required]],
        manufacturingDate: [item.manufacturingDate, [this.manufacturingDateValidator]],
        expirationDate: [item.expirationDate, [this.expirationDateValidator]]
      })
    }

  }

  ngOnInit(): void {
    let id
    this.activatedRouter.queryParamMap.subscribe(params => id = params.get("id"))
    if(id) { this.setId(id) }
  }
  
  cancel(event: Event): void {
    event.preventDefault()
    this.router.navigate(["/list"])
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const controls = this.validateForm.controls

      if(this.id) {
        this.db.updateItem({
          id: this.id,
          name: controls.name.value,
          unit: controls.unit.value,
          amount: controls.amount.value,
          currency: controls.currency.value,
          value: controls.value.value,
          isPerishable: controls.isPerishable.value,
          manufacturingDate: controls.manufacturingDate.value,
          expirationDate: controls.expirationDate.value
        })

        this.router.navigate(['/list'])
      } else {
        this.db.insertItem({
          name: controls.name.value,
          unit: controls.unit.value,
          amount: controls.amount.value,
          currency: controls.currency.value,
          value: controls.value.value,
          isPerishable: controls.isPerishable.value,
          manufacturingDate: controls.manufacturingDate.value,
          expirationDate: controls.expirationDate.value
        })
      }

      this.message.create("success", "Item salvo com sucesso!")
      this.validateForm = this.fb.group({
        name: ['', [Validators.required]],
        unit: ['kg' as Units, [Validators.required]],
        amount: [0, [Validators.required]],
        currency: ['BRL', [Validators.required]],
        value: [0, [Validators.required]],
        isPerishable: [false, [Validators.required]],
        manufacturingDate: [dayjs().startOf("day").toDate(), [this.manufacturingDateValidator]],
        expirationDate: [dayjs().startOf("day").toDate(), [this.expirationDateValidator]]
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  customPrecision(): void {
    const amountPointer = this.validateForm.controls.amount
    switch(this.validateForm.controls.unit.value) {
      case 'kg':
      case 'lt':
        return amountPointer.setValue(+Number(amountPointer.value).toFixed(3), {emitViewToModelChange: false})
      case 'un':
        return amountPointer.setValue(+Number(amountPointer.value).toFixed(0), {emitViewToModelChange: false})
    }
  }

  onPerishableChange() : void {
    this.validateForm.controls.expirationDate.updateValueAndValidity({onlySelf: true})
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.validateForm = fb.group({
      name: ['', [Validators.required]],
      unit: ['kg' as Units, [Validators.required]],
      amount: [0, [Validators.required]],
      currency: ['BRL', [Validators.required]],
      value: [0, [Validators.required]],
      isPerishable: [false, [Validators.required]],
      manufacturingDate: [dayjs().startOf("day").toDate(), [this.manufacturingDateValidator]],
      expirationDate: [dayjs().startOf("day").toDate(), [this.expirationDateValidator]]
    });
  }
}