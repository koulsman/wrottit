const express = require('express');
const mongoose = require('mongoose');
const Word = require('./WordsSchema');
const cors = require('cors');

const app = express();
const port = 3001;

const uri = 'mongodb+srv://stevekoulas:asfalisa1@staurolexo.zjs7exc.mongodb.net/?retryWrites=true&w=majority&appName=Staurolexo?directConnection=true';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Ανάκτηση όλων των λέξεων
app.get('/words', async (req, res) => {
  try {
    const words = await Word.find().lean();
    res.json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

function getFrequency(arr) {
  const freq = {};
  for (let char of arr) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

// Νέο endpoint για entries ['Ν','Α']
app.get('/words/NA', async (req, res) => {
  try {
    const naEntries = await Word.find({ grammata: ['Ν', 'Α'] }).lean();
    const count = naEntries.length;
    res.json({ count, naEntries });
  } catch (error) {
    console.error('Error fetching NA words:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/words', async (req, res) => {
  const { array1 } = req.body;

  try {
    const cursor = Word.find({
      $or: [
        { $expr: { $lte: [{ $size: "$grammata" }, array1.length] } },
        { grammata: { $eq: array1 } }
      ]
    }).batchSize(100).lean().cursor();

    let matchingEntries = [];
    let uniqueWords = new Set();
   

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const freq1 = getFrequency(array1);
      const freq2 = getFrequency(doc.grammata);

      let matchesCondition = true;
      for (let char in freq2) {
        if (!freq1[char] || freq2[char] > freq1[char]) {
          matchesCondition = false;
          break;
        }
      }

      if (matchesCondition && !uniqueWords.has(doc.lexi)) {
        matchingEntries.push(doc);
        uniqueWords.add(doc.lexi);
        if (matchingEntries.length >= 25) {
          break;
        }
     }
    }
    res.json(matchingEntries);

    // Ταξινόμηση των matchingEntries βάσει του μήκους του πεδίου grammata
    // matchingEntries.sort((a, b) => b.grammata.length - a.grammata.length);

    

  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/allwords', async (req, res) => {
  const { array1 } = req.body;

  try {
    const cursor = Word.find({
      $or: [
        { $expr: { $lte: [{ $size: "$grammata" }, array1.length] } },
        { grammata: { $eq: array1 } }
      ]
    }).batchSize(100).lean().cursor();

    let matchingEntries = [];
    let uniqueWords = new Set();
   

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const freq1 = getFrequency(array1);
      const freq2 = getFrequency(doc.grammata);

      let matchesCondition = true;
      for (let char in freq2) {
        if (!freq1[char] || freq2[char] > freq1[char]) {
          matchesCondition = false;
          break;
        }
      }

      if (matchesCondition && !uniqueWords.has(doc.lexi)) {
        matchingEntries.push(doc);
        uniqueWords.add(doc.lexi);
      }
    }
    res.json(matchingEntries);

    // Ταξινόμηση των matchingEntries βάσει του μήκους του πεδίου grammata
    // matchingEntries.sort((a, b) => b.grammata.length - a.grammata.length);

    

  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = Word;
