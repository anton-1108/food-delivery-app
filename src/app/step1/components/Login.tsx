import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="flex flex-col gap-5">
      <Button>
        <ChevronLeft />
      </Button>
      <h4>Log in</h4>
      <p>Log in to enjoy your favorite dishes</p>
      <Input></Input>
      <p>Forgot password ?</p>
      <p>Don't have an account</p>
      <p>Sign up</p>
    </div>
  );
};

export default Login;
