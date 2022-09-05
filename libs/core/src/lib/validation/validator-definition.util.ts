export class ValidatorDefinition {

  public readonly id: string;
  public readonly args: Array<string>

  constructor(private definition: string) {
    if (this.definition.includes(':')) {
      this.id = this.definition.split(':')[0];
      this.args = this.definition.split(':')[1].split(',');
    } else {
      this.id = this.definition;
      this.args = [];
    }
  }
}


