const redirectHandler = () => {




    fetch(`http://localhost:9000/order-confirmed`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

}

redirectHandler();
