class Table {
    setPlayers() {
        let thead = d3.select("thead").selectAll("th")
            .data(d3.keys(this.players[0]))
            .enter().append("th").text(function (d) {
                return d;
            });

        let tr = d3.select("tbody").selectAll("tr")
            .data(this.players).enter().append("tr");

        let td = tr.selectAll("td")
            .data(function (d) {
                return d3.values(d);
            })
            .enter().append("td")
            .text(function (d) {
                return d;
            })
    }

    load(pairingData) {
        this.players = pairingData.map(e => {
            return {'Pair Name': `${e[0]} & ${e[1]}`, 'Number Of Times Paired': e[2]}
        });
        this.setPlayers();
    }
}