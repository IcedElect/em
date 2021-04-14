import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = (props, ref) => {
    let classes = classNames({
        'button': true,

        'button--main': (props.color === 'main'),
        'button--primary': (props.color === 'primary'),
        'button--transparent': (props.color === 'transparent'),

        'button--small': (props.size === 'small'),
        'button--large': (props.size === 'large'),

        'button--icon': (props.icon && !props.children),
        'button--bordered': (!!props.bordered),
        'button--outline-main': (props.outline === 'main'),
        'button--outline-primary': (props.outline === 'primary'),
        'button--icon-right' : (props.iconPos === 'right'),
        'active' : (props.active)
    }, props.className || []);
    let styles = props.style ? props.style : {};

    let attr = {
        ref: ref,
        to: props.to,
        type: props.type,
        className: classes,
        href: props.href,
        rel: props.rel,
        target: props.target,
        onClick: props.onClick,
        disabled: props.disabled,
        style: {...styles, color: props.color},
        "data-tip": props.tooltip ? props.tooltip : false,
        htmlFor: props.htmlFor
    };

    let icon = props.icon ? React.createElement('i', {className: `far`, key: 'i'}, [<FontAwesomeIcon className="far" icon={props.icon}/>]) : '';
    let text = props.children ? React.createElement('span', {key: 'span'}, props.children) : '';
    let content = props.iconPos === 'right' ? [text, icon] : [icon, text];

    if(props.loading) {
        content = <span><FontAwesomeIcon icon={faSpinner} className="fal fa-spin"/></span>
        attr.disabled = "disabled"
    }

    let tag = props.to ? Link : 'button';
    if(props.as) tag = props.as;

    return React.createElement( tag, attr, content);
}

export default React.forwardRef(Button)