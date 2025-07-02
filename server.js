
// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: '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', // ← replace this
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
