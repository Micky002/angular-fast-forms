import { ControlId } from '../../control/models';

export class ControlIdMock implements ControlId {

  constructor(private readonly id: string) {
  }

  getId(): string {
    return this.id;
  }
}
