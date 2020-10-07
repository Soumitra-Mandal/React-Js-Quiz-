import React from 'react';
import './App.css';
import Correct from './correct';
import Wrong from './wrong';
//import {useState} from 'react';


class App extends React.Component {
state={
  res:false,
  submit:false,
  question:'',
  incorrect:[],
  correct:''
}

componentDidMount() {
  this.fetchUsers();
}
 componentDidUpdate(){
 }


fetchUsers() {
  fetch(`https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple`)
    .then(response => response.json())
    .then(data =>
      {this.setState({
        question:data.results[0].question,
        correct:data.results[0].correct_answer,
        incorrect:[data.results[0].incorrect_answers[0],data.results[0].incorrect_answers[1],data.results[0].incorrect_answers[2]]
      }
        );}
    )
    .catch(error => this.setState({ error}));
}

  handleSubmit=(e)=>{
  e.preventDefault();
  this.setState({submit:true});
  }


  handleReset = (e)=>{
    e.preventDefault();
    this.setState({submit:false});

  }
  handleNew = (e)=>{
    e.preventDefault();
    this.fetchUsers();

  }

  handleChange=(e)=>{
if(this.state.correct===e.target.value){
  this.setState({res:true});
  }
  else{
    this.setState({res:false});

  }
}


  render(){
    if(this.state.submit===false){
      return (
        <div className="App">
        <form>
        <h1>{this.state.question}</h1>
        <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange}  />A. {this.state.correct}
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange}/>B. {this.state.incorrect[0]}
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange}/>C. {this.state.incorrect[1]}
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange}/>D. {this.state.incorrect[2]}

        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleNew}>New</button>

        </form>
        </div>
      );
    }

    else{
      if(this.state.res===true){
        return (
          <div className="App">
          <form>
          <h1>{this.state.question}</h1>
        <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange} checked="unchecked" disabled/>A. {this.state.correct}
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange} disabled/>B. {this.state.incorrect[0]}
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange} disabled/>C. {this.state.incorrect[1]}
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange} disabled/>D. {this.state.incorrect[2]}

          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleReset}>Reset</button>
          <button onClick={this.handleNew}>New</button>

          </form>
          <Correct/>
          </div>
        );
      }
      else{
        return (
          <div className="App">
          <form>
          <h1>{this.state.question}</h1>
          <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange} checked="unchecked" disabled/>A. {this.state.correct}
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange} disabled/>B. {this.state.incorrect[0]}
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange} disabled/>C. {this.state.incorrect[1]}
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange} disabled/>D. {this.state.incorrect[2]}
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleReset}>Reset</button>
          <button onClick={this.handleNew}>New</button>


          </form>
          <Wrong/>
          </div>
        );
      }
    }
    
  }
  
}

export default App;
