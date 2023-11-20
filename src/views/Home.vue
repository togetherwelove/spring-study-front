<script lang="ts" setup>
function getScores() {
  interface Score {
    kor: number;
    eng: number;
    math: number;
  }

  function prompts(msg: string): number {
    let result = prompt(msg);
    return result ? +result : 0;
  }

  let score: Score = {
    kor: prompts("국어: "),
    eng: prompts("영어: "),
    math: prompts("수학: "),
  };

  let total = score.kor + score.eng + score.math;
  let avg = total / 3;

  function result(avg: number): string {
    let result: string = "";
    if (avg > 90) result = "수";
    else if (avg > 80) result = "우";
    else if (avg > 70) result = "미";
    else if (avg > 60) result = "양";
    else result = "가";
    return result;
  }

  alert(
    `총점은 ${total}점이고, 평균은 ${avg}점입니다. 등급은 ${result(avg)}입니다.`
  );
}

getScores();
</script>

<template>
  <p>This is a home page</p>
</template>

<style scoped></style>
