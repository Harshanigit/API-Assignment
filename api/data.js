import { Router } from 'express';
let router = Router()


let data = [
    { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen" },
    { "id": "2", "Firstname": "Petri", "Surname": "Laitinen" }
]

router.get('/', (req, res) => {
    // Sort the data by 'id' 
    const sortedData = data.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);  // Convert 'id' to number for correct comparison
    });

    
    res.json(sortedData);
});


router.get('/', (req, res) => {
    res.json( data )
})

router.get('/:id', (req, res) => {
    res.json( data.find(b => b.id === req.params.id ) )
})


router.get('/:id', (req, res) => {
    let filtered = data.find(item => item.id === req.params.id); 
    if (filtered) {
        res.json(filtered);  
    } else {
        res.status(404).json({ error: "Item not found" });  
    }
});

router.post('/', (req, res) => {
    
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ "error": "Unsupported Media Type" });
    }
        
    if (data.find(b => b.id === req.body.id)) {
        return res.status(409).json({ "error": "record already exists" });
    }
        
    data.push(req.body);
    res.status(200).json(req.body);
});

router.delete('/:id', (req, res) => {
    let fid = data.findIndex(item => item.id === req.params.id);
    
    if (fid === -1) {
        return res.status(404).json({ error: "Not Found" });
    }

    data.splice(fid, 1);
    res.status(200).json({ message: "Record deleted successfully" });
});

router.put('/:id', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ error: "Unsupported Media Type" });
    }

    let fid = data.findIndex(item => item.id === req.params.id);

    if (fid === -1) {
        // If item doesn't exist, create it
        let newItem = { id: req.params.id, ...req.body };
        data.push(newItem);
        return res.status(201).json(newItem);
    } else {
        // If item exists, update it
        data[fid] = { ...data[fid], ...req.body };
        res.status(200).json(data[fid]);
    }
});

export default router;