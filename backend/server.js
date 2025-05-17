// Exemplo com Express + Mercado Pago SDK
const express = require("express");
const app = express();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "SEAPP_USR-8920074644474315-051620-f1cf6919ff13cff275bd6729618ac7fb-427416294U_ACCESS_TOKEN"
});

app.use(express.json());

app.post("/criar-preferencia", async (req, res) => {
  try {
    const preference = await mercadopago.preferences.create({
      items: req.body.items,
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/erro",
        pending: "https://seusite.com/pendente"
      },
      auto_return: "approved"
    });

    res.json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar preferência");
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

