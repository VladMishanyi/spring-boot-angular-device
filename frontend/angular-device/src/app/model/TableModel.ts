export class TableModel {
  constructor(public id: number, public date: Date) {}
}

export class TableModelRecipe extends TableModel {
  constructor(public id: number, public date: Date, public name: string, public time: number) {
    super(id, date);
  }
}

export class TableModelMB110_1TD extends TableModel{
  constructor(public id: number, public date: Date, public holdingRegister0: number, public recipe: TableModelRecipe) {
    super(id, date);
  }
}
