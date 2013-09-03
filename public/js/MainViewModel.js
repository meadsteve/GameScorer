// Class to represent a single Player
function PlayerViewModel(name, initialScore) {
    var self = this;

	// Defaults
	if (typeof initialScore == "undefined") {
		initialScore = 0;
	}

    self.name = ko.observable(name);
    self.score = ko.observable(initialScore);

	self.isNew = ko.observable(true);
}

// Overall viewmodel for this screen. Contains all players
function GameViewModel() {
    var self = this;

	/******************** Properties *****************/

    /* All of the players. */
    self.players = ko.observableArray([new PlayerViewModel()]);

	self.changeLocked = ko.observable(false);

	self.beginGameLabel = ko.observable("Begin Game!");

	/******************** Functions *****************/

	self.addNewTriggeredBy = function(OldPlayer) {
		var newPlayer = new PlayerViewModel("");
		self.players.push(newPlayer);
		if (OldPlayer instanceof PlayerViewModel) {
			OldPlayer.isNew(false);
		}
	};

	self.playerFocus = function(PlayerObj) {
		if (PlayerObj instanceof PlayerViewModel) {
			if (PlayerObj.isNew()) {
				self.addNewTriggeredBy(PlayerObj);
			}
		}
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

	self.beginGame = function() {
		self.changeLocked(true);
	};

	self.editGame = function() {
		self.changeLocked(false);
		self.beginGameLabel("Resume Game!!");
	};
}

ko.applyBindings(new GameViewModel());