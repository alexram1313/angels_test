var self = {
    stats: {},
    loadData: function(){
        self.stats = Papa.parse('stats.csv', {
            download: true
        });
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    self.loadData();
    console.log(self.stats);
}); 