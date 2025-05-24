import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <SignUp />
    </div>
  );
}
