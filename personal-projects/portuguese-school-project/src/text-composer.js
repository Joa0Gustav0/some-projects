var CONTAINER_FOR_TARGET_TEXT = document.querySelector(".game-target-text-container__target-text");
var EDITABLE_WORDS_ELEMENTS = document.getElementsByClassName("editable-char");
function render(mode, target, innerValue) {
    if (mode === "modify") {
        target.innerHTML = innerValue.toString();
    }
    else {
        target.innerHTML += innerValue.toString();
    }
}
var TargetText = /** @class */ (function () {
    function TargetText() {
        this.mutableWords = [];
        this.getNewText();
        this.unaccentuateText();
        this.displayText();
    }
    TargetText.prototype.getNewText = function () {
        var availableTexts = TargetText.TEXTS.filter(function (text) { return !text.alreadyUsed; });
        var reachedText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
        this.mutableWords = reachedText.multableKeywords;
        TargetText.TEXTS.forEach(function (element) {
            if (element.text === reachedText.text) {
                element.alreadyUsed = true;
            }
        });
        TargetText.content = reachedText.text;
    };
    TargetText.prototype.unaccentuateText = function () {
        var _this = this;
        var TEXT_WORDS = TargetText.content.split(" ");
        TEXT_WORDS.forEach(function (word) {
            var _a;
            if ((_a = _this.mutableWords) === null || _a === void 0 ? void 0 : _a.includes(word)) {
                word = _this.unaccentuateWord(word);
            }
            TargetText.formatedContent += word + " ";
        });
    };
    TargetText.prototype.unaccentuateWord = function (word) {
        var POSSIBLE_ACCENTUATIONS = "áâéêíóôúû";
        var UNACCENTUATIONS = "aaeeioouu";
        var WORD_CHARS = Array.from(word);
        word = "";
        WORD_CHARS.forEach(function (char) {
            if (POSSIBLE_ACCENTUATIONS.indexOf(char) > -1) {
                char = UNACCENTUATIONS[POSSIBLE_ACCENTUATIONS.indexOf(char)];
            }
            word += char;
        });
        return word;
    };
    TargetText.prototype.displayText = function () {
        var _this = this;
        render("modify", CONTAINER_FOR_TARGET_TEXT, "");
        var TEXT_WORDS = TargetText.formatedContent.split(" ");
        TEXT_WORDS.forEach(function (word) {
            var newWordElement = "<div class=\"full-word\">";
            var WORD_CHARS = Array.from(word);
            WORD_CHARS.forEach(function (char, index) {
                newWordElement += _this.createEditableCharElement(char);
            });
            newWordElement += "</div>";
            render("keep", CONTAINER_FOR_TARGET_TEXT, newWordElement);
        });
        this.setEditableElementsEventListeners();
    };
    TargetText.prototype.getCharPossibleAccentuations = function (entryChar) {
        var POSSIBLE_ACCENTUATIONS = "áâéêíîóôúû";
        var UNACCENTUATIONS = "aaeeiioouu";
        var CHAR_INDEX = POSSIBLE_ACCENTUATIONS.includes(entryChar.toLowerCase())
            ? POSSIBLE_ACCENTUATIONS.indexOf(entryChar.toLowerCase())
            : UNACCENTUATIONS.indexOf(entryChar.toLowerCase());
        var isCircumflex = CHAR_INDEX % 2 !== 0;
        return [
            UNACCENTUATIONS[CHAR_INDEX],
            isCircumflex
                ? POSSIBLE_ACCENTUATIONS[CHAR_INDEX - 1]
                : POSSIBLE_ACCENTUATIONS[CHAR_INDEX],
            isCircumflex
                ? entryChar.toLowerCase()
                : POSSIBLE_ACCENTUATIONS[CHAR_INDEX + 1],
        ];
    };
    TargetText.prototype.createEditableCharElement = function (char) {
        var VOWELS = "aeiouáâéêíóôúû";
        var CONTAINER_SIGNS_BUTTONS = "";
        this.getCharPossibleAccentuations(char).forEach(function (accentuatedChar) {
            CONTAINER_SIGNS_BUTTONS += "<button class=\"editable-char__edit-container__buttons\" onClick=\"editAccentuation(this)\">".concat(accentuatedChar, "</button>");
        });
        if (" .,!".includes(char)) {
            return char;
        }
        return "<span class=\"editable-char\">".concat(char, "<span class=\"editable-char__edit-container\">\n      ").concat(VOWELS.includes(char.toLowerCase())
            ? CONTAINER_SIGNS_BUTTONS
            : "Acento aqui não! ❌", "<div class=\"editable-char__edit-container__index\"></div></span></span>");
    };
    TargetText.prototype.setEditableElementsEventListeners = function () {
        if (EDITABLE_WORDS_ELEMENTS) {
            Array.from(EDITABLE_WORDS_ELEMENTS).forEach(function (element) {
                element.addEventListener("click", function (event) {
                    setWordEditableMode(event.target);
                });
            });
        }
    };
    TargetText.TEXTS = [
        {
            text: "Alicia tem um tênis caríssimo!",
            alreadyUsed: false,
        },
        {
            text: "Os Flintstones têm um carro de pedra.",
            multableKeywords: ["têm"],
            alreadyUsed: false,
        },
        {
            text: "A mensagem vem de muito longe...",
            multableKeywords: [],
            alreadyUsed: false,
        },
        {
            text: "Os tripulantes vêm de lugares distantes!",
            multableKeywords: ["vêm"],
            alreadyUsed: false,
        },
        {
            text: "Minha família me mantém até eu arranjar um emprego.",
            multableKeywords: ["mantém"],
            alreadyUsed: false,
        },
        {
            text: "Aquelas senhoras mantêm segredos abomináveis!",
            multableKeywords: ["mantêm"],
            alreadyUsed: false,
        },
        {
            text: "Ele só colabora quando o convém.",
            multableKeywords: ["convém."],
            alreadyUsed: false,
        },
        {
            text: "Quando lhe convêm, você se interessa por minhas histórias.",
            multableKeywords: ["convêm,"],
            alreadyUsed: false,
        },
        {
            text: "Hoje, ele não nos detém, uma vez que, ontem, já não pôde.",
            multableKeywords: ["detém,", "pôde."],
            alreadyUsed: false,
        },
        {
            text: "Nesse momento, os policiais não nos detêm em casa, pois não têm um mandado.",
            multableKeywords: ["detêm", "têm"],
            alreadyUsed: false,
        },
    ];
    TargetText.formatedContent = "";
    return TargetText;
}());
new TargetText();
function editAccentuation(selectedAccentuation) {
    var _a;
    var currentCharElement = (_a = selectedAccentuation.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
    currentCharElement.innerHTML = currentCharElement.innerHTML.replace(currentCharElement.innerHTML[0], selectedAccentuation.innerHTML);
}
function setWordEditableMode(targetWordElement) {
    if (targetWordElement.classList.contains("editing-char")) {
        targetWordElement.classList.remove("editing-char");
        return;
    }
    Array.from(EDITABLE_WORDS_ELEMENTS).forEach(function (element) {
        element.classList.remove("editing-char");
    });
    targetWordElement.classList.add("editing-char");
}
var SPELLER_BUTTON = document.querySelector(".check-result-button");
SPELLER_BUTTON.addEventListener("click", function () {
    var correctTextChars = getCorrectTextChars();
    var editedTextChars = getEditedTextChars();
    compareTexts(correctTextChars, editedTextChars);
});
function getCorrectTextChars() {
    return Array.from(TargetText.content.toLowerCase()).filter(function (char) { return !" .,!".includes(char); });
}
function getEditedTextChars() {
    return Array.from(document.getElementsByClassName("editable-char")).map(function (element) { return element.innerHTML[0].toLowerCase(); });
}
function compareTexts(modelText, analisedText) {
    modelText.forEach(function (char, index) {
        if (char !== analisedText[index]) {
            setWordStatus(index, "error");
        }
        else {
            setWordStatus(index, "correct");
        }
    });
}
function setWordStatus(index, status) {
    var _a, _b, _c, _d;
    var allChars = document.getElementsByClassName("editable-char");
    if (status === "correct") {
        (_b = (_a = allChars[index]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("correct-word");
    }
    else {
        (_d = (_c = allChars[index]) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("error-word");
    }
}