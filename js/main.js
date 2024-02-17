(function () {
document.getElementById("start-btn").onclick = () => {
  let userName = prompt("what's your name ?")
  if(userName){
    document.getElementById("user-name").innerHTML = userName
  }else{
    document.getElementById("user-name").innerHTML = "guest"
  }
  document.getElementById("start-btn").parentElement.remove()
}





  let game = document.querySelector(".game")
  let blocks = Array.from(game.children);
  let orderArray = [...Array(blocks.length).keys()];
  shuffle(orderArray)

  blocks.forEach((block,index) => {
    //change blocks order
    block.style.order = orderArray[index];


    block.addEventListener('click',() => {
      flipBlock(block);
    })


  })
  // prevent click after 2 cards are revealed
  function stopClicking(){
    game.classList.add('stop-clicking')
    setTimeout(() => {
    game.classList.remove('stop-clicking')
      
    }, 1000);
  }
  //flip card
  function flipBlock(selected) {
    selected.classList.add("flipped")

    let flippedBlocks = blocks.filter(block => block.classList.contains("flipped"))

    if(flippedBlocks.length === 2) {
      stopClicking() // stop clicking for 1 sec
      areMatching(flippedBlocks[0],flippedBlocks[1]) // check if they are matching
    }
  }
  let wrongAttempts = 0
  function areMatching(b1,b2){
    console.log(b2.dataset.fruit);
    if(b1.dataset.fruit === b2.dataset.fruit){
      b1.classList.remove("flipped")
      b2.classList.remove("flipped")

      b1.classList.add("matched")
      b2.classList.add("matched")
    }else{
      setTimeout(() => {
        b1.classList.remove("flipped")
        b2.classList.remove("flipped")
      },1000)
      wrongAttempts++
      document.getElementById("attempts").innerHTML = wrongAttempts;
    }

  }

  function shuffle(array){
    let current = 0
    ,random
    ,tmp;
    while(current < array.length){
      random = Math.floor( Math.random() * array.length )
      tmp = array[current]
      array[current] = array[random]
      array[random] = tmp;
      current++
    }
    return array;
  }


})();
