export class UserService {
  name: string = ""
  age: number = 0;

  constructor() {}
}

export class RangeDateTimeWithZone {
  start: Date = new Date();
  end: Date = new Date();

  constructor() {}
}

export class TableModel {

  constructor(private id: number, private date: Date) {
  }
}

export class TableModelRecipe extends TableModel{

  constructor(id: number, date: Date, private name: string, private time: number) {
    super(id, date);
  }
}

export class TableModelMB110_1TD extends TableModel{

  constructor(id: number, date: Date, private holdingRegister0: number, private tableModelRecipe: TableModelRecipe) {
    super(id, date);
  }
}

