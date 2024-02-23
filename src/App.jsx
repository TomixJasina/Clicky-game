import React, { Component } from "react";
import enemies from "./cards.json";
import Scoreboard from "./components/score.jsx";
import Card from "./components/ImgCard.jsx";

// shuffle upon each click
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    enemies,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    clickedEnemies: []
  };

  clickedImage = id => {
    // assign the state of the empty array to a let to be updated
    let clickedEnemies = this.state.clickedEnemies;
    let score = this.state.score;
    let topScore = this.state.topScore;
    this.setState({
      showAlert: 0
    });

    // if the clicked image has an id of the indexed paintings
    if (clickedEnemies.indexOf(id) === -1) {
      // push that id into that id into the array to be stored
      clickedEnemies.push(id);
      console.log(clickedEnemies);
      // run the score function
      this.handleIncrement();
      // run the reshuffle function after each click
      this.makeShuffle();
    } else if (this.state.score === 12) {
      // alert player wins
      this.setState({
        showSuccess: 1,
        score: 0,
        clickedpaintings: []
      });
    } else {
       // alert player loss
      this.setState({
        score: 0,
        clickedpaintings: []
      });
      console.log("duplicate");
      this.setState({
        showAlert: 1
      });
    }

    if (score > topScore) {
      this.setState({
        topScore: score
      });
    }
  };

  // handleIncrement increases this.state.score by 1
  handleIncrement = () => {
    // setState updates a components states
    this.setState({ score: this.state.score + 1 });
  };

  // shuffle up images
  makeShuffle = () => {
    this.setState({ paintings: shuffle(enemies) });
  };

  render() {
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ opacity: this.state.showAlert }}
        >
          You clicked on this already, try again...
          </div>
        <div
          className="alert alert-success"
          style={{ opacity: this.state.showSuccess }}
        >
          Brilliant, you haven't clicked on duplicates!
          </div>
        <Scoreboard
          title="MoMA clicky Game"
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="row">
          {this.state.enemies.map(enemies => (
            <Card
              key={enemies.id}
              id={enemies.id}
              title={enemies.title}
              image={enemies.image}
              clickedImage={this.clickedImage}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;