
import e from 'cors'
import { useEffect, useState } from 'react'
import { getItemById, createItem, updateItem, deleteItem, getItems, getCategories } from './services/items'

const Home = () => {
    const [item, setItem] = useState({})
    // const [amount, setAmount] = useState('')
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState({})
    const [items, setItems] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentItem, setCurrentItem] = useState({})
    const [selected, setSelected] = useState()

    useEffect(() => {
        const getAllCategories = async () => {
            await getCategories()
                .then(res =>
                    res.status === 200
                        ? setCategories([...categories, ...res.data.records])
                        : null
                )
                .catch(console.error)
            await getItems()
                .then(res =>
                    res.status === 200
                        ? setItems([...items, ...res.data.records])
                        : null
                )
                .catch(console.error)
        }
        getAllCategories();

    }, []);



    const handleChange = (e) => {
        console.log(e.target.name, e.target.value, e.target.type, e.target.checked)
        let key, value, newItem
        if (e.target.type === 'checkbox') {
            newItem = {...currentItem}
            if (editMode) {

                if ('categories' in newItem.fields) {
                    if (e.target.checked) {
                        newItem.fields.categories.push(e.target.id)
                    } else {
                        console.log('false')
                        const index = newItem.fields.categories.indexOf(e.target.id)
                        newItem.fields.categories.splice(index, 1)

                    }


                } else {
                    newItem.fields.categories = [e.target.id]
                }


            } else {
                newItem = {...item}
                console.log('not edit')
                if ('categories' in newItem) {
                    console.log('remove nw')
                    e.target.checked ? newItem.categories.push(e.target.id) :
                        newItem.categories.splice(newItem.categories.indexOf(e.target.id), 1)

                } else {
                    console.log('new')
                    newItem.categories = [e.target.id]
                }

                console.log(newItem)
            }


            editMode ?
                setCurrentItem(newItem) :
                setItem(newItem)

        } else {
            key = e.target.name
            value = e.target.value

            editMode ?
                setCurrentItem({ ...currentItem, fields: { ...currentItem.fields, [key]: value } }) :
                setItem({ ...item, [key]: value })
        }
    }


    const handleUpdate = async (e, id, i) => {
        const current = await getItemById(id)
        setCurrentItem(current)
        setSelected(i)

        setEditMode(true)

    }



    const handleSubmit = async (e, id) => {
        e.preventDefault()
        const { name, amount, vendor, categories, date, purchaser } = editMode ? currentItem.fields : item
        console.log(categories)
        const newItem = {
            name: name,
            amount: parseInt(amount),
            vendor: vendor,
            categories: categories,
            date: date,
            purchaser: purchaser
        }
        console.log(newItem)
        if (editMode) {
            const updatedItem = await updateItem(newItem, id)
            const newItems = [...items.map((el, i) => el.id === id ? updatedItem[0] : el)]
            setItems(newItems)
            setEditMode(false)
        } else {
            const postedItem = await createItem(newItem)
            setItems([...items, ...postedItem.records])

        }





    }



    const handleDelete = (e, id) => {

        e.preventDefault()
        console.log(id)
        deleteItem(id)
        console.log(...items.filter(el => el.id !== id))
        let blah = [...items].filter(el => el.id !== id)
        console.log(blah)
        setItems(blah)
    }

    const compare = (a, b) => {
        if (a.fields.Name < b.fields.Name) {
            return -1;
        }
        if (a.fields.Name > b.fields.Name) {
            return 1;
        }
        return 0;
    }

    const { date, vendor, name, amount, purchaser } = editMode ? currentItem.fields || '' : item
    const cats = editMode ? currentItem.fields.categories || [] : item.categories || []
    // console.log(cats)
    return (
        <div className='home'>

            <form style={editMode ? { background: '#f9c3c3' } : {}} onSubmit={(e) => handleSubmit(e, editMode ? currentItem.id : null)}>
                <label for={item.date}>Date</label>
                <input
                    className='date'
                    name='date'
                    id={item.date}
                    type='date'
                    value={date || ''}
                    onChange={handleChange}

                />
                <label for={item.vendor}>Vendor</label>
                <input
                    className='vendor'
                    name='vendor'
                    id={item.vendor}
                    type='text'
                    value={vendor || ''}
                    onChange={handleChange}

                />
                <label for={item.name}>Item</label>
                <input
                    className='name'
                    name='name'
                    id={item.name}
                    type='text'
                    value={name || ''}
                    onChange={handleChange}

                />
                <label for={item.amount}>Amount</label>
                <input
                    className='amount'
                    name='amount'
                    id={item.amount}
                    type='number'
                    value={amount || ''}
                    onChange={handleChange}
                />
                <div>
                    <label for={item.purchaser}>Lyssie</label>
                    <input
                        className='purchaser'
                        name='purchaser'
                        id={item.purchaser}
                        type='radio'
                        value={'Lyssie'}
                        onChange={handleChange}
                        checked={purchaser === 'Lyssie'}

                    />
                </div>
                <div>
                    <label for={item.purchaser}>Marca</label>
                    <input
                        className='purchaser'
                        name='purchaser'
                        id={item.purchaser}
                        type='radio'
                        value={'Marca'}
                        onChange={handleChange}
                        checked={purchaser === 'Marca'}

                    />
                </div>
                <div className='categories'>
                    {categories && categories.sort(compare).map((e, i) => (
                        <div key={i} className='category'>
                            {/* {console.log(cats.includes(e.fields.name))}
                            {console.log('e', e.fields.name)} */}
                            {/* {console.log('here', cats.map(e=>Object.keys(e).toString() === e.fields.name))} */}
                            <input
                                index={i}
                                className='category'
                                name={e.fields.name}
                                id={e.id}
                                type='checkbox'
                                checked={cats.includes(e.id) || false}
                                // onChange={e => setChecked({ ...checked, [e.target.id]: e.target.checked })}
                                onChange={handleChange}
                            />
                            <label key={i} for={e.id}>{e.fields.name}</label>

                        </div>

                    ))}
                </div>
                <input
                    type='submit'
                    value='submit'
                />
            </form>
            <div className='content'>


                {items.map((e, i) => (
                    <div
                        className='details'
                        onClick={(evt) => handleUpdate(evt, e.id, i)}
                        style={selected === i ? { background: '#f9c3c3' } : {}}>
                        <p>{new Date(e.fields.date).toDateString()}</p>
                        <p>{e.fields.vendor}</p>
                        <p>{e.fields.name}</p>
                        <p>{e.fields.amount}</p>
                        <p>{e.fields.purchaser}</p>
                        <p onClick={(evt) => handleDelete(evt, e.id)}>X</p>

                    </div>
                ))}

            </div>
        </div>

    )
}

export default Home