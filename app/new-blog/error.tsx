'use client';

export default function Error({ error }: { error: unknown }) {
  console.log("Error occurred:", error, error instanceof Error);
  
    let message = "Something went wrong";

  if (error instanceof Error) {
    message = (error as Error).message;
  }
  return (
    <div>
      <header>
        <h1>Error</h1>
      </header>
      <p>{message}</p>
    </div>
  )
}