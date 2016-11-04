var MatchEntry = React.createClass({
  getInitialState: function(){
    return{
      matches: [],
      results: [],
      bracket: {}
    }
  },
  addMatch: function(){
    console.log("Ni Hao!")
    var matchesCopy = this.state.matches;
    var resultsCopy = this.state.results;
    matchesCopy.push(["Team 1", "Team 2"]);
    resultsCopy.push([null,null])
    this.setState({matches: matchesCopy})
  },
  updateTeam: function(index, team){
    var newValue = event.target.value;
    var matchesCopy = this.state.matches;

    matchesCopy[index][team] = newValue;

    this.setState({matches: matchesCopy})

  },
  updateScore: function(index, team){
    var newValue = event.target.value;
    var resultsCopy = this.state.results;
    resultsCopy[index][team] = newValue;

    this.setState({results: resultsCopy});
  },
  createBracket: function(){
    var bracket = {
      teams: this.state.matches,
      results: this.state.results
    }

    function saveFn(data, userData){
      var json = $.toJSON(data);
      
    }

    $('#bracket').bracket({
      init: bracket,
      save: saveFn
     })

    console.log(bracket);
  },
  render: function(){
    var nodes = this.state.matches.map(function(n,i){
      return(
        <div>
          <input type="text" value={n[0]} onChange={function(){this.updateTeam(i, 0)}.bind(this)}/>
          <input type="number" onChange={function(){this.updateScore(i, 0)}.bind(this)}/>
          Vs.
          <input type="number" onChange={function(){this.updateScore(i, 1)}.bind(this)} />
          <input type="text" value={n[1]} onChange={function(){this.updateTeam(i, 1)}.bind(this)} />
        </div>
      )
    }.bind(this))
    return(
      <div>
        {nodes}
        <br/>
        <button className="btn btn-primary" onClick={this.addMatch} text="Add Match!">Add Match! </button>
        <button className="btn btn-primary" onClick={this.createBracket}>Create Bracket!</button>
      </div>
    )
  }
})


ReactDOM.render(
  <MatchEntry />,
  document.getElementById('tournamentEntry')
)
