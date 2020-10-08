import React from 'react';
import './App.css';
import Correct from './correct';
import Wrong from './wrong';


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

  decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
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
  this.setState({submit:true});
  }


  handleReset = (e)=>{
    e.preventDefault();
    this.setState({submit:false});

  }
  handleNew = (e)=>{
    e.preventDefault();
    this.setState({submit:false});
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
        <h1>{this.decodeHtml(this.state.question)}</h1>
        <form>
        <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange} /><p>A. {this.decodeHtml(this.state.correct)}</p>
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange}/><p>B. {this.decodeHtml(this.state.incorrect[0])}</p>
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange}/><p>C. {this.decodeHtml(this.state.incorrect[1])}</p>
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange} /><p>D. {this.decodeHtml(this.state.incorrect[2])}</p>
        </form>
        <div id ='buttons'> 
        <button onClick={this.handleSubmit} id = "submit">Submit</button>
        <button onClick={this.handleNew} id  = 'new'>New</button>
        </div>
      
        </div>
      );
    }

    else{
      if(this.state.res===true){
        return (
          <div className="App">
        <h1>{this.decodeHtml(this.state.question)}</h1>
          <form>
        <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange}  checked ='unchecked' disabled/>A. {this.decodeHtml(this.state.correct)}
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange}  disabled/>B. {this.decodeHtml(this.state.incorrect[0])}
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange}  disabled/>C. {this.decodeHtml(this.state.incorrect[1])}
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange}  disabled/>D. {this.decodeHtml(this.state.incorrect[2])}

          </form>
          <div id = 'buttons'>
          <button onClick={this.handleSubmit} id = "submit">Submit</button>
          <button onClick={this.handleReset} id="reset">Reset</button>
          <button onClick={this.handleNew} id  = 'new'>New</button>
          </div>
          <Correct/>
          </div>
        );
      }
      else{
        return (
          <div className="App">
        <h1>{this.decodeHtml(this.state.question)}</h1>
          <form>
          <input type='radio' value={this.state.correct} name='answer' onChange ={this.handleChange}   disabled/>A. {this.decodeHtml(this.state.correct)}
        <input type='radio' value={this.state.incorrect[0]} name='answer' onChange ={this.handleChange}  disabled/>B. {this.decodeHtml(this.state.incorrect[0])}
        <input type='radio' value={this.state.incorrect[1]} name='answer' onChange ={this.handleChange}  disabled/>C. {this.decodeHtml(this.state.incorrect[1])}
        <input type='radio' value={this.state.incorrect[2]} name='answer' onChange ={this.handleChange}  disabled/>D. {this.decodeHtml(this.state.incorrect[2])}
          
         </form>
         <div id = 'buttons'>
          <button onClick={this.handleSubmit} id = "submit">Submit</button>
          <button onClick={this.handleReset} id="reset">Reset</button>
          <button onClick={this.handleNew} id  = 'new'>New</button>
          </div>
          <Wrong/>
          </div>
        );
      }
    }
    
  }
  
}

export default App;
