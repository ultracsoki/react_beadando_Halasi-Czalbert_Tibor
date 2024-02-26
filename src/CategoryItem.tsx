import Category from "./Category";
import 'bootstrap/dist/css/bootstrap.css';

interface CategoryItemProps {
    category: Category,
    onClick: () => void;
}

function CategoryItem(props: CategoryItemProps) {

    return (
        <div>
            <button className="btn btn-dark bg-light-hover" onClick={props.onClick}>{props.category.name}</button>
        </div>
    );
}

export default CategoryItem;
