import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzTableModule } from 'ng-zorro-antd/table'
import DB from '../../api/db';
import { toLocaleNumber, toReadableBoolean } from '../../utils/formaters';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import dayjs from 'dayjs';
import { Router } from '@angular/router';

@Component({
  selector: 'list-items',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './ListItems.component.html',
  styleUrl: './ListItems.component.css',
})
export class ListItems implements OnInit {
  listOfData: readonly IItem[] = []
  listOfCurrentPageData: readonly IItem[] = [];
  setOfCheckedId = new Set<string>();
  loading = false;
  checked = false;
  indeterminate = false;
  db = new DB()

  constructor(private router: Router) {}

  newItem () {
    this.router.navigate(['/register'])
  }

  removeSelected() {
    this.db.deleteMany(Array.from(this.setOfCheckedId))
    let listOfData: IItem[]
    this.db.getItemList().then(list => { listOfData = list })
    this.listOfData = listOfData!
  }

  editSelected() {
    const id = Array.from(this.setOfCheckedId)[0]
    this.router.navigate(['/register'], {queryParams: { id }})
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IItem[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  toReadableBoolean(value: any) {
    return toReadableBoolean(value)
  }

  toLocaleNumber(value: number, currency?: string, minimumFractionDigits?: number) {
    return toLocaleNumber(value, currency, minimumFractionDigits)
  }

  toLocaleDate(value: Date): string {
    return dayjs(value).format('DD/MM/YYYY')
  }

  async updateItemList () {
    this.listOfData = await this.db.getItemList()
  }

  ngOnInit(): void {
    this.updateItemList()
  }
}