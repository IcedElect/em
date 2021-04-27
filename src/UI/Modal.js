import React, { useContext } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'
import { ModalContext } from '../store/modal/ModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const modalRoot = document.getElementsByTagName('body')[0];

const Modal = (props, ref) => {

    // let [show, setShow] = useState(false);

    let id = props.id || Math.random().toString(36).substr(2, 9)
    let { show, hideModal } = useContext(ModalContext)

    let classes = classNames({
        'modal': true,
        'modal--show': props.show || show.indexOf(id) > -1,

        'modal--main': (props.color === 'main'),
        'modal--primary': (props.color === 'primary'),
        'modal--transparent': (props.color === 'transparent')
    }, props.className || []);

    let styles = props.style ? props.style : {};

    let attr = {
        id: `modal-${props.id}`,
        className: classes,
        style: {...styles}
    };

    const onHide = () => {
        if(props.disableClose) {
            if(props.onClose) props.onClose();
            return false;
        }

        hideModal(id)

        if (['greeting', 'register'].indexOf(id) != -1)
            window.location = '/';
        // if(['is'].indexOf(id) != -1)
        //     window.location = 'easyworkapp.ru';
        if(props.onHide)
            props.onHide()
    }

    let overlay = React.createElement('div', {className: 'modal__overlay', key: 0, onClick: onHide})
    
    let dialogHeaderClose = React.createElement('span', {className: 'modal__dialog-close fal', key: 1, onClick: onHide}, [<FontAwesomeIcon icon={faTimes}/>])
    let dialogHeaderTitle = props.title ? React.createElement('span', {className: 'modal__dialog-title', key: 0}, props.title) : ''
    let dialogHeaderError = props.error ? React.createElement('span', {className: 'modal__dialog-error', key: 3}, props.error) : ''
    let dialogHeader = React.createElement('div', {className: 'modal__dialog-header', key: 0}, [dialogHeaderTitle, !props.disableClose && dialogHeaderClose, dialogHeaderError])
    let dialogBody = React.createElement('div', {className: 'modal__dialog-body', key: 1}, props.children)
    let dialog = React.createElement('div', {className: 'modal__dialog', key: 1}, [dialogHeader, dialogBody])

    let el = React.createElement( 'div', attr, [overlay, dialog]);

    return ReactDOM.createPortal(el, modalRoot);
}

export default React.forwardRef(Modal)