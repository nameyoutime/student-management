export class Student {
  constructor(
    public _id?: string | null,
    public Name?: boolean | null,
    public Age?: string | null,
    public Yob?: string | null,
    public Parents?: Array<string> | any,
    public Teacher?: Array<string> | any,
    public Class?: Array<string> | any,
  ) { }
}
