type Input = string | number | boolean | null | undefined;

function cx(...inputs: Input[]) {
  return inputs.filter(Boolean).join(" ");
}

export { cx };
