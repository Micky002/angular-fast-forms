export function Validator(options?: any) {
  console.log('asdf')

  return (target: unknown): void => {
    console.log('validator decorator')
    console.log(target)
  }
}
