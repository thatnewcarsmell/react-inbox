import React, { Component } from 'react';
import './index.css';
import Toolbar from './components/Toolbar.jsx'
import MessageList from './components/MessageList.jsx'
import Compose from './components/Compose';

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      allSpark: 'far fa-minus-square',
      composeMenu: false,
    }
  }

  componentDidMount(){
    fetch('http://localhost:8082/api/messages')
      .then(response => response.json())
      .then(response => {
          this.setState({
            messages: response
          })
      })
  }  
  
  changeMyDB = (data) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH', 
      body: JSON.stringify(data), 
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }

  addMessage = (data) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => console.log(res.json()))
  }
  
  selector = (e) => {
    var messages = this.state.messages;
    var allSpark;
    let allSparker;
    if(e.target.tagName === "BUTTON" || e.target.tagName ===  "I"){
      var countSelects = messages.reduce((tally,current) => {
        return tally += current.selected ? 1 : 0;
      },0)
      var newSelectValues = countSelects > 0 ? countSelects === messages.length ? false : true : true;
      let update = messages.map(x => {
        return {
          ...x,
          selected: newSelectValues
        }
      })
      this.setState({
        messages: update,
      })
      allSparker = newSelectValues;
    }
    else{
      var target = messages[e.target.id - 1];
      target.selected === undefined ? target.selected = true : target.selected = !target.selected;
      this.setState({
        messages: messages
      })
      e.stopPropagation();
    }
    countSelects = this.state.messages.reduce((tally,current) => {
      return tally += current.selected ? 1 : 0;
    },0)
    countSelects > 0 ? (countSelects === messages.length ? allSpark = "far fa-check-square" : allSpark = 'far fa-minus-square') : allSpark = 'far fa-square';
    allSparker === true ? allSpark = 'far fa-check-square' : allSparker === undefined ? allSpark = allSpark: allSpark = 'far fa-square';
    this.setState({
      allSpark: allSpark
    });
  }

  markRead = (e) => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally,message) => {
      message.selected && tally.push(message.id);
      return tally;
    },[]);
    messages = messages.map(x => {
      return {...x,
      read: x.selected === true ? x.read = true : x.read = x.read
      }
    });
    this.setState({
      messages: messages
    })
    for(let i = 0; i < targets.length; i++){
      let body = {
        "messageIds": [targets[i]],
        "command": "read",
        read: true
      }
      this.changeMyDB(body)
    }
  }
  
  markUnread = () => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally,message) => {
      message.selected && tally.push(message.id);
      return tally;
    },[]);
    messages = messages.map(x => {
      return {...x,
      read: x.selected === true ? x.read = false : x.read = x.read
      }
    });
    this.setState({
      messages: messages
    })
    for(let i = 0; i < targets.length; i++){
      let body = {
        "messageIds": [targets[i]],
        "command": "read",
        read: false
      }
      this.changeMyDB(body)
    }
  }

  starMe = (e) => {
    var messages = this.state.messages;
    var target = messages[e.target.id-1];
    target.starred = !target.starred;
    this.setState({
      messages: messages
    })
    e.stopPropagation();
    let body = {
      "messageIds": [e.target.id],
      "command": "star"
    }
    this.changeMyDB(body)
  }

  labelMeElmo = (e) => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally,message) => {
      message.selected && tally.push(message.id);
      return tally;
    },[]);
    messages = messages.map(message => {
      message.selected === true ? message.labels.length === 0 ? message.labels = [e.target.value] : (
        message.labels = message.labels.reduce((newLabelArray) => {
          newLabelArray.indexOf(e.target.value) === -1 ? newLabelArray.push(e.target.value) : newLabelArray = newLabelArray;
          return newLabelArray; 
        },[...message.labels])
      ) : message.labels = message.labels;
      return message;
    });
    this.setState({
      messages: messages
    })
    for(let i = 0; i < targets.length; i++){
      let body = {
        "messageIds": [targets[i]],
        "command": "addLabel",
        "label": e.target.value
      }
      this.changeMyDB(body)
    }
  }

  unlabelMeElmo = (e) => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally,message) => {
      message.selected && tally.push(message.id);
      return tally;
    },[]);
    messages = messages.map(message => {
      message.selected === true ? (
        message.labels = message.labels.reduce((newLabelArray) => {
          newLabelArray.indexOf(e.target.value) !== -1 ? newLabelArray[newLabelArray.indexOf(e.target.value)] = "" : newLabelArray = newLabelArray;
          return newLabelArray; 
        },[...message.labels])
      ) : message.labels = message.labels;
      return message;
    });
    this.setState({
      messages: messages
    })
    for(let i = 0; i < targets.length; i++){
      let body = {
        "messageIds": [targets[i]],
        "command": "removeLabel",
        "label": e.target.value
      }
      this.changeMyDB(body)
    }
  }

  delete = (e) => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally,message) => {
      message.selected && tally.push(message.id);
      return tally;
    },[]);
    messages = messages.map(item => (item.selected === undefined || item.selected === false) ? item:undefined);
    messages = messages.filter(item => item !== undefined)
    messages = messages.map((item,i) => {
    return {
      ...item,
      id: i+1,
      selected: false
    }
    });
    this.setState({
      messages: messages
    })
    for(let i = 0; i < targets.length; i++){
      let body = {
        "messageIds": [targets[i]],
        "command": "delete"
      }
      this.changeMyDB(body)
    }
  }

  showMeBody = (e) => {
    var messages = this.state.messages;
    var target = messages[e.target.id - 1];
    target.displayed === undefined ? target.displayed = true : target.displayed = !target.displayed;
    target.read = true;
    this.setState({
      messages: messages
    })
    let body = {
      "messageIds": [e.target.id],
      "command": "read",
      read: true
    }
    this.changeMyDB(body)
    e.stopPropagation();
  }

  compose = (e) => {
    var onOff = this.state.composeMenu;
    onOff = !onOff
    this.setState({composeMenu: onOff})
  }

  logger = (e) => {
    if(e.target.id === "body"){
      var body = e.target.value;
      this.setState({
        body: body
      })
    }
    else if(e.target.id === "subject"){
      var subject = e.target.value;
      this.setState({
        subject: subject
      })
    }
  }

  submitMessage = (e) => {
    e.preventDefault();
    let body = {
        subject: this.state.subject,
        body: this.state.body,
        labels: [],
        read: false,
        starred: false,
        id: this.state.messages.length + 1
    }
    this.state.messages.push(body);
    this.setState({composeMenu: !this.state.composeMenu})
    this.addMessage(body);
  }
  
  
  render() {
  
    return (
      <div className="App">
        <div className="container">
          <Toolbar compose={this.compose} delete={this.delete} labelMeElmo={this.labelMeElmo} unlabelMeElmo={this.unlabelMeElmo} messages={this.state.messages} markRead={this.markRead} markUnread={this.markUnread} allSpark={this.state.allSpark} selector={this.selector}/>
          {this.state.composeMenu && <Compose submitMessage={this.submitMessage} logger={this.logger}/>}
          <MessageList showMeBody={this.showMeBody} starMe={this.starMe} selector={this.selector} messages={this.state.messages}/>
        </div>
      </div>
    );
  }
}

export default App;