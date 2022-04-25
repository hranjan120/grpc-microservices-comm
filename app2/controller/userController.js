const protpClient = require("../grpc/userClient");
/*
*-----------------------------Routes Section------------------------
*/
const getAllData = () => {
    return new Promise((resolve)=>{
        protpClient.getAll(null, (err, data) => {
            if (!err) {  
                    resolve(data.customers);        
                }
            });
    });
}
exports.geteMethod = async (req, res) => {
    try {
        const cdata = await getAllData();
        res.status(200).json({ statusCode: 'OK', statusValue: 200, message: 'Get Method app2', payload: { cdata } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 'ERROR', statusValue: 500, message: 'Unable to Process your request' });
    }
};

//----------------
exports.postMethod = async (req, res) => {
    try {
        let newCustomer = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        };
        protpClient.insert(newCustomer, (err, data) => {
            if (err) throw err;
            console.log("Customer created successfully", data);
        });

        //------------
        // const updateCustomer = {
        //     id: req.body.id,
        //     name: req.body.name,
        //     age: req.body.age,
        //     address: req.body.address
        // };
        // protpClient.update(updateCustomer, (err, data) => {
        //     if (err) throw err;
        //     console.log("Customer updated successfully", data);
        // });
        //------------
        // protpClient.remove({ id: req.body.customer_id }, (err, _) => {
        //     if (err) throw err;
        //     console.log("Customer removed successfully");
        // });

        res.status(200).json({ statusCode: 'OK', statusValue: 200, message: 'Post Method app2' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 'ERROR', statusValue: 500, message: 'Unable to Process your request' });
    }
};

