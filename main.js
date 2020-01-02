$(document).ready(
    function () {
        // $("#pairing_text").keyup(displayPairNames);
        // $("#regex").keyup(displayPairNames);
        const pairs = [["T", "X"], ['a', 'b'], ['c', 'd'], ['e', 'f'], ['g', 'h'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['Y']];
        const model = convert(pairs);
        drawPairingTable(model);

        $("#go").click(function () {
            draw(model);
        });

        // var previousRegex = localStorage[REGEX_KEY];
        // if (previousRegex) {
        //     $("#regex").val(previousRegex);
        // }
    }
);

function convert(pairs) {
    const uniquePairsCount = _.countBy(pairs, function (pair) {
        return _.sortBy(pair, function (person) {
            return person;
        })
    });
    const requiredFormat = _.map(_.pairs(uniquePairsCount), function (model) {
        return _.flatten([model[0].split(','), model[1]])
    });
    return requiredFormat;
}

function draw(model) {
    const playground = new PlayGround(".area");
    playground.load(model);
}

function withTags(tag, content) {
    return ["<", tag, ">", content, "<", "/", tag, ">"].join("");
}

function createTable() {
    let model = [["T", "X", 1], ['a', 'b', 1], ['c', 'd', 1], ['e', 'f', 5], ['g', 'h', 6]];
    let text = "";
    for (let i = 0; i < model.length; i++) {
        let content = "";
        for (let j = 0; j < model[i].length; j++) {
            content += this.withTags('td', model[i][j])
        }
        text += this.withTags('tr', content)
    }
    return text;
}

function drawPairingTable(model) {
    const table = new Table();
    table.load(model)
}