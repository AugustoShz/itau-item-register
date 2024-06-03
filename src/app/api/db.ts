import { v4 as uuid } from 'uuid'

class DB implements IDB {
  itemList: IItem[];

  constructor() {
    const localData: IDB = JSON.parse(localStorage.getItem('db') ?? '{"itemList":[]}')
    this.itemList = localData.itemList
  }

  async updateItem(item: IItem) {
    const foundItem = this.findItemById(item.id)

    if(!foundItem) throw new Error("Item não encontrado!")
    
    Object.assign(foundItem, item)
    localStorage.setItem('db', JSON.stringify({ itemList: this.itemList }))
  }

  async findItemById(id: string) {
    return this.itemList.find(item => item.id === id)
  }

  async insertItem(item: Omit<IItem, "id">) {
    this.itemList.push({
      id: uuid(),
      ...item
    })

    localStorage.setItem('db', JSON.stringify({ itemList: this.itemList }))
    return this.itemList
  }

  async getItemList() {
    return this.itemList
  }

  async deleteMany(listOfIds: string[]) {
    this.itemList = this.itemList.filter(item => !listOfIds.includes(item.id))

    localStorage.setItem('db', JSON.stringify({ itemList: this.itemList }))
    return this.itemList
  }
}

export default DB