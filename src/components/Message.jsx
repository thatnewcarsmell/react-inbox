import React from 'react';
import '../index.css';
import Labeler from './Labeler.jsx';

const Message = (props) => {

    return(
        <div className={(props.info.read ? "row message read" + " " : "row message unread" + " ") + (props.info.selected ? " selected":"")} >
            <div onClick = {props.selector} id={props.info.id} className="col-xs-1">
                <div onClick={props.selector} id={props.info.id} className="row">
                    <div onClick={props.selector} id={props.info.id} className="col-xs-2">
                        <input onClick={props.selector} id={props.info.id} type="checkbox" checked={props.info.selected} />
                    </div>
                    <div id={props.info.id} onClick={props.selector} className="col-xs-2">
                        <i id={props.info.id} onClick={props.starMe} className={props.info.starred ? "fas fa-star" : "far fa-star"}></i>
                    </div>
                </div>
            </div>
            <div onClick = {props.selector} id={props.info.id} className="col-xs-11">
                {/* <Labeler /> */}
                <a onClick={props.selector} id={props.info.id} href="#">{props.info.subject}</a>
            </div>
        </div>
    );
}

export default Message;