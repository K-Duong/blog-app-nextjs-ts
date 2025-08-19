'use client';

export default function Error({error }: {error: Error}) {
  console.log("Error occurred:", error);
  return (
    <div>
      <header>
        <h1>Error</h1>
      </header>
      <p></p>
    </div>
  )
}