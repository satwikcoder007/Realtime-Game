import React, { useState } from "react";

export const Inputs = ({ socket, gamePass,turn,setTurn }) => {
  const move= gamePass.move;
  const [board, setBoard] = useState(Array(9).fill(null));
  socket.on("movereceive",(data)=>{
    var oponentMove = (move=="X") ? "O" : "X";
    let newBoard = [...board];
    newBoard[data] = oponentMove; 
    setBoard(newBoard);
    setTurn(1);
  })
  const handleClick = (index) => {
    if(turn!=1){
      alert("Not Your Move");
      return;
    }
    if(!board[index]){
      socket.emit("move",{index:index,room:gamePass.room});
      let newBoard = [...board];
      newBoard[index] = move; 
      setBoard(newBoard);
      setTurn(0);
    }
    else{
      alert("Restricted");
    }
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <div className=' text-foreground text-[30px] font-bold mb-[50px]'>Lets Play</div>
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
