import React, { useState } from 'react';
import './style.css'
import Table from './Table'
import Modal from './Modal';

const Todolist = () => {

  const [item, setItem] = useState('')
  const [newcategory, setnewcategory] = useState('')
  const [category, setCategory] = useState('all')
  const [check, setCheck] = useState();
  const [checkBox, setCheckBox] = useState(true)
  const [uncheckBox, setUncheckBox] = useState(true)
  const [todolist, setTodolist] = useState([
    { id: 1, item: 'Go to school', newcategory: 'Daily Work', check: false },
    { id: 2, item: 'To do homework', newcategory: 'Daily Work', check: false },
    { id: 3, item: 'Take Rest', newcategory: 'Shopping', check: false },
    { id: 4, item: 'Back to home', newcategory: 'Daily Work', check: false },
    { id: 5, item: 'Go to school', newcategory: 'Daily Work', check: false },
    { id: 6, item: 'Have Breakfast', newcategory: 'Daily Work', check: false },
    { id: 7, item: 'Workout', newcategory: 'Daily Work', check: false },
    { id: 8, item: 'Go to market', newcategory: 'Shopping', check: false },
    { id: 9, item: 'Go to Mall', newcategory: 'Shopping', check: false },
    { id: 10, item: 'Go to school', newcategory: 'Daily Work', check: false }
  ])
  const [search, setSearch] = useState(null)
  const [id1, setId1] = useState();
  const [item1, setItem1] = useState();
  const [category1, setCategory1] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showmessage, setShowmessage] = useState('')

  // Adding new items to table
  const addData = () => {

    if (item !== '' && newcategory !== '') {

      setTodolist([...todolist, { id: todolist.length + 1, item: item, newcategory: newcategory, check: check }])
      setItem('')
      setnewcategory('')
      setCheck()
      setErrorMessage(null)
      setShowmessage("create")

    }
    else {

      setErrorMessage("Please Enter your task")
    }
  }

  const CheckTodo = checkId => {
    let newTodos = todolist.map(checkitem => {
      if (checkitem.id === checkId) {
        checkitem.check = !checkitem.check
      }
      return checkitem
    }
    )
    setTodolist(newTodos);
    setShowmessage('')

  }
  // Update todo items in table
  const handleUpdate = (keyU) => {
    const id = todolist.map((fit, index) => {
      if (fit.id === keyU)
        return index;
      else
        return null;
    })
    const index11 = id.filter((fit, index) => {
      if (fit != null)
        return index;
    })
    setId1(todolist[index11].id)
    setItem1(todolist[index11].item);
    setCategory1(todolist[index11].newcategory);
    console.log(id, "id", index11)

  }
  const saveModaldetails = (item) => {
    let temptodolist = todolist.map(list => {
      if (list.id === item.id) {
        list = item
      }
      return list
    })
    setTodolist(temptodolist)
    console.log(temptodolist)
    setShowmessage('update')
  }
  // Delete todo items in table
  const handleDelete = keyId => {

    if (window.confirm("Are you sure want to delete?")) {

      let deleteitem = todolist.filter(todo => todo.id !== keyId)
      setTodolist(deleteitem)
      setShowmessage("delete")
    }
  }
  // Search items in table
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
    setShowmessage('')

  }

  // Filter items with select option dropdown 
  const selectCategory = (e) => {
    setCategory(e.target.value)
    console.log(e.target.value)
    setCurrentPage(1)
    setShowmessage('')
  }

  // Search items with checkbox check 
  const checkedBox = () => {
    setCheckBox(!checkBox)
    console.log(checkBox)
    setCurrentPage(1)
    setShowmessage('')
  }
  // Search items with uncheck 
  const uncheckedBox = (e) => {
    setUncheckBox(!uncheckBox)
    console.log(uncheckBox)
    setCurrentPage(1)
    setShowmessage('')
  }

  // Update items 
  const modalitemChange = (e) => {
    setItem1(e.target.value)
  }
  // Upadte category
  const modalcategoryChange = (e) => {
    setCategory1(e.target.value)
  }

  console.log('todolist', todolist)
  return (

    <div style={{ marginTop: "50px" }}>
      <h2>Todo List</h2>
      <div className="mydiv">
        <button className="btn btn-success" data-toggle="modal" data-target="#examplemodal">Add a task</button>

        <select className="select" id="selected" onChange={selectCategory} value={category} >
          <option value="all">All</option>
          <option value="daily work">Daily Work</option>
          <option value="shopping">Shopping</option>
        </select>
        <input type="text" className="search" placeholder="Search item..." onChange={handleSearch}></input>
        <button className="btn btn-success">Search</button>
        <div className="checkboxdiv">
          <label><input type="checkbox" value="check" id="checkbox" onClick={checkedBox} />Check</label>
          <label><input type="checkbox" value="uncheck" id="checkbox" onClick={uncheckedBox} />Uncheck</label>

        </div>
      </div>

      {
        showmessage === 'create' ? <div className="alert alert-success" style={{ width: "300px", marginLeft: "200px" }}>
          <i className="fas fa-grin-beam"></i> <strong>Successfully Create</strong>
        </div> : ""
      }
      {
        showmessage === 'update' ? <div className="alert alert-success" style={{ width: "300px", marginLeft: "200px" }}>
          <i className="fas fa-check-circle"></i> <strong>Successfully Update</strong>
        </div> : ""
      }
      {
        showmessage === 'delete' ? <div className="alert alert-success" style={{ width: "300px", marginLeft: "200px" }}>
          <i className="fas fa-check-circle"></i> <strong>Successfully Delete</strong>
        </div> : ""
      }

      <Table
        data={todolist}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        search={search}
        select={category}
        delete={handleDelete}
        update={handleUpdate}
        check={CheckTodo}
        checkedbox={checkBox}
        uncheckedbox={uncheckBox}
        setShowmessage={setShowmessage}
      />
      <Modal
        idChange={id1}
        itemChange={item1}
        categoryChange={category1}
        modalitemChange={modalitemChange}
        modalcategoryChange={modalcategoryChange}
        saveModaldetails={saveModaldetails}
      />
      <div className="modal fade" id="examplemodal" role="dialog" style={{ backgroundColor: "#dbe8dc" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Todo List</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input className="form-control" type="text" value={item} required placeholder="Enter your task..." id="todoitem" onChange={(e) => setItem(e.target.value)}></input><br></br><br></br>
              <label style={{ color: "red" }}>
                {item ? "" : errorMessage}
              </label>
              <input type="text" className="form-control" value={newcategory} required placeholder="Enter category..." id="todonewcategory" onChange={(e) => setnewcategory(e.target.value)}></input><br></br><br></br>
              <label style={{ color: "red" }}>
                {newcategory ? "" : errorMessage}
              </label><br></br>
              <label><input type="checkbox" name="status" onClick={(e) => setCheck(e.target.checked)} />Status</label>
            </div>
            <div className="modal-footer">
              {
                item && newcategory ? <button type="button" data-dismiss="modal" className="btn btn-success" onClick={addData}>Add</button> : <button type="button" className="btn btn-success" onClick={addData}>Add</button>

              }
            </div>

          </div>
        </div>
      </div>

    </div>

  )
}

export default Todolist;