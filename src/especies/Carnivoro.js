import Animal from "./Animal";

class Carnivoro extends Animal {

  tolera(recinto) {
    if (this.carnivoro && recinto.animaisExistentes.filter((animal) => animal.especie !== this.especie).length > 0){
      return false; // Animal é carnivoro, e recinto possui animais de especies diferentes
    }
    return true;
  }

}

export default Carnivoro;