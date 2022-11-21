var self = {
    stats: {},
    loadData: function(){
        Papa.parse('https://raw.githubusercontent.com/alexram1313/angels_test/master/stats.csv', {
            download: true,
            header: true,
            complete: function(results, file) {
                self.stats = results.data;
                console.log(self.stats);
                self.initTable();
            }
        });
    },
    initTable: function(){
        var table = document.getElementById('visualization');
        var rows = table.getElementsByClassName('data-entry');
        // Clear rows
        for (let row of rows) {
            row.remove();
        }

        // Populate rows
        for (let player of self.stats){
            var row = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');

            td1.innerHTML = player[' first_name'] + ' ' + player.last_name;

            row.appendChild(td1);
            row.appendChild(td2);
            table.appendChild(row);
        }
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    self.loadData();
}); 