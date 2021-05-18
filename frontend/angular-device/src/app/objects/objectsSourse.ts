export class UserService {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
}

export class RangeDateTimeWithZone {
  private _start: Date;
  private _end: Date;

  constructor(start: Date, end: Date) {
    this._start = start;
    this._end = end;
  }


  get start(): Date {
    return this._start;
  }

  set start(value: Date) {
    this._start = value;
  }

  get end(): Date {
    return this._end;
  }

  set end(value: Date) {
    this._end = value;
  }
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
  private _holdingRegister0: number;
  private _holdingRegister1: number;
  private _holdingRegister2: number;
  private _holdingRegister3: number;
  private _holdingRegister4: number;
  private _holdingRegister5: number;
  private _holdingRegister6: number;
  private _holdingRegister7: number;

  constructor(holdingRegister0: number,
              holdingRegister1: number,
              holdingRegister2: number,
              holdingRegister3: number,
              holdingRegister4: number,
              holdingRegister5: number,
              holdingRegister6: number,
              holdingRegister7: number) {
    this._holdingRegister0 = holdingRegister0;
    this._holdingRegister1 = holdingRegister1;
    this._holdingRegister2 = holdingRegister2;
    this._holdingRegister3 = holdingRegister3;
    this._holdingRegister4 = holdingRegister4;
    this._holdingRegister5 = holdingRegister5;
    this._holdingRegister6 = holdingRegister6;
    this._holdingRegister7 = holdingRegister7;
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

export class JsonBoolean {
  private _content: boolean;

  constructor(content: boolean) {
    this._content = content;
  }

  get content(): boolean {
    return this._content;
  }

  set content(value: boolean) {
    this._content = value;
  }
}

export class JsonString {
  private _content: string;

  constructor(content: string) {
    this._content = content;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
