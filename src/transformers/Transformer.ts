export default abstract class Transformer {
  static fetch (item: any): any {
    return item
  }
  static send (item: any): any {
    return item
  }

  static fetchCollection (items: Array<any>) {
    return items.map(item => this.fetch(item))
  }

  static sendCollection (items: Array<any>) {
    return items.map(item => this.send(item))
  }
}
