function solution(jobs) {
    var answer = 0;
    
    let result_t = 0;
    
    // heap에 들어갈 작업을 구별하기 위해.
    let pass_t = 0;     // 경과 시간
    let book_t = 0;     // 예약 시간
    
    // 최소 heap (= ready_queue)
    const heap = new minHeap();
    
    let startIdx = -1;
    let min = 1001;
    let completeCnt = 0;
    
    // 요청 시간이 가장 짧은 작업 찾기
    jobs.forEach((job, idx) => {
        if(job[0] < min) {
            min = job[0];
            startIdx = idx;
        }
    })
    
    // 시작 인덱스 잡의 수행시간 만큼 t값 증가.
    // t값보다 작고 시작 안 된 작업 q에 넣기
    // q의 첫 번째 값 수행
    // 예외 : q가 비었지만 아직 수행 안 된 job이 남아있는 경우. 
    
    const startJob = jobs[startIdx];
    
    jobs.forEach((job) => {
        if (min === job[0]) {
          heap.add(job);
        }
     });
    
    
    // 첫 작업이 0초에 시작하지 않을 경우를 위함.
    pass_t += startJob[0];
    book_t += startJob[0];
    
    // 첫 작업 힙에 삽입
    // heap.add(startJob);
    
    while(completeCnt < jobs.length) {

        const cur_job = heap.remove();
        
        
        // 힙에 작업이 있을 때 수행.
        if(cur_job !== null) {
            const req_t = cur_job[0];
            const pro_t = cur_job[1];
            book_t += pro_t;

            // pass_t < 요청 시간 <= book_t 은 요청들을 heap에 삽입. 
            jobs.forEach(job => {
                const time = job[0];
                
                if(pass_t < time && time <= book_t) {
                    heap.add(job);
                }
            })
            
            pass_t += pro_t;
            completeCnt++;
            
            // 결과 저장.
            result_t += (pass_t - req_t);
        }
        // heap이 비었지만 작업은 남아있는 경우
        else {
            // pass_t 와 book_t를 1씩 증가시키며 새로운 작업을 heap에 삽입.
            book_t++;
            jobs.forEach(job => {
                const time = job[0];
                
                if(pass_t < time && time <= book_t) {
                    heap.add(job);
                }
            })
            
            pass_t++;
        }
    }
    
    answer = Math.floor(result_t / jobs.length);
    
    return answer;
}

class minHeap {
    constructor() {
        // 1번부터 사용하기 위해 => [요청, 수행, 수행여부]    
        this.q =  [[0, 0, false]];
    }
    
    add (job) {
        this.q.push(job);
        
        let curIdx = this.q.length - 1;
        let parIdx = Math.floor(curIdx / 2);
            
        while(curIdx > 1 && this.q[curIdx][1] < this.q[parIdx][1]) {
            [this.q[curIdx], this.q[parIdx]] = [this.q[parIdx], this.q[curIdx]];
                
            curIdx = parIdx;
            parIdx = Math.floor(curIdx / 2);
        }
    }
    
    remove () {
        // 빈 경우
        if(this.q.length === 1) return null;
        
        const min_job = this.q[1];
        
        this.q[1] = this.q[this.q.length - 1];
        this.q.pop();

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = leftIdx + 1;
        
        if(!this.q[leftIdx]) return min_job;
        if(!this.q[rightIdx]) {
            if(this.q[curIdx][1] > this.q[leftIdx][1]) {
                [this.q[curIdx], this.q[leftIdx]] = [this.q[leftIdx], this.q[curIdx]];
            }
            
            return min_job;
        }
        
        while(this.q[curIdx][1] > (this.q[leftIdx] && this.q[leftIdx][1]) || this.q[curIdx][1] > (this.q[rightIdx] && this.q[rightIdx][1])) {
            
            const minIdx = (this.q[leftIdx] && this.q[leftIdx][1]) > (this.q[rightIdx] && this.q[rightIdx][1]) ? rightIdx : leftIdx;
            [this.q[curIdx], this.q[minIdx]] = [this.q[minIdx], this.q[curIdx]];
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = leftIdx + 1;
        }
        
        return min_job;
    }
    
    q_print() {
        console.log(this.q);
    }
}