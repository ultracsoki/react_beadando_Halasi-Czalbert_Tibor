import {useState} from "react";
import './listPage.css';
import CategoryItem from "./CategoryItem";
import Category from "./Category";
import Item from "./Item";
import ListItem from "./listItem";
import 'bootstrap/dist/css/bootstrap.css';

export let categories: Category[] = [
    new Category('Foods'),
    new Category('Tools'),
    new Category('Clothes'),
];

export let items: Item[] = [
    new Item('Cookie', categories.filter(cat => cat.name === 'Foods')[0]),
    new Item('Soup', categories.filter(cat => cat.name === 'Foods')[0]),
    new Item('T-shirt', categories.filter(cat => cat.name === 'Clothes')[0]),
    new Item('Hammer', categories.filter(cat => cat.name === 'Tools')[0]),
];

const ListPage: React.FC = () => {
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);
    const [inputText, setInputText] = useState<string>('');
    const [toggleForm, setToggleForm] = useState(false);
    const [inputItem, setInputItem] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [filteredOneCategory, setFilteredOneCategory] = useState<Category>(categories[0]);

    function handleDelete(itemToDelete: Item)  {
        const newItems: Item[] = items.filter(item => item !== itemToDelete);
        setFilteredItems(newItems);
        items = newItems;
    }

    function addItem(itemName: string, categoryName: string){
        if (itemName === '' || categoryName === ''){
            setErrorCode('Nem lehet üres mezőt megadni!');
        } else {
            const findExistCategory: Category | undefined = categories.filter(cat => cat.name === categoryName)[0];
            if (findExistCategory === undefined) {
                const newCat: Category = new Category(categoryName);
                categories.push(newCat);
                setFilteredCategories(categories);
                const item: Item = new Item(itemName,newCat);
                items.push(item);
            } else {
                const item: Item = new Item(itemName,findExistCategory);
                items.push(item);
            }
            setFilteredItems(items);
            setErrorCode('Sikeres hozzáadás');
            setInputItem('');
            setInputCategory('');
        }
    }

    function allItem() {
        setFilteredItems(items);
    }

    function onSortByCategory(sortByCat: Category) {
        const filtered: Item[] = items.filter(item => item.category === sortByCat);
        setFilteredItems(filtered);
        setInputText('');
    }

    function onSortByName(sortBy : string) {
        const filteredByName: Item[] = items.filter(item => item.name.toLowerCase().includes(sortBy.toLowerCase()) && item.category === filteredOneCategory);
        setFilteredItems(filteredByName);
    }

    return (
        <div className="listPage">
            {!toggleForm ?
                <div className="bg-light">
                    <h1 className="text-white bg-black">ITEMS</h1>
                    <button className="btn btn-outline-success" onClick={() => {setToggleForm(true);setErrorCode('')}}>NEW</button>
                    <br/><br/>
                    <div className="categoryButtons">
                        <button className="btn btn-dark bg-light-hover" onClick={() => {allItem();setInputText('')}}>All</button>
                        {
                            filteredCategories.map(cat => (
                                <CategoryItem category={cat} onClick={() => {onSortByCategory(cat);
                                    setFilteredOneCategory(cat)}}/>))
                        }
                    </div>
                    <div className="input-group justify-content-center m-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => {
                                const searchText = e.target.value;
                                setInputText(searchText);
                                onSortByName(searchText);
                            }}
                        />
                    </div>
                    <div>
                        {
                            filteredItems.map((item, i) => (
                                <ListItem key={i} item={item} onDelete={() => handleDelete(item)}/>))
                        }
                    </div>
                </div>
                :
                <div>
                    <h1 className="text-white bg-black">KATEGÓRIA HOZZÁADÁSA</h1>
                    <button className="btn btn-outline-danger" onClick={() => setToggleForm(false)}>Cancel</button>
                    <br/><br/>
                    <label htmlFor="item">
                        Item:
                        <input type="text" name="item" onChange={(e) => setInputItem(e.target.value)}/>
                    </label><br/><br/>
                    <label htmlFor="category">
                        Category:
                        <input type="text" name="category" onChange={(e) => setInputCategory(e.target.value)}/>
                    </label><br/><br/>
                    <button className="btn btn-outline-success" onClick={() => addItem(inputItem,inputCategory)}>CREATE</button>
                    <br/><br/>
                    <p>{errorCode}</p>
                </div>
            }
        </div>
    );
};

export default ListPage;
