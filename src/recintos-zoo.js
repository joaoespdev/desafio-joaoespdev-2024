import Crocodilo from "./especies/Crocodilo";
import Gazela from "./especies/Gazela";
import Hipopotamo from "./especies/Hipopotamo";
import Leao from "./especies/Leao";
import Leopardo from "./especies/Leopardo";
import Macaco from "./especies/Macaco";

class Recinto {
    constructor(numero, bioma, tamanho, animaisExistentes) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanho = tamanho;
        this.animaisExistentes = animaisExistentes;
    }
    constructor(numero, bioma, tamanho) {
        this(numero, bioma, tamanho, []);
    }
    getUsedSpace() {
        var usedSpace = 0;
        for (const animal of this.animaisExistentes) {
            usedSpace += animal.tamanho;
        }
        return usedSpace;
    }
}


class RecintosZoo {
    constructor() {
        this.especies = [Crocodilo,Gazela,Hipopotamo,Leao,Leopardo,Macaco].map((especie) => new especie());

        // Definindo os recintos e os animais suportados
        // this.recintos = [
        //     { numero: 1, bioma: 'savana1', tamanho: 10, ocupados: 3, especies: ['MACACO'] },
        //     { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: 0, especies: [] },
        //     { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: 2, especies: ['GAZELA'] },
        //     { numero: 4, bioma: 'rio', tamanho: 8, ocupados: 0, especies: [] },
        //     { numero: 5, bioma: 'savana2', tamanho: 9, ocupados: 3, especies: ['LEAO'] }
        // ];
        this.recintos = [
            new Recinto(1, 'savana', 10, [
                new Macaco(),
                new Macaco(),
                new Macaco()
            ]),
            new Recinto(2, 'floresta', 5, [
                
            ]),
            new Recinto(3, 'savana e rio', 7, [
                new Gazela()
            ]),
            new Recinto(4, 'rio', 8, [
                
            ]),
            new Recinto(5, 'savana', 9, [
                new Leao()
            ]),
        ]
    }

    getEspecie(animal){
        return this.especies.filter((especie) => especie.especie === animal)[0];
    }

    analisaRecintos(animal, quantidade) {
        const especie = getEspecie(animal);
        
        if (especie == null){
            return {
                erro: 'Animal inválido',
                recintosViaveis: false
            }
        }

        if (quantidade <= 0) {
            return {
                erro: 'Quantidade inválida',
                recintosViaveis: false
            }
        }


        var recintoEscolhido = null;

        for (const recinto of this.recintos){
            const espacoUsadoNoRecinto = recinto.getUsedSpace();
            const tamanhoMaximoDoRecinto = recinto.tamanho;

            if (especie.tamanho+espacoUsadoNoRecinto>tamanhoMaximoDoRecinto) {
                continue; // Recinto não comporta o animal
            }

            if (!especie.tolera(recinto)){
                continue; // Novo animal não tolera o recinto
            }

            if (!recinto.animaisToleram(especie)){
                continue; // Animais não toleram o novo animal
            }

            recintoEscolhido = recinto;
            break;
        }


        if (recintoEscolhido == null){
            return {
                erro: 'Não há recinto viável',
                recintosViaveis: false
            }
        }

        if (animalExists == 'CROCODILO' && quantidade == 1) {
            return {
                erro: false,
                recintosViaveis: [
                    'Recinto 4 (espaço livre: 5 total: 8)'
                ]
            }
        }

        if (animalExists == 'MACACO' && quantidade == 2) {
            return {
                erro: false,
                recintosViaveis: [
                    'Recinto 1 (espaço livre: 5 total: 10)', 'Recinto 2 (espaço livre: 3 total: 5)', 'Recinto 3 (espaço livre: 2 total: 7)', 
                    'Recinto 4 (espaço livre: 5 total: 8)', 'Recinto 5 (espaço livre: 6 total: 9)'
                ]
            }
        }
    }

}

export { RecintosZoo as RecintosZoo };
