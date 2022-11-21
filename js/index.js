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

        var maxPercentage = self.stats.reduce((a, b) => a.meatball_percent > b.meatball_percent ? a : b).meatball_percent;

        // Populate rows
        for (let player of self.stats){
            var row = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');

            td1.className = 'player';
            td1.innerHTML = player[' first_name'] + ' ' + player.last_name;

            td2.className = 'chart';

            // Red meatball %
            var meatballPercDiv = document.createElement('div');
            meatballPercDiv.className = 'meatballperc';

            var widthPerc = (player.meatball_percent / maxPercentage) * 100;
            meatballPercDiv.innerHTML = '<span class="percLabel">'+player.meatball_percent+'%</span>';
            td2.appendChild(meatballPercDiv);
            var widthPercStr = widthPerc.toFixed(2) + '%';
            meatballPercDiv.setAttribute('style', 'width: ' + widthPercStr + ';');


            // Blue meatball swing %
            var meatballSwingPercDiv = document.createElement('div');
            meatballSwingPercDiv.className = 'meatballswingperc';

            var widthSwingStr = Number(player.meatball_swing_percent).toFixed(2) + '%';
            meatballSwingPercDiv.innerHTML = widthSwingStr;
            meatballPercDiv.appendChild(meatballSwingPercDiv);
            meatballSwingPercDiv.setAttribute('style', 'width: ' + widthSwingStr + ';');
            
            // Set tooltips
            meatballPercDiv.setAttribute('title', player.meatball_percent + "% of " + player.last_name + "'s pitches were meatballs.");
            meatballSwingPercDiv.setAttribute('title', widthSwingStr + " of " + player.last_name + "'s meatballs were swung at.");

            row.appendChild(td1);
            row.appendChild(td2);
            table.appendChild(row);
        }
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    self.loadData();
}); 