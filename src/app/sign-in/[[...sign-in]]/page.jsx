import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="bg-dark-subtle bg-gradient d-flex justify-content-center align-items-center h-100"
      style={{ marginBottom: "-50px" }}
    >
      <SignIn />
    </div>
  );
}
