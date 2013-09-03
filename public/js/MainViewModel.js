// Class to represent a single Player
function PlayerViewModel(name, initialScore) {
    var self = this;

	// Defaults
	if (typeof initialScore == "undefined") {
		initialScore = 0;
	}

    self.name = ko.observable(name);
    self.score = ko.observable(initialScore);
}

// Overall viewmodel for this screen. Contains all players
function GameViewModel() {
    var self = this;

	/******************** Properties *****************/

    /* All of the players. */
    self.players = ko.observableArray([]);
	/* Next added player. */
	self.newPlayerName = ko.observable("");


	/******************** Functions *****************/

	self.addNew = function() {
		self.players.push(new PlayerViewModel(self.newPlayerName()));
		self.newPlayerName("");
	};

	self.removePlayer = function(Player) {
		self.players.remove(Player);
	};

	self.sortPlayers = function() {
		self.players.sort(function(a, b) {
			var aScore = a.score();
			var bScore = b.score();
			if (aScore == bScore) {
				return 0;
			}
			else {
				return (aScore < bScore) ? 1 : -1;
			}
		});
	};
}

ko.applyBindings(new GameViewModel());