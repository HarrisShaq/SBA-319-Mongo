const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let clothingData = require('./models/clothing');
let shoesData = require('./models/shoes');
let accessoriesData = require('./models/accessories');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('Fashion', {
        clothing: clothingData,
        shoes: shoesData,
        accessories: accessoriesData,
    });
});

app.get('/fashion/clothing/:id', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        res.render('ClothingDetails', { item: clothingItem });
    } else {
        res.status(404).send('Item not found');
    }
});

app.get('/fashion/shoes/:id', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        res.render('ShoeDetails', { shoe: shoeItem });
    } else {
        res.status(404).send('Item not found');
    }
});

app.get('/fashion/accessories/:id', (req, res) => {
    const accessoryItem = accessoriesData.find(accessory => accessory.id === parseInt(req.params.id));
    if (accessoryItem) {
        res.render('AccessoryDetails', { accessory: accessoryItem });
    } else {
        res.status(404).send('Item not found');
    }
});


app.post('/fashion/clothing/:id/like', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        clothingItem.likes = (clothingItem.likes || 0) + 1;
        res.json({ likes: clothingItem.likes });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/fashion/shoes/:id/like', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        shoeItem.likes = (shoeItem.likes || 0) + 1;
        res.json({ likes: shoeItem.likes });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/fashion/accessories/:id/like', (req, res) => {
    const accessoryItem = accessoriesData.find(accessory => accessory.id === parseInt(req.params.id));
    if (accessoryItem) {
        accessoryItem.likes = (accessoryItem.likes || 0) + 1;
        res.json({ likes: accessoryItem.likes });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/fashion/clothing/:id/comments', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        clothingItem.comments = clothingItem.comments || [];
        clothingItem.comments.push(req.body.comment);
        res.json({ comments: clothingItem.comments });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/fashion/shoes/:id/comments', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        shoeItem.comments = shoeItem.comments || [];
        shoeItem.comments.push(req.body.comment);
        res.json({ comments: shoeItem.comments });
    } else {
        res.status(404).send('Item not found');
    }
});

app.post('/fashion/accessories/:id/comments', (req, res) => {
    const accessoryItem = accessoriesData.find(accessory => accessory.id === parseInt(req.params.id));
    if (accessoryItem) {
        accessoryItem.comments = accessoryItem.comments || [];
        accessoryItem.comments.push(req.body.comment);
        res.json({ comments: accessoryItem.comments });
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
