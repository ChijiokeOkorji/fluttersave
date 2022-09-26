const userPayload = {
  headers: {
    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
  },
  json: {
    tx_ref: "hooli-tx-1948",
    amount: "100",
    currency: "NGN",
    payment_options: "card",
    redirect_url: "https://flutterwave.com",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "kodujoko@gmail.com",
      phonenumber: "08060399351",
      name: "Adekunle",
    },
    customizations: {
      title: "JudiAfrica",
      logo: "",
    },
  },
};
