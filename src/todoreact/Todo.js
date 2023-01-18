import React, { useEffect } from 'react';
import '../todoreact/style.css';

// Get the local storage data back 
const getLocalData = () => {
     const lists = JSON.parse(localStorage.getItem('mytodolist'));
     if (lists) {
          return lists;
     } else {
          return [];
     }
}

const Todo = () => {
     const [inputData, setInputData] = React.useState("");
     const [items, setItems] = React.useState(getLocalData());
     const [isEditItem, setIsEditItem] = React.useState("");
     const [toggleButton, setToggleButton] = React.useState(false);

     // add the items function 
     const addItem = () => {
          if (!inputData) {
               alert("Please fill the data");
          }
          else if (inputData && toggleButton) {
               setItems(
                    items.map((currElem) => {
                         if (currElem.id === isEditItem) {
                              return { ...currElem, name: inputData }
                         }
                         return currElem;
                    })
               );
               setInputData("");
               setIsEditItem(null);
               setToggleButton(false);
          }
          else {
               const myNewInputData = {
                    id: new Date().getTime().toString(),
                    name: inputData
               }
               setItems([...items, myNewInputData]);
               setInputData(""); 
          }
     }

     // For editing the items 
     const editItem = (index) => {
          const item_todo_edited = items.find((curElem) => {
               return curElem.id === index;
          });

          setInputData(item_todo_edited.name);
          setIsEditItem(index);
          setToggleButton(true);
     }

     // delete the items function
     const deleteItem = (index) => {
          const upDatedItem = items.filter((curElem) => {
               return curElem.id != index;
          })
          setItems(upDatedItem);
     }

     // Remove all the items from the list 
     const removeAll = () => {
          setItems([]);
     }

     // adding localStorage 
     React.useEffect(() => {
          localStorage.setItem('mytodolist', JSON.stringify(items));
     }, [items]);

     return (
          <>
               <div className="main-div">

                    <div className='child-div'>

                         <figure>
                              <img src="./images/todo.svg" alt="todologo" />
                              <figcaption>Add your list here ✌️ </figcaption>
                         </figure>

                         <div className='addItems'>
                              <input type="text" placeholder='✍️ Add items...' className='form-control' value={inputData}
                                   onChange={(event) => setInputData(event.target.value)} />
                              {toggleButton ? (<i className="fa fa-pencil add-btn" aria-hidden="true" onClick={addItem}></i>) :
                                   (<i className="fa fa-plus add-btn" aria-hidden="true" onClick={addItem}></i>)
                              }
                         </div>

                         {/* show our items  */}

                         <div className='showItems'>

                              {items.map((currElem) => {
                                   return (
                                        <div className="eachItem" key={currElem.id}>
                                             <h3>{currElem.name}</h3>
                                             <div className="todo-btn">
                                                  <i class="fa fa-pencil" aria-hidden="true"
                                                       onClick={() => editItem(currElem.id)}
                                                  ></i>
                                                  <i class="fa fa-trash" aria-hidden="true"
                                                       onClick={() => deleteItem(currElem.id)}></i>
                                             </div>
                                        </div>
                                   );
                              })} ;

                         </div>

                         {/* romove all button  */}

                         <div className="showItems">
                              <button className='btn effect04' data-sm-link-text="Remove All"
                                   onClick={removeAll}
                              >
                                   <span>CHECK LIST</span>
                              </button>
                         </div>

                    </div>
               </div>
          </>
     )
}

export default Todo;

// Note :- Whenever the state changes rerender of the compoment of the occurs
// UseEffect ---> whether empty or not it will run for the first time and if [] only for the first time and if dependencie array either passed with value or left out it will run every time the sate variable get changed       