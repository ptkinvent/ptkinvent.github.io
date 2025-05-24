import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <SignIn />
    </div>
  );
}
