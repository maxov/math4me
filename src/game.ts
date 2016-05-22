import User from "./user";

let gameId = 0;

export class Game {
  users: Array<User>;
  id: number;
  constructor() {
    this.id = gameId;
    gameId++;
  }

  addUser(name: String): User {
    let newUser = new User(this.users.length, name);
    this.users.push(newUser);
    return newUser;
  }
  
}

let games: {[id: number]: Game} = {};

export function hasId(id: number) {
  return id in games;
}

export function addGame(game: Game) {
  games[game.id] = game;
}