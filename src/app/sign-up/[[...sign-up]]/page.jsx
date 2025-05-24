import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="bg-dark-subtle bg-gradient d-flex justify-content-center align-items-center h-100"
      style={{ marginBottom: "-50px" }}
    >
      <SignUp />
    </div>
  );
}
