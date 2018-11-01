import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar.jsx'
import Message from './components/Message.jsx'
import MessageList from './components/MessageList.jsx'

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ],
      allSpark: 'far fa-minus-square'
    }
  }
  
  componentDidMount(){

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
    var countSelects = this.state.messages.reduce((tally,current) => {
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
    messages = messages.map(x => {
      return {...x,
      read: x.selected === true ? x.read = true : x.read = x.read
      }
    });
    this.setState({
      messages: messages
    })
  }
  
  markUnread = () => {
    var messages = this.state.messages;
    messages = messages.map(x => {
      return {...x,
      read: x.selected === true ? x.read = false : x.read = x.read
      }
    });
    this.setState({
      messages: messages
    })
  }

  starMe = (e) => {
    var messages = this.state.messages;
    var target = messages[e.target.id-1];
    target.starred = !target.starred;
    this.setState({
      messages: messages
    })
    e.stopPropagation();
  }

  labelMeElmo = (e) => {
    var messages = this.state.messages;
    var labelToAdd = e.target.value;
    messages = messages.map(x => {
      x.selected === true ? x.labels.push(labelToAdd) : x.labels = x.labels
      return {...x,
      }
    });
    // messages = messages.map(x => x.selected === true ? x.labels.push(labelToAdd) : x.labels = x.labels);
    console.log(messages)
    this.setState({
      messages: messages
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar labelMeElmo={this.labelMeElmo} messages={this.state.messages} markRead={this.markRead} markUnread={this.markUnread} allSpark={this.state.allSpark} selector={this.selector}/>
          <MessageList starMe={this.starMe} selector={this.selector} messages={this.state.messages}/>
        </div>
      </div>
    );
  }
}

export default App;
