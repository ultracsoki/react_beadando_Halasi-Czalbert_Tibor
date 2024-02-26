import Item from "./Item";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

interface ListItemProps {
    item: Item,
    onDelete: () => void;
}

function ListItem(props: ListItemProps) {
    const [deleteButtonState, setDeleteButtonState] = useState<string>('default');

    return (
        <div>
            <p>{props.item.name + '\t\t'}
                {deleteButtonState === 'default' ? (
                    <button className="btn border-1 border-black" onClick={() => setDeleteButtonState('clicked')}>🗑</button>
                ) :
                    <>
                        <button className="btn border-1 border-success" onClick={() => {
                            setDeleteButtonState('default');
                            props.onDelete();
                        }}>✔️
                        </button>
                        <button className="btn border-1 border-danger" onClick={() => setDeleteButtonState('default')}>❌</button>
                    </>}
            </p>
        </div>
    );
}

export default ListItem;
