const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

let nextPurchaseId = 1;
let purchases = [
    {id:nextPurchaseId++, category:'Cars', amount: 100, description: 'Tesla’s forum provides an online meeting space for owners and enthusiasts to exchange ideas that are entertaining, helpful and useful.' },
    {id:nextPurchaseId++, category:'Food', amount: 20, description: 'Food is any substance consumed to provide nutritional support for an organism. Food is usually of plant or animal origin, and contains essential nutrients, such as carbohydrates, fats, proteins, vitamins, or minerals.'},
    {id:nextPurchaseId++, category:'Travel', amount: 200, description: 'Compare 100s of Airlines & Find the Great Flight Deals Today. Search One and Done! Book the Best Flights for Your Next Destination. Search Cheap Flights Easier! Track prices, get alerts.'},
    {id:nextPurchaseId++, category:'Politics', amount: 40, description: 'Politics is the set of activities that are associated with the governance of a country, state or an area. It involves making decisions that apply to groups of members.' },
    {id:nextPurchaseId++, category:'Programming', amount: 500, description: 'Programming involves tasks such as: analysis, generating algorithms, profiling algorithms accuracy and resource consumption, and the implementation of algorithms in a chosen'},
    {id:nextPurchaseId++, category:'Games', amount: 300, description: 'Instantly play your favorite free online games including Solitaire, Mahjongg Dimensions, Bridge, Crossword, Word Wipe, and dozens more. Play now for free!'},
];

const ERROR_BAD_REQUEST = 'error.bad_request';
const ERROR_NOT_FOUND = 'error.not_found';

server.get('/api/purchases', (req, res) => {
    setTimeout(()=>{
        res.send(purchases);
    }, 1000)
});

server.get('/api/purchases/:id', (req, res)=>{
    setTimeout(() => {
        const {id} = req.params;
        const parsedId = parseInt(id, 10) // 10тичная система счс
        if(isNaN(id)){
            res.statusCode = 400;
            res.send()
            return;
        }
        if(purchases.some( o => o.id == id)){
            const description = purchases.filter(o=> o.id === parsedId)
            res.send(description)
            return
        }else{
            res.statusCode = 404
            res.send()
        }
        res.send()
    }, 1000);
})


server.delete('/api/purchases/:id', (req, res)=>{
    setTimeout(()=>{
            const {id} = req.params;
            const parsedId = parseInt(id, 10)
            if(isNaN(id)){
                res.statusCode = 400;
                res.send()
                return;
            }
            if(purchases.some( o => o.id == id)){
                purchases = purchases.filter(p => parsedId !== p.id)
                res.send()
                return
            }else{
                res.statusCode = 404
                res.send()
            }
            res.send()  
    },1000)
})

server.post('/api/purchases', (req, res) => {
    const purchase = req.body;
    const someId = parseInt(purchase.id,10);
    const parsed = parseInt(purchase.amount, 10)

    setTimeout(()=>{
        if (someId === 0) {
            purchases = [...purchases, { ...purchase, id: nextPurchaseId++, amount: parsed }]
            res.statusCode = 201
            res.send()
            return;
        }
        if(isNaN(someId)){
            res.statusCode = 400;
            res.send({error: ERROR_BAD_REQUEST});
            return;
        }
        if(purchases.some(i => i.id === someId)){
            purchases = purchases.map(o => o.id === someId ? { ...o, ...purchase } : o)
            res.send();
            return;
        }else{
            res.statusCode = 404;
            res.send({error: ERROR_NOT_FOUND})
        }
        res.send();
    },1000)
   
});

const port = process.env.PORT || 9999;
server.listen(port);


