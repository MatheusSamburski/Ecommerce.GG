import ReactModal from "react-modal";
import { User } from "@/types/User";
import { ChangeEvent, useState } from "react";
import { useAuth } from "../../Auth/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.scss";
import { useForm } from "react-hook-form";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  onClose,
  onGetUserIsLogged,
}: UserModalProps) {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");

  console.log(name);
  console.log(email);
  console.log(password);

  const customStyles = {
    content: {
      width: "500px",
      height: "500px",
      margin: "0 auto",
      backgroundColor: "var(--color-modal)",
      borderRadius: "8px",
    },
  };

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
      onRequestClose={() => onClose()}
    >
      <div className="modal-content">
        <header>
          <h1>Faça seu Login</h1>
        </header>
        <div className="input-name">
          <label htmlFor="name">Name</label>
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
        <button onClick={() => handleSignin(name, email, password)}>
          Entrar
        </button>
      </div>
    </ReactModal>
  );
}
