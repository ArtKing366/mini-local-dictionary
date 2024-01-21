class Dictionary {
    constructor() {
        this.words = this.loadWords();
    }

    loadWords() {
        const words = localStorage.getItem('words');
        return words ? JSON.parse(words) : {};
    }

    saveWords() {
        localStorage.setItem('words', JSON.stringify(this.words));
    }

    addWord(polish, russian) {
        if (this.words[polish] || this.words[russian]) {
            return 'Слово уже существует в словаре.';
        }
        this.words[polish] = russian;
        this.words[russian] = polish;
        this.saveWords();
        return 'Слово успешно добавлено.';
    }

    deleteWord(word) {
        const translation = this.words[word];
        if (translation) {
            delete this.words[word];
            delete this.words[translation];
            this.saveWords();
            return 'Слово успешно удалено.';
        } else {
            return 'Слово не найдено в словаре.';
        }
    }

    getRandomWord() {
        const keys = Object.keys(this.words);
        if (keys.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * keys.length);
        const word = keys[randomIndex];
        const translation = this.words[word];
        return { word, translation };
    }

    checkWord(word, translation) {
        // Видаляємо символи в дужках
        const cleanedWord = word.replace(/\(.*?\)/g, '');
        if (this.words[cleanedWord] === translation) {
            return true;
        } else {
            return false;
        }
    }
}

const dictionary = new Dictionary();

function addWord() {
    const polish = document.getElementById('polishWord').value;
    const russian = document.getElementById('translateWord').value;
    const message = dictionary.addWord(polish, russian);
    alert(message);
    document.getElementById('polishWord').value = '';
    document.getElementById('translateWord').value = '';
    updateWord();
}

function deleteWord() {
    const word = prompt('Введите слово для удаления:');
    const message = dictionary.deleteWord(word);
    alert(message);
    updateWord();
}

function checkTranslation() {
    const translation = document.getElementById('translation').value;
    const isCorrect = dictionary.checkWord(currentWord.word, translation);
    if (isCorrect) {
        document.getElementById('result').innerText = "Правильно!";
        updateWord();
    } else {
        document.getElementById('result').innerText = `Неправильно! Правильный перевод слова ${currentWord.word} - ${currentWord.translation}`;
    }
    document.getElementById('translation').value = '';
}

let currentWord = null;

function updateWord() {
    currentWord = dictionary.getRandomWord();
    if (currentWord) {
        document.getElementById('word').innerText = currentWord.word;
    } else {
        document.getElementById('word').innerText = '';
    }
}

updateWord();
