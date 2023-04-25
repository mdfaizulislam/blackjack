export class CardDeck {
    private mCardValues: number[] = [];

    public static createCardDeck(): CardDeck {
        return new CardDeck();
    }

    constructor() {
        this.initCardDeck();
        this.shuffleDeck(this.mCardValues);
    }

    private initCardDeck(): void {
        for (let i = 1; i < 53; i += 1) {
            this.mCardValues.push(i);
        }
    }

    private shuffleDeck(array: number[]) {
        let currentIndex: number = array.length;
        let temporaryValue: number;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    public getNextCard(): number {
        if (this.mCardValues.length > 0) {
            let cardValue = this.mCardValues.pop() as number;
            return cardValue;
        }
        throw new Error('Deck is empty');
    }

    public getDeckAsString(): string {
        let deckString = '';
        let types = ['C', 'H', 'D', 'S'];
        let values = [
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            'J',
            'K',
            'Q',
            'A'
        ];
        this.mCardValues.forEach((value) => {
            let actualValue = value % 13;
            deckString +=
                types[Math.floor(value / 13)] + values[actualValue] + ' ';
        });
        return deckString;
    }
}
