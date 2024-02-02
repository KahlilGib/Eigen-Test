const express = require('express');
const { swaggerUi, swaggerDocs } = require('./swagger');



const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended: false}));
app.use(require('./routes/routes'));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});