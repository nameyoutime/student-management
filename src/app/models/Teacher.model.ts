export class Teacher {
  constructor(
    public _id?: string | null,
    public Name?: string | null,
    public Age?: string | null,
    public Address?: string | null,
    public Subject?: Array<string> | any,
  ) { }
}
