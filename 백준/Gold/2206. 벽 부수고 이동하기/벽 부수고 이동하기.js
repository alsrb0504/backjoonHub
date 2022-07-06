class Node{
  constructor(item){
    this.item = item;
    this.next = null;
  }
}

class Queue{
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  push(item){
    const node = new Node(item)
    if(this.head==null){
      this.head= node;
      this.head.next = null;
    }else{
      this.tail.next = node;
    }
    
    this.tail = node;
    this.length +=1;
  }
  
  pop(){
    const popItem = this.head;
    this.head = this.head.next;
    this.length -=1;
    return popItem.item;
  }
  
  size(){
    return this.length;
  }
  
  empty(){
    if(this.length==0){
      return 1;
    }else{
      return 0;
    }
  }
  
  front(){
    if(this.empty()==1) return -1;
    return this.head.item; 
  }
  
  back(){
    if(this.empty()==1) return -1;
    return this.tail.item; 
  }
}

const fs = require('fs');
const [n,...arr] = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
const [R,C] = n.split(' ').map(v=>+v)
const miro = arr.map(v=>v.split('').map(w=>+w));
let answer = -1
let isVisited = Array.from(Array(R),()=>Array(C).fill(0));
isVisited[0][0] = true;
let q = new Queue();
q.push([0,0,1,false]);

function check(y,x){
  return isVisited[y][x];
}


while(!q.empty()){
  

  let [r,c,n,p] = q.pop(); //세로 가로 횟수 펀치했는지
  if(r==R-1 && c==C-1){
    answer = n;
    break;
  }else{
    if(p){ // 이미 벽한번 부셨을 떄. 못부신다.
      const route = [[r+1,c],[r-1,c],[r,c+1],[r,c-1]]
      route.forEach(v=>{
        let y = v[0]
        let x = v[1]
        if(y>-1 && y<R && x>-1 && x<C && miro[y][x]==0){//일단 미로 안의 영역이고 길(0)이라면?
          if(isVisited[y][x]<1){ //안깨고 갔던 길은 못가게 해야됨.. 
              //안깨고 갈 수 있는 길을 뭐하러 부시냥께?? 근데 부셔서 더 빨리 갈수 있으면 어떡하노? 
            isVisited[y][x]=1;   // 부시고 간 길은 1로 칠해줌. 
            q.push([y,x,n+1,p]);
          }
        }
      })
    }else{ // 벽을 아직 안부셨을 때,==> 부시고 갈 수 있따! 부시고 간 길도 다시 갈 수 있다!
      const route = [[r+1,c],[r-1,c],[r,c+1],[r,c-1]]
      route.forEach(v=>{
        let y = v[0]
        let x = v[1]
        if(y>-1 && y<R && x>-1 && x<C ){//일단 미로 안의 영역이고 길이라면?
          if(miro[y][x]==0){// 길도 갈 수 있고
            if(isVisited[y][x]<2){ //안 갔던 길도 갈 수 있고(0). 깨부시고 같던 길(1)도 갈 수 있음
              isVisited[y][x]=2; // 평범하게 간 길은 2로 칠해줌. 
              q.push([y,x,n+1,p])
            }
          }else{ // 벽도 부실 수 있음.
            if(isVisited[y][x]<2){ 
              isVisited[y][x]=1;   //이건 뭘로 칠해줘야할까?? 일단 벽을 부시고 간거니까 1로 칠해주자. 
              q.push([y,x,n+1,!p]) // 이제 앞으로 벽은 못부수게 p값을 바꿔줌. 
            }
          }
        }
      })

    }
}
}
console.log(answer)