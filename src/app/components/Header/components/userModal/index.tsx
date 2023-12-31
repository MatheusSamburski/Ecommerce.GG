import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeModal } from "@/redux/actions/actions";
import { useAppDispatch } from "@/redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { User } from "@/types/User";
import { useAuth } from "../../Auth/auth";
import "./styles.scss";

interface UserModalProps {
  isOpen: boolean;
  onGetUserIsLogged: (user: User) => void;
}

const createUserSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Formato de email inválido"),
  password: z
    .string()
    .nonempty("Senha é obrigatório")
    .min(6, "A senha precisa ter no minímo 6 caracteres"),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export default function UserModal({
  isOpen,
  onGetUserIsLogged,
}: UserModalProps) {
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  const dispatch = useAppDispatch();
  const auth = useAuth();

  const customStyles = {
    content: {
      width: "500px",
      height: "500px",
      margin: "0 auto",
      backgroundColor: "var(--color-modal)",
      borderRadius: "8px",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const userName = watch("name");
  const userEmail = watch("email");
  const userPassword = watch("password");

  useEffect(() => {
    setUserName(userName);
    setUserEmail(userEmail);
    setUserPassword(userPassword);
  }, [name, email, password]);

  async function handleSignin(name: string, email: string, password: string) {
    const data = await auth.signin(name, email, password);
    const { user, token } = data;

    if (user && token) {
      onGetUserIsLogged(user);
      localStorage.setItem("authToken", token);
      console.log(user);
    }

    if (email && password) {
      await auth.signin(name, email, password);
    }
  }

  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
    >
      <div className="modal-content">
        <header>
          <h1>Faça seu Login</h1>
        </header>

        <form
          onSubmit={handleSubmit(() => handleSignin(name, email, password))}
        >
          <div className="input-name">
            <label htmlFor="name">Nome</label>
            <input
              type="name"
              placeholder="Qual seu nome?"
              {...register("name")}
            />
            {errors.name && <span>{errors.name?.message}</span>}
          </div>
          <div className="input-email">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            {errors.email && <span>{errors.email?.message}</span>}
          </div>
          <div className="input-password">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && <span>{errors.password?.message}</span>}
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </ReactModal>
  );
}

// onClick={() => handleSignin(name, email, password)}
