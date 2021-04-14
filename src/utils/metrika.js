import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import ym from 'react-yandex-metrika';
ym('reachGoal', 'whateverGoal', {awesomeParameter: 42});
const Metrika = () => {
    return (
        <>
            <YMInitializer accounts={[987654321]} />
        </>
    );
},

export default Metrika;