import { Customer } from './db';
import dotenv from 'dotenv-safe';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is listing on ${port}`);
});

app.post('/save-invoice', (req, res) => {
  const {
    clientName,
    date,
    companyName,
    phone,
    email,
    vin,
    model,
    service,
    amount,
    total,
    invoiceNumber,
    paymentMethod,
    notes,
  } = req.body;

  Customer.create({
    clientName,
    date,
    companyName,
    phone,
    email,
    vin,
    model,
    service,
    amount,
    total,
    invoiceNumber,
    paymentMethod,
    notes,
  })
    .then(newCustomer => {
      res.status(201).json({ message: 'Invoice successfully saved: ', newCustomer });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error saving invoice: ', error });
    });
});

app.get('/search-invoices/clientName', (req, res) => {
  const { clientName } = req.query;

  Customer.findAll({
    where: { clientName },
  })
    .then(invoices => {
      res.json(invoices);
    })
    .catch(error => res.status(500).json({ messege: 'Error searching invoice by name: ', error }));
});

app.get('/search-invoices/date', (req, res) => {
  const { date } = req.query;

  Customer.findAll({
    where: { date },
  })
    .then(invoices => res.json(invoices))
    .catch(error => res.status(500).json({ messege: 'Error searching invoice by date: ', error }));
});

app.get('/search-invoices/invoiceNumber', (req, res) => {
  const { invoiceNumber } = req.query;

  Customer.findAll({
    where: { invoiceNumber },
  })
    .then(invoices => res.json(invoices))
    .catch(error => res.status(500).json({ messege: 'Error searching invoice by invoice number: ', error }));
});

app.patch('/update-invoice/:invoiceNumber', (req, res) => {
  Customer.update(
    {
      clientName: req.body.clientName,
      companyName: req.body.companyName,
      phone: req.body.phone,
      email: req.body.email,
      vin: req.body.vin,
      model: req.body.model,
      service: req.body.service,
      amount: req.body.amount,
      total: req.body.total,
      paymentMethod: req.body.paymentMethod,
      notes: req.body.notes,
    },
    {
      where: { invoiceNumber: req.params.invoiceNumber },
    }
  )
    .then(invoice => res.json(invoice))
    .catch(error => res.status(500).json({ messege: 'Error updating invoice by invoice number: ', error }));
});

app.delete('delete-invoice/:invoiceNumber', (req, res) => {
  const { invoiceNumber } = req.params;
  Customer.destroy({ where: { invoiceNumber } })
    .then(() => res.status(200).send('Invoice deleted'))
    .catch(error => res.status(500).json({ messege: 'Error deleting invoice by invoice number: ', error }));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})