const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-8920074644474315-051620-f1cf6919ff13cff275bd6729618ac7fb-427416294"
});

app.post("/criar-preferencia", async (req, res) => {
  try {
    const result = await new Preference(client).create({
      items: req.body.items,
      back_urls: {
        success: "https://site-amor-em-fios.onrender.com/sucesso.html",
        failure: "https://site-amor-em-fios.onrender.com/erro.html",
        pending: "https://site-amor-em-fios.onrender.com/pendente.html"
      },
      auto_return: "approved"
    });

    res.json({ init_point: result.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


