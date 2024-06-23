export const calculateResults = (board)=>{
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return 1;
        }
      }
      let flag=1;
      for(let i=0;i<9;i++){
        if(board[i]==null){
          flag=0
        }
      }
      if(flag) return 3;
      return 0;
}