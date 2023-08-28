import Link from "next/link";
import "./styles.scss";

export default function Cart() {
  return (
    <div className="cart-container">
      <h1>Seu carrinho está vazio</h1>

      <Link href="/">
        <button>Continuar comprando</button>
      </Link>
    </div>
  );
}
