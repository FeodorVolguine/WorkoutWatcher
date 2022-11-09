export default function OneRepMax(weight: number, reps: number) {
  let oneRepMax = weight * (1 + (reps/ 30));
  return oneRepMax;
};