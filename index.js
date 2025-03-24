
class Character {
    static MAX_HEALTH = 100;
    
    constructor(name) {
      this.name = name;
      this.health = Character.MAX_HEALTH;
      this.inventory = [];
    }
    
    roll(mod = 0) {
      return Math.floor(Math.random() * 20) + 1 + mod;
    }
  }
  
  
  class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];
    
    constructor(name, role) {
      super(name);
      if (!Adventurer.ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      this.role = role;
      this.inventory.push("bedroll", "50 gold coins");
    }
    
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      console.log(`${this.name} rolled a ${this.roll()}.`);
    }
  
    duel(opponent) {
      if (!(opponent instanceof Adventurer)) {
        console.log("You can only duel another adventurer!");
        return;
      }
      console.log(`${this.name} challenges ${opponent.name} to a duel!`);
      
      while (this.health > 50 && opponent.health > 50) {
        let myRoll = this.roll();
        let oppRoll = opponent.roll();
        
        if (myRoll > oppRoll) {
          opponent.health -= 1;
          console.log(`${this.name} wins the round! ${opponent.name} now has ${opponent.health} health.`);
        } else if (oppRoll > myRoll) {
          this.health -= 1;
          console.log(`${opponent.name} wins the round! ${this.name} now has ${this.health} health.`);
        } else {
          console.log("It's a tie! No damage taken.");
        }
      }
      
      let winner = this.health > 50 ? this : opponent;
      console.log(`${winner.name} wins the duel!`);
    }
  }
  
  // Companion Class
  class Companion extends Character {
    constructor(name, type) {
      super(name);
      this.type = type;
    }
  }
  
  // Adventurer Factory
  class AdventurerFactory {  
    constructor(role) {
      if (!Adventurer.ROLES.includes(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      this.role = role;
      this.adventurers = [];
    }
    
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
      return newAdventurer;
    }
    
    findByName(name) {
      return this.adventurers.find((a) => a.name === name);
    }
  }
  

  const robin = new Adventurer("Robin", "Fighter");
  robin.inventory.push("sword", "potion", "artifact");
  
  robin.companion = new Companion("Leo", "Cat");
  robin.companion.companion = new Companion("Frank", "Flea");
  robin.companion.companion.inventory.push("small hat", "sunglasses");
  
  // Test Duel
  const alice = new Adventurer("Alice", "Wizard");
  robin.duel(alice)