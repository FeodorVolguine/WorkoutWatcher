function Calculate1rm(weight: number, reps: number) {
  let oneRepMax = weight * (1 + (reps/ 30));
  return oneRepMax;
};