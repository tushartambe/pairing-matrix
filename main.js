$(document).ready(
    function () {
        // $("#pairing_text").keyup(displayPairNames);
        // $("#regex").keyup(displayPairNames);

        // $("#go").click(function () {
        // $('.accordion-toggle').trigger("click");
        const pairs = [["T", "X"], ['a', 'b'], ['c', 'd'], ['e', 'f'], ['g', 'h'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['a', 'm'], ['Y']];
        const model = convert(pairs);
        draw(model);
        // });

        // var previousRegex = localStorage[REGEX_KEY];
        // if (previousRegex) {
        //     $("#regex").val(previousRegex);
        // }
    }
)

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