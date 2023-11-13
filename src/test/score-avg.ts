interface Score {
  kor: number;
  eng: number;
  math: number;
}

function prompt(msg: string): number {
  let result = prompt(msg);
  return result ? result : 0;
}

let score: Score = {
  kor: prompt("국어: "),
  eng: prompt("영어: "),
  math: prompt("수학: "),
};

let total = score?.kor + score?.eng + score?.math;
let avg = total / 3;

alert(total);
alert(avg);
