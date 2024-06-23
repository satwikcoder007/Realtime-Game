import React, { useState ,useContext} from "react";
import { calculateResults } from "../../../utils/calculateResults.js";
import { Button } from "../ui/button.jsx";
import { StateContext } from "../StateContext.jsx";
import { useRouter } from "next/navigation";
export const Inputs = ({ socket, gamePass,turn,setTurn }) => {
  const route = useRouter();
  const {state} = useContext(StateContext);
  const move= gamePass.move;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner,setWinner] = useState(-1);
  socket.on("movereceive",(data)=>{
    var oponentMove = (move=="X") ? "O" : "X";
    let newBoard = [...board];
    newBoard[data] = oponentMove; 
    setBoard(newBoard);
    setTurn(1);
  })
  socket.on("youloose",()=>{
    setWinner(2);
    setTurn(-1);
  })
  socket.on("gameDraw",()=>{
    setWinner(3);
    setTurn(-1);
  })

  const playAgain = ()=>{
      route.push("/");
    }
  const handleClick = (index) => {
    if(turn===-1) alert("Enter New Game To Play");
    if(turn!=1){
      alert("Not Your Move");
      return;
    }
    if(!board[index]){
      socket.emit("move",{index:index,room:gamePass.room});
      let newBoard = [...board];
      newBoard[index] = move; 
      if(calculateResults(newBoard)===1){
        socket.emit("looser",gamePass.room);
        setTurn(-1);
        setWinner(1);
      }
      else if(calculateResults(newBoard)===3){
        socket.emit("draw",gamePass.room);
        setTurn(-1);
        setWinner(3);
      }
      setBoard(newBoard);
      setTurn(0);
    }
    else{
      alert("Restricted");
    }
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <div className=' text-foreground text-[30px] font-bold mb-[50px]'>
        {
          (winner==-1) ? <>LETS PLAY</> :(winner==1)?<>YOU WIN</>:(winner==2)?<>OPONENT WIN</>:<>DRAW</>
        }
      </div>
      <div className=" text-foreground text-[20px] font-bold mb-[50px]">
        {
          (winner==1||winner==2||winner==3) ?<Button onClick={()=>(playAgain())}>Play Again</Button>:(turn===1)?<div>Your Move</div> : <div>Oponents Move</div>
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="flex items-center justify-center box-border border-2 border-foreground w-24 h-24 text-2xl font-bold  text-foreground bg-background rounded hover:bg-gray-600"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
