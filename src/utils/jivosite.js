import ReactDOM from 'react-dom'

const root = document.getElementsByTagName('body')[0];


const Jivo = (props) => {
    let script =  <script src="https://code.jivosite.com/widget/4t3oFExquO" async></script>

    return ReactDOM.createPortal(script, root);
}

export default Jivo;