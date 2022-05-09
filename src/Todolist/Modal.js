import React from 'react';

const Modal = (props)=>{

    const handleSave=()=>{

        const item = {id:props.idChange,item:props.itemChange,newcategory:props.categoryChange}
        
        props.saveModaldetails(item)
        console.log(item)
    }
    
    return(
                <div className="modal fade" id="editmodal"  role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit list</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>  
                        <div className="modal-body">
                            <input className="form-control" type="text"  value={props.itemChange} onChange={(e)=>props.modalitemChange(e)} required></input><br></br><br></br>    
                            <input type="text" className="form-control" value={props.categoryChange} onChange={(e)=>props.modalcategoryChange(e)} ></input><br></br><br></br>
                            <label><input type="checkbox" name="status" />Status</label>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>handleSave()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
    )
  
}
export default Modal;