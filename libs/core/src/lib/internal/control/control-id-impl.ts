import { ControlId } from '../../control/models';

export class ControlIdImpl implements ControlId {

  private readonly parts: IdPart[];

  constructor(private parentParts: IdPart[] = []) {
    this.parts = parentParts.map(part => ({
      id: part.id,
      indexProvider: part.indexProvider
    }));
  }

  addPart(part: string): ControlIdImpl {
    return new ControlIdImpl([...this.parts, {
      id: part
    }]);
  }

  addIndex(indexProvider: IndexProvider): ControlIdImpl {
    let clonedId = new ControlIdImpl(this.parts);
    if (clonedId.parts.length > 0) {
      const lastPart = clonedId.parts[clonedId.parts.length - 1];
      if (lastPart.indexProvider === undefined) {
        lastPart.indexProvider = indexProvider;
      } else {
        clonedId = new ControlIdImpl([...clonedId.parts, {indexProvider: indexProvider}]);
      }
    } else if (clonedId.parts.length === 0) {
      clonedId = new ControlIdImpl([{indexProvider: indexProvider}]);
    }
    return clonedId;
  }

  getId(): string {
    return this.parts.map(part => {
      if (part.id !== undefined && part.indexProvider !== undefined) {
        return `${part.id}[${part.indexProvider.index}]`;
      } else if (part.indexProvider !== undefined) {
        return `[${part.indexProvider.index}]`;
      } else {
        return part.id;
      }
    }).join('.');
  }
}

interface IdPart {
  id?: string;
  indexProvider?: IndexProvider;
}

interface IndexProvider {
  index: number | null;
}
