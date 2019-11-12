export default class Project {
  name: string;
  id?: number;

  constructor ({ name, id }: Project) {
    this.id = id
    this.name = name
  }
}
