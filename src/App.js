import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Correct from './correct';
import Wrong from './wrong';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';


class App extends React.Component {
state={
  res:false,
  submit:false,
  question:'',
  incorrect:[],
  correct:'',
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
        <AppBar position="static">
  <Toolbar>
    <IconButton edge="start"  color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" >
      QUIZ
    </Typography>
  </Toolbar>
</AppBar>      
        <h1>{this.decodeHtml(this.state.question)}</h1>
        <FormControl component ='fieldset'>
        <RadioGroup aria-label="gender" name="answer" >

        <FormControlLabel control={<Radio/>} value={this.state.correct}  className="opt" onChange={this.handleChange} label={this.decodeHtml(this.state.correct)}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[0]}  className="opt" onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[0])}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[1]}  className="opt" onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[1])}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[2]}  className="opt" onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[2])}/>
        </RadioGroup>
        </FormControl>
        <div id ='buttons'> 
        <Button variant='contained' onClick={this.handleSubmit} id = "submit" color="primary">Submit</Button>
        <Button variant='contained'  onClick={this.handleNew} id  = 'new' color='secondary'>New</Button>
        </div>
      
        </div>
      );
    }

    else{
      if(this.state.res===true){
        return (
          <div className="App">
           <AppBar position="static">
  <Toolbar>
    <IconButton edge="start"  color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" >
      QUIZ
    </Typography>
  </Toolbar>
</AppBar>    
        <h1>{this.decodeHtml(this.state.question)}</h1>
        <FormControl component ='fieldset'>
        <RadioGroup aria-label="gender" name="answer" >

        <FormControlLabel control={<Radio/>} value={this.state.correct}  className="opt" onChange={this.handleChange} disabled label={this.decodeHtml(this.state.correct)}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[0]}  className="opt" onChange ={this.handleChange} disabled label= {this.decodeHtml(this.state.incorrect[0])}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[1]}  className="opt" onChange ={this.handleChange} disabled label= {this.decodeHtml(this.state.incorrect[1])}/>
        <FormControlLabel control={<Radio/>} value={this.state.incorrect[2]}  className="opt" onChange ={this.handleChange} disabled label= {this.decodeHtml(this.state.incorrect[2])}/>
        </RadioGroup>
        </FormControl>
          <div id = 'buttons'>
          <Button variant='contained'  onClick={this.handleSubmit} color="primary" id = "submit">Submit</Button>
          <Button variant='contained'  onClick={this.handleReset} id="reset">Reset</Button>
          <Button variant='contained'  onClick={this.handleNew} color='secondary' id  = 'new'>New</Button>
          </div>
          <Correct/>
          </div>
        );
      }
      else{
        return (
          <div className="App">
           <AppBar position="static">
  <Toolbar>
    <IconButton edge="start"  color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" >
      QUIZ
    </Typography>
  </Toolbar>
</AppBar>    
        <h1>{this.decodeHtml(this.state.question)}</h1>
        <FormControl component ='fieldset'>
        <RadioGroup aria-label="gender" name="answer" >

        <FormControlLabel control={<Radio/>} className="opt" value={this.state.correct} onChange={this.handleChange} disabled label={this.decodeHtml(this.state.correct)}/>
        <FormControlLabel control={<Radio/>}  className="opt" value={this.state.incorrect[0]} disabled onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[0])}/>
        <FormControlLabel control={<Radio/>}  className="opt" value={this.state.incorrect[1]} disabled onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[1])}/>
        <FormControlLabel control={<Radio/>}  className="opt" value={this.state.incorrect[2]} disabled onChange ={this.handleChange} label= {this.decodeHtml(this.state.incorrect[2])}/>
        </RadioGroup>
        </FormControl>
         <div id = 'buttons'>
          <Button variant='contained'  onClick={this.handleSubmit} color="primary" id = "submit">Submit</Button>
          <Button variant='contained'  onClick={this.handleReset} id="reset">Reset</Button>
          <Button variant='contained'  onClick={this.handleNew} color='secondary' id  = 'new'>New</Button>
          </div>
          <Wrong/>
          </div>
        );
      }
    }
    
  }
  
}

export default App;
