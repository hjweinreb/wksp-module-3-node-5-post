'use strict';

const { stock, customers } = require('./data/promo')

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 9000;


let data = [];


const handleTodo = (req, res) => {
    //console.log(req)
    // console.log(res)
    let newTask = "(add new task)"

    res.render("todolist", { title: "IT WORKED!", newTask, data });
};

const handleTask = (req, res) => {
    console.log(req.body.newtask)
    let newTask = req.body.newtask
    data.push(newTask)


    res.render("todolist", { title: "IT WORKED!", newTask, data });
}




const handleOrder = (req, res) => {
    console.log(req.body)


    customers.forEach(customer => {
        if (customer.givenName.toUpperCase() === req.body.givenName.toUpperCase() || customer.surname.toUpperCase() === req.body.surname.toUpperCase())
            return res.status(550).send({

                'status': 'error',
                'error': '550'
            });

    })

    if (req.body.country.toUpperCase() != "CANADA") {
        return res.send({

            'status': 'error',
            'error': '650'
        });

    }

    /* if (stock.req.body.order === 0) {
        return res.status(450).send({

            'status': 'error',
            'error': '450'

        });

    } */ else {

        return res.send(

            {
                'status': 'success',
                'error': '000'
            }
        )
    }


}

const confirmOrder = (req, res) => {
    console.log(req)
}



express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .set('view engine', 'ejs')

    // endpoints
    .get("/todos", handleTodo)
    .post("/data", handleTask)
    .post("/order", handleOrder)
    .get("/order-confirmed", confirmOrder) //How are we supposed to call this endpoint if there is no fetch for it ?


    //.get('*', (req, res) => res.render('Dang. 404.'))


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));