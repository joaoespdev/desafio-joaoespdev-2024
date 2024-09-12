class RecintosZoo {
    constructor() {
        // Definindo os recintos e os animais suportados
        this.recintos = [
            { numero: 1, bioma: 'savana1', tamanho: 10, ocupados: 3, especies: ['MACACO'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: 0, especies: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: 2, especies: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupados: 0, especies: [] },
            { numero: 5, bioma: 'savana2', tamanho: 9, ocupados: 3, especies: ['LEAO'] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana2'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana2'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana1', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana1'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana1', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Validação do animal
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
        // Validação da quantidade
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const especie = this.animais[animal];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            // Verifica se o bioma é compatível
            if (!especie.biomas.includes(recinto.bioma) && !(especie.biomas.includes('savana1') && !(especie.biomas.includes('savana2') && recinto.bioma === 'savana1 e rio'))) {
                continue;
            }

            // Calcula o espaço livre no recinto
            let espacoDisponivel = recinto.tamanho - recinto.ocupados;

            // Regras específicas para carnívoros
            if (especie.carnivoro && recinto.especies.length > 0 && recinto.especies[0] !== animal) {
                continue; // Carnívoros só podem dividir recinto com a própria espécie
            }

            // Se for macaco, verificar se há companhia no recinto
            if (animal === 'MACACO' && recinto.especies.length === 0 && quantidade === 1) {
                continue; // Macacos precisam de companhia
            }

            // Verifica se o recinto tem espaço suficiente para o novo lote de animais
            let espacoNecessario = especie.tamanho * quantidade;
            if (recinto.especies.length > 0 && recinto.especies[0] !== animal) {
                espacoNecessario += 1; // Se houver mistura de espécies, adicionar 1 espaço extra
            }

            if (espacoDisponivel >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
