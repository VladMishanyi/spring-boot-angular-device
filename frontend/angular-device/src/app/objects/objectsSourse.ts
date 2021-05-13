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

export class DeviceModelMB110_1TD{

  constructor(private holdingRegister0: number,
              private holdingRegister1: number,
              private holdingRegister2: number,
              private holdingRegister3: number,
              private holdingRegister4: number,
              private holdingRegister5: number,
              private holdingRegister6: number,
              private holdingRegister7: number) {
  }
}

