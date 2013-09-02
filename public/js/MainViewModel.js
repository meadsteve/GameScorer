// Class to represent a single Player
function PlayerViewModel(name, initialScore) {
    var self = this;

	// Defaults
	if (typeof initialScore == "undefined") {
		initialScore = 0;
	}

    self.name = ko.observable(name);
    self.initialScore = ko.observable(initialScore);
}

// Overall viewmodel for this screen. Contains all players
function GameViewModel() {
    var self = this;

    // Editable data
    self.players = ko.observableArray([

    ]);

	self.newPlayerName =  ko.observable("");

	self.addNew = function(arg) {
		self.players.push(new PlayerViewModel(self.newPlayerName()));
		self.newPlayerName("");
	};
}

ko.applyBindings(new GameViewModel());