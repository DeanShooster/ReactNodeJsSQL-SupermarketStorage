import './header.scss';
import {MdProductionQuantityLimits} from 'react-icons/md';

const Header = () => {
    return (
        <header>
            <h1>Product List Demo</h1>
            <MdProductionQuantityLimits className='header-logo'/>
        </header>
    );
};

export default Header;