export function valueFormatter(price) {
  const formattedTotalPrice = price?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedTotalPrice;
}
