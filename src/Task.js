export const Task =(props)=>{
    return (
          <div className='task'style={{ backgroundColor: props.completed ? "#6aed53" : "3c3c3c" , color: props.completed?"black":"white"}}>
            <h1>{props.taskName}</h1>
            <button style={{ display : props.completed ?"none" : "inline-block" , marginRight :"10px" , backgroundColor : "green" }} onClick={()=>props.completeTask(props.id)}>Finish</button>
            <button onClick={()=>props.deleteTask(props.id)}>X</button>
            </div>
          );
}