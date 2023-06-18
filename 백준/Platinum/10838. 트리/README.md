# [Platinum V] 트리 - 10838 

[문제 링크](https://www.acmicpc.net/problem/10838) 

### 성능 요약

메모리: 82296 KB, 시간: 2972 ms

### 분류

최소 공통 조상, 트리

### 문제 설명

<p>N개의 노드로 구성된 루트가 있는 트리가 다음과 같이 주어진다. 각 노드는 0부터 N-1까지의 번호로 구별되고, 0번 노드는 루트 노드이고, 나머지 노드 각각은 0번 노드의 자식 노드이다. </p>

<p>트리에 적용할 수 있는 연산은 세 종류이며, 이를 통해 트리의 모양을 바꾸거나 트리 에지에 색칠을 할 수 있다. 각 연산과 그 의미는 다음과 같다. </p>

<ol>
	<li>paint(a, b, c): a번 노드와 b번 노드를 잇는 최단 경로를 찾은 후, 경로 상에 있는 모든 에지를 색깔 c로 칠한다. </li>
	<li>move(a, b): a번 노드의 부모 노드를 b번 노드로 바꾼다. 단, b번 노드는 a번 노드를 루트로 하는 부트리(subtree)에 속하지 않는다. 부모 노드를 바꾸기 전 a번 노드의 부모 노드를 p라 할 때, 새로운 에지 (a,b)는 원래의 에지 (a,p)의 색깔을 갖는다. </li>
	<li>count(a, b): a번 노드와 b번 노드를 잇는 최단경로를 찾은 후, 그 경로 사이에 있는 에지에 칠해진 서로 다른 색깔의 개수를 출력한다. </li>
</ol>

<p>에지에 칠하는 색깔 c를 정수로 표시한다. 그리고 처음에는 모든 에지의 색깔이 0이라고 가정한다. </p>

<p>예를 들어, 그림 1에서 보인 것처럼 6개의 노드로 구성된 초기 트리에 적용된 연산이 차례로</p>

<p>move(1,3); move(5,3); paint(5,4,8); move(3,4); paint(0,3,7); count(2,5);</p>

<p>일 때, 각 연산을 실행한 후 어떻게 트리의 모양과 에지 색깔이 바뀌는지를 아래 그림 2부터 그림 4에서 차례대로 보였다. </p>

<p style="text-align:center"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/10838/1.png" style="height:103px; width:227px"></p>

<p style="text-align:center">그림 1. 초기 형태</p>

<p style="text-align:center"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/10838/2.png" style="height:170px; width:289px"></p>

<p style="text-align:center">그림 2. 좌측: move(1,3)을 실행한 후, 우측: move(5,3)을 실행 한 후</p>

<p style="text-align:center"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/10838/3.png" style="height:138px; width:161px"></p>

<p style="text-align:center">그림 3. paint(5,4,8)을 실행한 후</p>

<p style="text-align:center"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/10838/4.png" style="height:150px; width:283px"></p>

<p style="text-align:center">그림 4. 좌측: move(3,4)를 실행한 후, 우측: paint(0,3,7)을 실행한 후</p>

<p>그리고, 마지막 연산 count(2,5)에 대한 결과로는 3을 출력하게 된다. 왜냐하면, 그림 4의 우측 그림에서 보듯이 2번 노드와 5번 노드 사이의 최단 경로 상에 있는 에지들에 칠해진 색깔이 {0,7,8}로 3가지이기 때문이다. </p>

<p>트리에 대한 정보와 일련의 연산이 주어질 때, 각 연산을 효과적으로 실행하는 프로그램을 작성하시오.</p>

### 입력 

 <p>첫째 줄에는 앞에서 설명한 트리의 노드 개수를 나타내는 정수 N(1 ≤ N ≤ 10<sup>5</sup>)과 연산의 개수를 나타내는 정수 K(1 ≤ K ≤ 3×10<sup>5</sup>)가 주어진다. 이어서 K 줄에 걸쳐 각 연산에 관한 정보가 한 줄에 하나씩 주어지는데, 각 줄에는 연산의 종류를 나타내는 정수 r(1 ≤ r ≤ 3)이 첫 번째로 주어진다.</p>

<ul>
	<li>r = 1일 경우엔 연산이 paint 임을 의미하며, 세 정수 (a,b,c)가 추가로 같은 줄에 주어지는데, 여기서 a, b(0 ≤ a, b ≤ N-1)는 노드 번호를, c(0 ≤ c ≤10<sup>9</sup>)는 색의 번호를 나타낸다.</li>
	<li>r = 2일 경우엔 연산이 move임을 의미하며, 두 정수 a, b(1 ≤ a ≤ N-1, 0 ≤ b ≤ N-1)가 추가로 같은 줄에 주어지는데, 이는 노드 번호를 나타낸다. </li>
	<li>r = 3일 경우엔 연산이 count임을 의미하며, 두 정수 a, b(0 ≤ a, b ≤ N-1)가 추가로 같은 줄에 주어지는데, 이는 노드 번호를 나타낸다. </li>
</ul>

<p>노드의 개수가 N인 트리의 초기 모양은 그림 1에서 보인 것처럼 0번 노드가 루트이고, 나머지 노드들의 부모 노드는 0번 노드이며, 초기 트리의 모든 에지 색깔은 0이라고 가정한 사실을 기억하기 바란다. </p>

<p>또한, paint와 count 연산 시 a번 노드와 b번 노드 사이의 최단경로의 길이는 항상 1,000 이하이다.</p>

### 출력 

 <p>입력에서 주어진 count 연산 각각에 대해, 그 순서대로 그 때의 결과 값을 한 줄에 출력한다. </p>

