import { useState, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { SignUpData } from "../../home/types";
import Input from "@/components/ui/Input/Input";
import MainButton from "@/components/ui/Buttons/MainButton";
import { createUser, signIn } from "../API/authApi";

type AuthMode = "login" | "register";

const AuthForm: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (mode === "login") {
        const { email, password } = form;
        await signIn({ email, password });
      } else if (mode === "register") {
        await createUser({
          email: form.email,
          password: form.password,
        });
        console.log("User registered:", form);
      }
      navigate("/");
    } catch (err: any) {
      console.log(err);
      const message =
        err?.data?.detail || err?.data?.message || err?.data?.email || err?.data?.non_field_errors || "Сталася помилка";
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-full max-w-md bg-main-red text-main-beige p-10 rounded-3xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">{mode === "login" ? "Sign In" : "Sign Up"}</h1>
          <p className="text-main-dark">
            {mode === "login" ? "Please enter your credentials" : "Fill out the form below to register"}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === "register" && (
            <Input
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              name="name"
              labelText="Username"
              type="text"
            />
          )}
          <Input
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            name="email"
            labelText="Email"
            type="email"
          />

          <Input
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            required
            name="password"
            labelText="Password"
            type={showPassword ? "text" : "password"}
            icon={
              <span
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
              >
                {showPassword ? "👁️" : "🔒"}
              </span>
            }
          />

          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

          <MainButton
            type="submit"
            // disabled={isLoggingIn || isRegistering}
            className="w-full py-3 bg-white! text-main-black! font-semibold hover:text-main-red! transition-colors"
            content="Sign In"
          />

          <div className="text-center text-gr-dark mt-4">
            {mode === "login" ? (
              <>
                <p>Not registered yet?</p>
                <button type="button" onClick={() => setMode("register")} className="cursor-pointer hover:underline">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p>Already have an account?</p>
                <button type="button" onClick={() => setMode("login")} className="hover:underline cursor-pointer">
                  Sign In
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
