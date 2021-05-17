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
  private _id: number;
  private _date: Date;


  constructor(id: number, date: Date) {
    this._id = id;
    this._date = date;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}

export class TableModelRecipe extends TableModel{
  private _name: string;
  private _time: number;


  constructor(id: number, date: Date, name: string, time: number) {
    super(id, date);
    this._name = name;
    this._time = time;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get time(): number {
    return this._time;
  }

  set time(value: number) {
    this._time = value;
  }
}

export class TableModelMB110_1TD extends TableModel{
  private _holdingRegister0: number;
  private _tableModelRecipe: TableModelRecipe;


  constructor(id: number, date: Date, holdingRegister0: number, tableModelRecipe: TableModelRecipe) {
    super(id, date);
    this._holdingRegister0 = holdingRegister0;
    this._tableModelRecipe = tableModelRecipe;
  }


  get holdingRegister0(): number {
    return this._holdingRegister0;
  }

  set holdingRegister0(value: number) {
    this._holdingRegister0 = value;
  }

  get tableModelRecipe(): TableModelRecipe {
    return this._tableModelRecipe;
  }

  set tableModelRecipe(value: TableModelRecipe) {
    this._tableModelRecipe = value;
  }
}

export class DeviceModelMB110_1TD{

  constructor(private _holdingRegister0: number,
              private _holdingRegister1: number,
              private _holdingRegister2: number,
              private _holdingRegister3: number,
              private _holdingRegister4: number,
              private _holdingRegister5: number,
              private _holdingRegister6: number,
              private _holdingRegister7: number) {
  }

  get holdingRegister0(): number {
    return this._holdingRegister0;
  }

  set holdingRegister0(value: number) {
    this._holdingRegister0 = value;
  }

  get holdingRegister1(): number {
    return this._holdingRegister1;
  }

  set holdingRegister1(value: number) {
    this._holdingRegister1 = value;
  }

  get holdingRegister2(): number {
    return this._holdingRegister2;
  }

  set holdingRegister2(value: number) {
    this._holdingRegister2 = value;
  }

  get holdingRegister3(): number {
    return this._holdingRegister3;
  }

  set holdingRegister3(value: number) {
    this._holdingRegister3 = value;
  }

  get holdingRegister4(): number {
    return this._holdingRegister4;
  }

  set holdingRegister4(value: number) {
    this._holdingRegister4 = value;
  }

  get holdingRegister5(): number {
    return this._holdingRegister5;
  }

  set holdingRegister5(value: number) {
    this._holdingRegister5 = value;
  }

  get holdingRegister6(): number {
    return this._holdingRegister6;
  }

  set holdingRegister6(value: number) {
    this._holdingRegister6 = value;
  }

  get holdingRegister7(): number {
    return this._holdingRegister7;
  }

  set holdingRegister7(value: number) {
    this._holdingRegister7 = value;
  }
}

