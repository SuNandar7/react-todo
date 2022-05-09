import React, { useState } from 'react';
import Pagination from './Pagination';

const Table = (props) => {

    console.log('data', props.data)
    console.log(props.checkedbox)
    console.log(props.uncheckedbox)
    console.log(props.select)
    console.log(props.search)
    console.log(props.currentPage)

    let filteredArray = props.data.filter(todo => {

        if (props.select === 'all' && props.search === null && props.checkedbox === true && props.uncheckedbox === true) {
            return todo
        }
        else if (props.select === 'all' && props.search === null && props.checkedbox === false && props.uncheckedbox === true) {
            return todo && todo.check === true
        }
        else if (props.select === 'all' && props.search === null && props.checkedbox === true && props.uncheckedbox === false) {
            return todo && todo.check === false
        }
        else if (props.select === 'all' && props.search === null && props.checkedbox === false && props.uncheckedbox === false) {
            return <h3>No Data</h3>
        }
        else if (props.select !== 'all' && props.search === null && props.checkedbox === true && props.uncheckedbox === true) {
            return todo.newcategory.toLowerCase() === (props.select)
        }
        else if (props.select !== 'all' && props.search === null && props.checkedbox === false && props.uncheckedbox === true) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.check === true
        }
        else if (props.select !== 'all' && props.search === null && props.checkedbox === true && props.uncheckedbox === false) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.check === false
        }
        else if (props.select !== 'all' && props.search === null && props.checkedbox === false && props.uncheckedbox === false) {
            return todo.newcategory.toLowerCase() === (props.select)
        }
        else if (props.select === 'all' && props.search !== null && props.checkedbox === true && props.uncheckedbox === true) {
            return todo.item.toLowerCase().indexOf(props.search) !== -1
        }
        else if (props.select === 'all' && props.search !== null && props.checkedbox === false && props.uncheckedbox === true) {
            return todo.item.toLowerCase().indexOf(props.search) !== -1 && todo.check === true
        }
        else if (props.select === 'all' && props.search !== null && props.checkedbox === true && props.uncheckedbox === false) {
            return todo.item.toLowerCase().indexOf(props.search) !== -1 && todo.check === false
        }
        else if (props.select === 'all' && props.search !== null && props.checkedbox === false && props.uncheckedbox === false) {
            return todo.item.toLowerCase().indexOf(props.search) !== -1
        }
        else if (props.select !== 'all' && props.search !== null && props.checkedbox === true && props.uncheckedbox === true) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.item.toLowerCase().indexOf(props.search) !== -1
        }
        else if (props.select !== 'all' && props.search !== null && props.checkedbox === false && props.uncheckedbox === true) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.item.toLowerCase().indexOf(props.search) !== -1 && todo.check === true
        }
        else if (props.select !== 'all' && props.search !== null && props.checkedbox === true && props.uncheckedbox === false) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.item.toLowerCase().indexOf(props.search) !== -1 && todo.check === false
        }
        else if (props.select !== 'all' && props.search !== null && props.checkedbox === false && props.uncheckedbox === false) {
            return todo.newcategory.toLowerCase() === (props.select) && todo.item.toLowerCase().indexOf(props.search) !== -1
        }
        else {
            return todo
        }
    })
    console.log(filteredArray)
    // Pagination
    const [postPerPage, setPostPerPage] = useState(3)
    const indexOfLastPage = props.currentPage * postPerPage
    const indexOfFirstPage = indexOfLastPage - postPerPage
    const currentPost = filteredArray.slice(indexOfFirstPage, indexOfLastPage);

    const handleNext = () => {
        if (props.currentPage < filteredArray.length / postPerPage) {
            props.setCurrentPage(props.currentPage + 1)

        }
        props.setShowmessage('')
    }

    const handlePrevious = () => {
        if (props.currentPage > 1) {
            props.setCurrentPage(props.currentPage - 1)
        }
        props.setShowmessage('')
    }
    const paginate = (pageNumbers) => {
        props.setCurrentPage(pageNumbers)
        props.setShowmessage('')
    }

    return (
        <div>
            <div className="mydiv1">

                <table className="todoitem">
                    <thead className="item">
                        <tr className="todo">
                            <th className="items"></th>
                            <th className="items">No</th>
                            <th className="items">Todo Items</th>
                            <th className="items">Category</th>
                            <th className="items">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPost.map((item, index) => (
                            <tr key={item.id} className="todo" style={{ backgroundColor: item.check ? "#e0dcdc" : "", textDecoration: item.check ? "line-through" : "" }} >
                                <td className="items">
                                    <input type="checkbox" value={item.check} id="check" defaultChecked={item.check ? true : false} onClick={() => props.check(item.id)}></input>
                                </td>
                                <td className="items">{item.id}</td>
                                <td className="items">{item.item}</td>
                                <td className="items">{item.newcategory}</td>
                                <td className="items" >
                                    <button id="btncheck" style={{ display: item.check ? "none" : " " }} className="btn btn-success"
                                        data-toggle="modal" data-target="#editmodal"
                                        onClick={() => props.update(item.id)}>
                                        <span><i className="fas fa-edit"></i></span>

                                    </button>
                                    <button className="btn btn-danger" onClick={() => props.delete(item.id)}> <i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            <Pagination postPerPage={postPerPage} handleNext={handleNext} handlePrevious={handlePrevious} totalPost={filteredArray.length} currentPage={props.currentPage} paginate={paginate} />

        </div>
    )
}
export default Table;