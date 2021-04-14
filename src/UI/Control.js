import React from 'react'
import classNames from 'classnames'

const Control = (props, ref) => {
    let classes = classNames({
        'control': true,

        'control--small': (props.size === 'small'),

        'control--error': (props.error),
        'control--success': (props.message),
    }, props.className || []);

    let type = props.type || 'text';
    let id = props.id || Math.random().toString(36).substr(2, 9)
    let tag = props.as || 'input';
    
    let label = props.label ? React.createElement('label', {htmlFor: id, key: 0}, props.label) : ''
    let Component = React.createElement(tag, {...props, id, type, ref, key: 1}, props.children);
    let message = props.error || props.message;
    let Message = message ? React.createElement('span', {className: 'control__message', key: 2}, message) : ''

    let content = (type === 'checkbox' || type === 'radio') ? [Component, label] : [label, Component, Message]

    return React.createElement('div', {className: classes}, content)

    // return (
    //     <div className={classes}>
    //         {
    //             props.label ? <label htmlFor={id}>{props.label}</label> : ''
    //         }
    //         <Component 
    //             {...props} 
    //             id={id}
    //             type={props.type || "text"}
    //         />
    //     </div>
    // )
}

export default React.forwardRef(Control)