var Furry = require("/furry.js");
var Coin = require("/coin.js");

var Game = function() {
    var self = this;
    this.board = document.querySelectorAll('#board > div')
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x,y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.board[this.index(this.furry.x,this.furry.y)]
        .classList.add('furry');
    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x,this.coin.y)]
        .classList.add('coin');
    }


    this.moveFurry = function() {
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }

        self.checkCoinCollision();
        self.gameOver();
        self.hideVisibleFurry();
        self.showFurry();
    }

    this.hideVisibleFurry = function() {
        var visibleFurry = document.querySelector('.furry');
        visibleFurry.classList.remove('furry');
    }

    this.turnFurry = function(event){
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';
                break;
            case 38:
                self.furry.direction = 'top';
                break;
            case 39:
                self.furry.direction = 'right';
                break;
            case 40:
                self.furry.direction = 'down';
                break;
            }
    }

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert("Game over! Twój wynik " + this.score );
        }
    }

    this.checkCoinCollision = function() {
        if (this.furry.x == this.coin.x && this.coin.y == this.furry.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score++;
            document.querySelector("#score div strong").innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250)
    }
};

module.exports = Game;
