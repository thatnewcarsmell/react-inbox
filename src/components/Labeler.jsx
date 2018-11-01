import React from 'react';
import '../index.css';

const Labeler = (props) => {
    return(
        <span class="label label-warning">{props.label}</span>
    );
}

export default Labeler;