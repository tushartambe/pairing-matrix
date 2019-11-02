let playground;

class PlayGround {
    constructor(selector) {
        this.el = null;
        this.centerX = 400;
        this.centerY = 350;
        this.radius = 300;
        this.selector = selector;

        this.pairingData = [];
        this.playersData = [];

        this.connectionScale = d3.scale.linear()
            .domain([0, 200])
            .range([0, 50]);

        this.init();
    }

    init() {
        playground = this;
        this.el = d3.select(this.selector);
    }

    getPlayerNames(pairingData) {
        let playerNames = [];
        _.each(pairingData, function (data) {
            playerNames.push(data[0]);
            playerNames.push(data[1]);
        });
        playerNames = _.compact(playerNames);
        return _.sortBy(_.uniq(playerNames), function (d) {
            return d
        });
    }

    setGround() {
        this.el.append("circle")
            .attr("cx", this.centerX)
            .attr("cy", this.centerY)
            .attr("r", this.radius)
            .style("fill-opacity", 0.05);
    }

    setPlayers() {
        const colors = d3.scale.category20();
        const players = this.el.selectAll(".players")
            .data(playground.playersData)
            .enter()
            .append("g");

        players.append("circle")
            .attr("cx", function (d, i) {
                return playground.getPlayerCoordinates(i).x
            })
            .attr("cy", function (d, i) {
                return playground.getPlayerCoordinates(i).y
            })
            .attr("r", 20)
            .attr("fill", colors)
            .attr("fill-opacity", 0.75)
            .attr("stroke", "#EE1031")
            .attr("stroke-opacity", 0.75)
            .attr("stroke-width", function (d) {
                return playground.connectionScale(playground.getSoloContribution(d))
            })
            .attr("z-index", 10)
            .attr("class", "player")
            .attr("id", function (d) {
                return d
            });

        players.append("text")
            .attr("class", "player_names")
            .text(function (d) {
                return d
            })
            .attr("x", function (d, i) {
                return playground.getPlayerCoordinates(i).x + 2
            })
            .attr("y", function (d, i) {
                return playground.getPlayerCoordinates(i).y + 3
            })
            .attr("fill", "#000000");
    }

    clear() {
        $(this.selector).children().remove();
    }

    load(pairingData) {
        this.pairingData = pairingData;
        this.validPairsData = this.getValidPairs(pairingData);
        this.playersData = this.getPlayerNames(pairingData);
        this.clear();
        this.setGround();
        this.setPairing();
        this.setPlayers();
    }

    getPlayerCoordinates(index) {
        const distanceInDegrees = 2 * Math.PI / playground.playersData.length;
        return {
            x: (playground.radius * Math.sin(distanceInDegrees * index) + playground.centerX),
            y: (playground.radius * Math.cos(distanceInDegrees * index) + playground.centerY)
        }
    }

    getSoloContribution(name) {
        const contrib = _.find(this.pairingData, function (data) {
            return ((data[0] == name && _.isEmpty(data[1])) || (data[1] == name && _.isEmpty(data[0])));
        });
        return contrib ? contrib[2] : 1;
    }

    getValidPairs(pairingData) {
        return _.filter(pairingData, function (data) {
            return (!_.isEmpty(data[0]) && !_.isEmpty(data[1]));
        })
    }

    setPairing() {
        this.el.selectAll(".connect")
            .data(playground.validPairsData)
            .enter().append("path")
            .attr("class", "connect")
            .attr("d", function (d) {
                const fromIndex = _.indexOf(playground.playersData, d[0]),
                    fromCoordinates = playground.getPlayerCoordinates(fromIndex);
                const toIndex = (d[1] == "") ? fromIndex : _.indexOf(playground.playersData, d[1]),
                    toCoordinates = playground.getPlayerCoordinates(toIndex);
                return "M " + fromCoordinates.x + " " + fromCoordinates.y + " Q 400 350 " +
                    toCoordinates.x + " " + toCoordinates.y;
            })
            .attr('id', function (d) {
                return `${d[0]}_${d[1]}_${d[2]}`
            })
            .attr("fill", "none")
            .attr("stroke", "#DD1031")
            .attr("stroke-width", function (d) {
                return playground.connectionScale(d[2])
            })
            .attr("stroke-opacity", 0.75)
            .attr("data-from", function (d) {
                return d[0]
            })
            .attr("data-to", function (d) {
                return d[1]
            });
    }
}