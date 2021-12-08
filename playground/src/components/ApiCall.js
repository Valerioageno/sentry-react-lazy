export default function ApiCall() {
  const call = async () => {
    const response = await fetch('https://api64.ipify.org?format=json')
    const json = await response.json()
    console.log(json)
  }
  const callFail = async () => {
    const response = await fetch('https://api64.ipify.or?format=json')
    const json = await response.json()
    console.log(json)
  }
  return (
    <>
      <button onClick={call}>Call API</button>
      <button onClick={callFail}>Call API fail</button>
    </>
  )
}
