import { Player } from './player.model';

export class PlayerPreferences {
  private readonly preferences: {[playerId: number]: number[]} = {};
  // private readonly playersById: {[playerId: number]: Player} = {};

  /**
   * Create a player preferences object for assisting with player pairing.
   * @param players An already sorted array of players.
   */
  constructor(players: Player[]) {
    players = players;
    // const needsBye = players.length % 2 === 1;

    // const playerIds = players.map((player: Player) => {
    //   return player.id;
    // });

    // players.forEach((player: Player) => {
    //   this.playersById[player.id] = player;

    //   const potentialOppIds = playerIds.filter((oppId: number) => {
    //     return oppId !== player.id && player.opponentIds.indexOf(oppId) === -1;
    //   });

    //   if (needsBye) {
    //     potentialOppIds.push(-1);
    //   }

    //   this.preferences[player.id] = potentialOppIds;
    // });

    // if (needsBye) {
    //   this.preferences[-1] = playerIds;
    // }
  }

  isListNonEmpty(playerId: number): boolean {
    return this.preferences[playerId].length > 0;
  }

  getFirstTieGroupForPlayerId(playerId: number): number[] {
    const playerPrefList = this.preferences[playerId];
    const result = [];

    if (playerPrefList.length < 1) {
      return [];
    }

    const firstOppId = playerPrefList[0];

    if (firstOppId === -1) {
      return [-1];
    }

    // const firstOpp = this.playersById[firstOppId];
    // const matchPoints = firstOpp.matchPoints;
    result.push(firstOppId);

    for (let i = 1; i < playerPrefList.length; i++) {
      // const oppId = playerPrefList[i];
      // const opp = this.playersById[oppId];

      // if (opp.matchPoints === matchPoints) {
      //   result.push(oppId);
      // } else {
      //   break;
      // }
    }

    return result;
  }
}
