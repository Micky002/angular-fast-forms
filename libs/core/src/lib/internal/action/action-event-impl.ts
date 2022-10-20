import { ActionEvent } from '../../actions/models';

export class ActionEventImpl implements ActionEvent {
  matchId: string;
  args: (string | number)[];

  constructor(public rawId: string) {
    this.matchId = rawId.replace(/\[\d+]/g, '');
    this.args = rawId.split('.')
        .map(idPart => {
          return idPart.split('[').map(arrayPart => {
            if (arrayPart.endsWith(']')) {
              return Number(arrayPart.substring(0, arrayPart.length - 1));
            } else {
              return arrayPart;
            }
          });
        })
        .reduce((last, current) => last.concat(current), []);
  }
}
