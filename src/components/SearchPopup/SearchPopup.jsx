import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchPopup.module.css';
import { Card } from 'react-bootstrap';
import CardFilter from './CardFilter/CardFilter';

function SearchPopup() {

    return (
        <Card className={`f-1`}>
            <h5 className={`px-2`}>Select by: </h5>
            <CardFilter
                title="Type"
            />
            <CardFilter
                title="Area"
            />
        </Card>
    );
}

export default SearchPopup;